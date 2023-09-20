export type ISemesterRegistrationFilterRequest = {
    searchTerm?: string | undefined;
    academicSemesterId?: string | undefined;
    startData?: number | undefined;
    status?: 'UPCOMING' | 'ONGOING' | 'ENDED';
};

export type ICreateOfferCourse = {
    courseIds: string[];
    academicDepartmentId: string;
    SemesterRegistrationId: string;
};
