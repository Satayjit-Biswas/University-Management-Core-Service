import { z } from 'zod';

const create = z.object({
    body: z.object({
        academicDepartmentId: z.string({
            required_error: 'AcademicDepartment Id id is required'
        }),
        SemesterRegistrationId: z.string({
            required_error: 'SemesterRegistration Id is required'
        }),
        courseIds: z.array(
            z.string({
                required_error: 'Course Id is required'
            }),
            {
                required_error: 'Course Ids is required'
            }
        )
    })
});

const update = z.object({
    body: z.object({
        academicDepartmentId: z.string().optional(),
        SemesterRegistrationId: z.string().optional(),
        courseIds: z
            .array(
                z.object({
                    courseId: z.string({
                        required_error: 'Course Id is required'
                    })
                })
            )
            .optional()
    })
});

export const OfferedCourseZodValidation = {
    create,
    update
};
