import { OfferedCourseSection, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import {
    offeredCourseSectionRelationalFields,
    offeredCourseSectionRelationalFieldsMapper,
    offeredCourseSectionSearchableFields
} from './offeredCourseSection.contants';
import { IOfferedCourseSectionFilterRequest } from './offeredCourseSection.interface';

const insertIntoDB = async (
    offeredCourseSectionData: OfferedCourseSection
): Promise<OfferedCourseSection> => {
    const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: offeredCourseSectionData.offeredCoursedId
        }
    });
    if (!isExistOfferedCourse) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Offer Course dose not Exits'
        );
    }

    offeredCourseSectionData.semesterRegistrationId =
        isExistOfferedCourse.SemesterRegistrationId;
    const result = await prisma.offeredCourseSection.create({
        data: offeredCourseSectionData,
        include: {
            semesterRegistration: true,
            offeredCoursed: true
        }
    });
    return result;
};

const getAllFromDB = async (
    filters: IOfferedCourseSectionFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: offeredCourseSectionSearchableFields.map(field => ({
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
                if (offeredCourseSectionRelationalFields.includes(key)) {
                    return {
                        [offeredCourseSectionRelationalFieldsMapper[key]]: {
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

    const whereConditions: Prisma.OfferedCourseSectionWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.offeredCourseSection.findMany({
        include: {
            semesterRegistration: true,
            offeredCoursed: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      createAt: 'desc'
                  }
    });
    const total = await prisma.offeredCourseSection.count({
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
): Promise<OfferedCourseSection | null> => {
    const result = await prisma.offeredCourseSection.findUnique({
        where: {
            id
        },
        include: {
            semesterRegistration: true,
            offeredCoursed: true
        }
    });
    return result;
};

const updateIntoDB = async (
    id: string,
    payload: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection> => {
    const result = await prisma.offeredCourseSection.update({
        where: {
            id
        },
        include: {
            semesterRegistration: true,
            offeredCoursed: true
        },
        data: payload
    });

    return result;
};

const deleteFromDB = async (id: string): Promise<OfferedCourseSection> => {
    const result = await prisma.offeredCourseSection.delete({
        where: { id },
        include: {
            semesterRegistration: true,
            offeredCoursed: true
        }
    });
    return result;
};
export const OfferedCourseSectionService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};
