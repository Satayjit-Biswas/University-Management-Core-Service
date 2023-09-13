import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.insertIntoDB(req.body);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster Created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // for Scerch & filters
  const filters = pick(req.query, [
    'searchTerm',
    'code',
    'year',
    'startMonth',
    'endMonth',
  ]);
  // for paginatoin
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await FacultyService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Getting All Data',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.getSingleFaculty(id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster Data Fetched',
    data: result,
  });
});
export const FacultyController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFaculty,
};