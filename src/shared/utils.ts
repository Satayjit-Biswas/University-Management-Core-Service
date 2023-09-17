import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This is not Array');
  }
  for (let x = 0; x < array.length; x++) {
    await callback(array[x], x, array);
  }
};
