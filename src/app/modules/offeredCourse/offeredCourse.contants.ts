export const offeredCourseFilterableFields: string[] = [
    'searchTerm',
    'id',
    'semesterRegistrationId',
    'courseId',
    'academicDepartmentId'
];

export const offeredCourseSearchableFields: string[] = [];

export const offeredCourseRelationalFields: string[] = [
    'courseId',
    'academicDepartmentId',
    'SemesterRegistrationId'
];
export const offeredCourseRelationalFieldsMapper: {
    [key: string]: string;
} = {
    courseId: 'course',
    academicDepartmentId: 'academicDepartment',
    SemesterRegistrationId: 'semesterRegistration'
};
