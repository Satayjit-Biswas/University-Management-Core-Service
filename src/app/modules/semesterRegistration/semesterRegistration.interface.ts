export type ISemesterRegistrationFilterRequest = {
    searchTerm?: string | undefined;
    academicSemesterId?: string | undefined;
    startData?: number | undefined;
    status?: 'UPCOMING' | 'ONGOING' | 'ENDED';
};
