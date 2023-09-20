export type IOfferedCourseFilterRequest = {
    searchTerm?: string | undefined;
    courseId?: string | undefined;
    academicDepartmentId?: string | undefined;
    SemesterRegistrationId?: string | undefined;
};

export type ICreateOfferCourse = {
    courseIds: string[];
    academicDepartmentId: string;
    SemesterRegistrationId: string;
};
