export const semesterRegistrationFilterableFields: string[] = ['searchTerm'];

export const semesterRegistrationSearchableFields: string[] = [
  'startData',
  'endDate',
  'status',
];

export const semesterRegistrationRelationalFields: string[] = [
  'academicSemesterId',
];
export const semesterRegistrationRelationalFieldsMapper: {
  [key: string]: string;
} = {
  academicSemesterId: 'academicSemester',
};
