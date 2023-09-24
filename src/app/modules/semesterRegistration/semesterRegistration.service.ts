import {
    Prisma,
    SemesterRegistration,
    SemesterRegistrationStatus,
    StudentSemesterRegistration
} from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import {
    semesterRegistrationRelationalFields,
    semesterRegistrationRelationalFieldsMapper,
    semesterRegistrationSearchableFields
} from './semesterRegistration.contants';
import {
    IEnrollCoursePayload,
    ISemesterRegistrationFilterRequest
} from './semesterRegistration.interface';

const insertIntoDB = async (
    semesterRegistrationData: SemesterRegistration
): Promise<SemesterRegistration> => {
    const isAnysemesterRegUpcomingOrOngoing =
        await prisma.semesterRegistration.findFirst({
            where: {
                OR: [
                    {
                        status: SemesterRegistrationStatus.UPCOMING
                    },
                    {
                        status: SemesterRegistrationStatus.ONGOING
                    }
                ]
            }
        });

    if (isAnysemesterRegUpcomingOrOngoing) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `There is already an ${isAnysemesterRegUpcomingOrOngoing.status} registration.`
        );
    }
    const result = await prisma.semesterRegistration.create({
        data: semesterRegistrationData,
        include: {
            academicSemester: true
        }
    });
    return result;
};

const getAllFromDB = async (
    filters: ISemesterRegistrationFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: semesterRegistrationSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (semesterRegistrationRelationalFields.includes(key)) {
                    return {
                        [semesterRegistrationRelationalFieldsMapper[key]]: {
                            id: (filterData as any)[key]
                        }
                    };
                } else {
                    return {
                        [key]: {
                            equals: (filterData as any)[key]
                        }
                    };
                }
            })
        });
    }

    const whereConditions: Prisma.SemesterRegistrationWhereInput =
        andConditions.length > 0
            ? {
                  AND: andConditions
              }
            : {};

    const result = await prisma.semesterRegistration.findMany({
        include: {
            academicSemester: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? {
                      [options.sortBy]: options.sortOrder
                  }
                : {
                      createAt: 'desc'
                  }
    });
    const total = await prisma.semesterRegistration.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

const getByIdFromDB = async (
    id: string
): Promise<SemesterRegistration | null> => {
    const result = await prisma.semesterRegistration.findUnique({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
    });
    return result;
};

const updateIntoDB = async (
    id: string,
    payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
    const isExist = await prisma.semesterRegistration.findUnique({
        where: {
            id
        }
    });
    if (!isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Data not Found');
    }

    // UPCOMING > ONGOING > ENDED

    if (
        payload.status &&
        isExist.status === SemesterRegistrationStatus.UPCOMING &&
        payload.status !== SemesterRegistrationStatus.ONGOING
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Upcoming to Ongoing ');
    }

    if (
        payload.status &&
        isExist.status === SemesterRegistrationStatus.ONGOING &&
        payload.status !== SemesterRegistrationStatus.ENDED
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ONGOING to ENDED');
    }

    const result = await prisma.semesterRegistration.update({
        where: {
            id
        },
        include: {
            academicSemester: true
        },
        data: payload
    });
    return result;
};

const deleteFromDB = async (id: string): Promise<SemesterRegistration> => {
    const result = await prisma.semesterRegistration.delete({
        where: {
            id
        },
        include: {
            academicSemester: true
        }
    });
    return result;
};
const startMyRegistration = async (
    authUserId: string
): Promise<{
    semesterRegistration: SemesterRegistration | null;
    studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
    const studentInfo = await prisma.student.findFirst({
        where: {
            studentId: authUserId
        }
    });
    if (!studentInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'student Info Not Found');
    }
    const semesterRegistrationInfo =
        await prisma.semesterRegistration.findFirst({
            where: {
                status: {
                    in: [
                        SemesterRegistrationStatus.ONGOING,
                        SemesterRegistrationStatus.UPCOMING
                    ]
                }
            }
        });
    if (
        semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING
    ) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Registration is not start yet'
        );
    }

    let studentRegistration =
        await prisma.studentSemesterRegistration.findFirst({
            where: {
                student: {
                    id: studentInfo?.id
                },
                semesterRegistration: {
                    id: semesterRegistrationInfo?.id
                }
            }
        });

    if (!studentRegistration) {
        studentRegistration = await prisma.studentSemesterRegistration.create({
            data: {
                student: {
                    connect: {
                        id: studentInfo?.id
                    }
                },
                semesterRegistration: {
                    connect: {
                        id: semesterRegistrationInfo?.id
                    }
                }
            }
        });
    }
    return {
        semesterRegistration: semesterRegistrationInfo,
        studentSemesterRegistration: studentRegistration
    };
};

const enrollIntoCourse = async (
    authUserId: string,
    payload: IEnrollCoursePayload
) => {
    // console.log(authUserId, payload);
    const student = await prisma.student.findFirst({
        where: {
            studentId: authUserId
        }
    });
    // console.log(student);
    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        }
    });
    // console.log(semesterRegistration);

    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    if (!semesterRegistration) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'SemesterRegistration not found'
        );
    }
    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offeredCourseId
        },
        include: {
            course: true
        }
    });
    if (!offeredCourse) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OfferedCourse Not Found');
    }

    const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseSectionId
        }
    });
    if (!offeredCourseSection) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'OfferedCourseSection Not Found'
        );
    }
    if (
        offeredCourseSection.maxCapacity &&
        offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.maxCapacity <=
            offeredCourseSection.currentlyEnrolledStudent
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Capacity is Full');
    }
    await prisma.$transaction(async transactionClient => {
        await transactionClient.studentSemesterRegistrationCourse.create({
            data: {
                studentId: student?.id,
                semesterRegistrationId: semesterRegistration?.id,
                offeredCourseId: payload.offeredCourseId,
                offeredCourseSectionId: payload.offeredCourseSectionId
            }
        });

        await transactionClient.offeredCourseSection.update({
            where: {
                id: payload.offeredCourseSectionId
            },
            data: {
                currentlyEnrolledStudent: { increment: 1 }
            }
        });

        await transactionClient.studentSemesterRegistration.updateMany({
            where: {
                student: {
                    id: student?.id
                },
                semesterRegistration: {
                    id: semesterRegistration?.id
                }
            },
            data: {
                totalCreditsTaken: {
                    increment: offeredCourse.course.credits
                }
            }
        });
    });

    return { message: 'SuccessFllt Enrolled into course' };
};
export const SemesterRegistrationService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    startMyRegistration,
    enrollIntoCourse
};
