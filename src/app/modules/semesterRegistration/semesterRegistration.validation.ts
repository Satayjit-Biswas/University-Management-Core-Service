import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
    body: z.object({
        startData: z.string({
            required_error: 'startData id is required'
        }),
        endDate: z.string({
            required_error: 'endDate is required'
        }),
        minCredit: z.number({
            required_error: 'minCredit is required'
        }),
        maxCredit: z.number({
            required_error: 'maxCredit is required'
        }),
        academicSemesterId: z.string({
            required_error: 'academicSemesterId is required'
        })
    })
});

const update = z.object({
    body: z.object({
        startData: z.string().optional(),
        endDate: z.string().optional(),
        status: z
            .enum([...Object.values(SemesterRegistrationStatus)] as [
                string,
                ...string[]
            ])
            .optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
        academicSemesterId: z.string().optional()
    })
});

export const SemesterRegistrationZodValidation = {
    create,
    update
};
