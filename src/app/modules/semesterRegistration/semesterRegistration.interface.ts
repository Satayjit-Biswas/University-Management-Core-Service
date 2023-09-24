export type ISemesterRegistrationFilterRequest = {
    searchTerm?: string | undefined;
    academicSemesterId?: string | undefined;
    startData?: number | undefined;
    status?: 'UPCOMING' | 'ONGOING' | 'ENDED';
};

export type IEnrollCoursePayload = {
    offeredCourseId: string;
    offeredCourseSectionId: string;
};
