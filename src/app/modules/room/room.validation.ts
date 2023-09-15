import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Room Number id is required',
    }),
    floor: z.string({
      required_error: 'Floor name is required',
    }),
    buildingId: z.string({
      required_error: 'buildingId is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    roomNumber: z.string().optional(),
    floor: z.string().optional(),
    buildingId: z.string().optional(),
  }),
});

export const RoomZodValidation = {
  create,
  update,
};
