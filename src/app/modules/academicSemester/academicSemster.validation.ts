import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is Required',
    }),
    title: z.string({
      required_error: 'Title is Required',
    }),
    code: z.string({
      required_error: 'Code is Required',
    }),
    startMonth: z.string({
      required_error: 'StartMonth is Required',
    }),
    endMonth: z.string({
      required_error: 'EndMonth is Required',
    }),
  }),
});

export const AcademicSemesterZodValidation = {
  create,
};
