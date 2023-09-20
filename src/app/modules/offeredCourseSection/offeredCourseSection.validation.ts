import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title is required'
        }),
        maxCapacity: z.number({
            required_error: 'maxCapacity is required'
        }),
        offeredCoursedId: z.string({
            required_error: 'offeredCoursedId is required'
        })
    })
});

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        maxCapacity: z.number().optional(),
        offeredCoursedId: z.string().optional()
    })
});

export const OfferedCourseSectionZodValidation = {
    create,
    update
};
