import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IEnrollCoursePayload } from '../semesterRegistration/semesterRegistration.interface';

const enrollIntoCourse = async (
    authUserId: string,
    payload: IEnrollCoursePayload
): Promise<{
    message: string;
}> => {
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

    return { message: 'Successfully Enrolled into course' };
};

const withdrewFromCourse = async (
    authUserId: string,
    payload: IEnrollCoursePayload
): Promise<{
    message: string;
}> => {
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

    await prisma.$transaction(async transactionClient => {
        await transactionClient.studentSemesterRegistrationCourse.delete({
            where: {
                semesterRegistrationId_studentId_offeredCourseId: {
                    semesterRegistrationId: semesterRegistration?.id,
                    studentId: student?.id,
                    offeredCourseId: payload.offeredCourseId
                }
            }
        });

        await transactionClient.offeredCourseSection.update({
            where: {
                id: payload.offeredCourseSectionId
            },
            data: {
                currentlyEnrolledStudent: { decrement: 1 }
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
                    decrement: offeredCourse.course.credits
                }
            }
        });
    });

    return { message: 'Successfully withdrew from course' };
};

export const studentSemesterRegistrationCourseService = {
    enrollIntoCourse,
    withdrewFromCourse
};
