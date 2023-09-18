import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    credits: z.number({
      required_error: 'credits is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string(),
        })
      )
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string(),
        })
      )
      .optional(),
  }),
});
const assignOrRemoveFaculty = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Faculty are required',
    }),
  }),
});
export const CourseZodValidation = {
  create,
  update,
  assignOrRemoveFaculty,
};
