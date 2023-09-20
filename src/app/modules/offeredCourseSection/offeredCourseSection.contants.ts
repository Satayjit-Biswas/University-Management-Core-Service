export const offeredCourseSectionFilterableFields: string[] = [
    'searchTerm',
    'id',
    'offeredCourseId',
    'semesterRegistrationId'
];

export const offeredCourseSectionSearchableFields: string[] = [
    'title',
    'maxCapacity',
    'offeredCoursedId',
    'semesterRegistrationId'
];

export const offeredCourseSectionRelationalFields: string[] = [
    'offeredCoursedId',
    'semesterRegistrationId'
];
export const offeredCourseSectionRelationalFieldsMapper: {
    [key: string]: string;
} = {
    offeredCoursedId: 'offeredCoursed',
    semesterRegistrationId: 'semesterRegistration'
};
