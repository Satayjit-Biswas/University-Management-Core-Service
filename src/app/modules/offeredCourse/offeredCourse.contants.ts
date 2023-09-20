export const offeredCourseFilterableFields: string[] = ['searchTerm'];

export const offeredCourseSearchableFields: string[] = [
    'startData',
    'endDate',
    'status'
];

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
