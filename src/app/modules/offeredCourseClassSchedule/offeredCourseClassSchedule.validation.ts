import { WeekDays } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
    body: z.object({
        startTime: z.string({
            required_error: 'start Time id is required'
        }),
        endTime: z.string({
            required_error: 'endTime is required'
        }),
        offeredCourseSectionId: z.string({
            required_error: 'offeredCourseSectionId is required'
        }),
        semesterRegistrationId: z.string({
            required_error: 'semesterRegistrationId is required'
        }),
        roomId: z.string({
            required_error: 'roomId is required'
        }),
        facultyId: z.string({
            required_error: 'facultyId is required'
        })
    })
});

const update = z.object({
    body: z.object({
        dayOfWeek: z
            .enum([...Object.values(WeekDays)] as [string, ...string[]])
            .optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        offeredCourseSectionId: z.number().optional(),
        semesterRegistrationId: z.number().optional(),
        roomId: z.number().optional(),
        facultyId: z.string().optional()
    })
});

export const OfferedCourseClassScheduleZodValidation = {
    create,
    update
};
