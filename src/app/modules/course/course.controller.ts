import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.contants';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CourseService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CourseService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Update successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Delete successfully',
    data: result,
  });
});

const assignFaculies = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CourseService.assignFaculies(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Assign Faculies successfully',
    data: result,
  });
});

const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CourseService.removeFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Remove  Faculies successfully',
    data: result,
  });
});
export const CourseController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  assignFaculies,
  removeFaculties,
};
