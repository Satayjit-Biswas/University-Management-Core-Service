export const roomFilterableFields: string[] = [
  'searchTerm',
  'id',
  'buildingId',
];

export const roomSearchableFields: string[] = ['title'];

export const roomRelationalFields: string[] = ['buildingId'];
export const roomRelationalFieldsMapper: {
  [key: string]: string;
} = {
  buildingId: 'building',
};
