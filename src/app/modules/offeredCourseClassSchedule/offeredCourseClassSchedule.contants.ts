export const offeredCourseClassScheduleFilterableFields: string[] = [
    'searchTerm',
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'roomId',
    'facultyId'
];

export const offeredCourseClassScheduleSearchableFields: string[] = [
    'dayOfWeek',
    'startTime',
    'endTime'
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
