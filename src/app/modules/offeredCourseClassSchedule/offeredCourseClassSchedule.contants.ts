export const offeredCourseClassScheduleFilterableFields: string[] = [
    'searchTerm',
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'roomId',
    'dayOfWeek',
    'facultyId'
];

export const offeredCourseClassScheduleSearchableFields: string[] = [
    'dayOfWeek'
];

export const offeredCourseClassScheduleRelationalFields: string[] = [
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'roomId',
    'facultyId'
];
export const offeredCourseClassScheduleRelationalFieldsMapper: {
    [key: string]: string;
} = {
    offeredCourseSectionId: 'offeredCourseSectionId',
    semesterRegistrationId: 'semesterRegistrationId',
    roomId: 'roomId',
    facultyId: 'facultyId'
};
