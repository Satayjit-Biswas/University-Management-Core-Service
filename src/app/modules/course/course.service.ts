import { Course, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { courseSearchableFields } from './course.contants';
import {
  ICourseCreateData,
  ICourseFilterRequest,
  IPrerequisiteCourseRequest,
} from './course.interface';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async CourseClient => {
    const result = await CourseClient.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // for (let i = 0; i < preRequisiteCourses.length; i++) {
      //   const createpreRequisite =
      //     await CourseClient.courseToPrerequisite.create({
      //       data: {
      //         courseld: result.id,
      //         prerequisiteld: preRequisiteCourses[i].courseId,
      //       },
      //     });
      //   console.log(createpreRequisite);
      // }

      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourses: IPrerequisiteCourseRequest) => {
          const createpreRequisite =
            await CourseClient.courseToPrerequisite.create({
              data: {
                courseld: result.id,
                prerequisiteld: preRequisiteCourses.courseId,
              },
            });
          console.log(createpreRequisite);
        }
      );
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllFromDB = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createAt: 'desc',
          },
  });
  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<ICourseCreateData>
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;
  console.log('preRequisiteCourses :', preRequisiteCourses);

  await prisma.$transaction(async updateClient => {
    const result = await updateClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );
      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );
      console.log('deletePrerequisite :', deletePrerequisite);
      console.log('newPrerequisite :', newPrerequisite);

      // for (let x = 0; x < deletePrerequisite.length; x++) {
      //   await updateClient.courseToPrerequisite.deleteMany({
      //     where: {
      //       AND: [
      //         { courseld: id },
      //         {
      //           prerequisiteld: deletePrerequisite[x].courseId,
      //         },
      //       ],
      //     },
      //   });
      // }

      await asyncForEach(
        deletePrerequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await updateClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                { courseld: id },
                {
                  prerequisiteld: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      // for (let x = 0; x < newPrerequisite.length; x++) {
      //   await updateClient.courseToPrerequisite.create({
      //     data: {
      //       courseld: id,
      //       prerequisiteld: newPrerequisite[x].courseId,
      //     },
      //   });
      // }

      await asyncForEach(
        newPrerequisite,
        async (insertPreCourse: IPrerequisiteCourseRequest) => {
          await updateClient.courseToPrerequisite.create({
            data: {
              courseld: id,
              prerequisiteld: insertPreCourse.courseId,
            },
          });
        }
      );
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

const deleteFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
    where: {
      OR: [
        {
          courseld: id,
        },
        {
          prerequisiteld: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};
export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
