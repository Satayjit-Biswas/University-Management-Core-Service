import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './offeredCourse.contants';
import { OfferedCourseService } from './offeredCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);

    const result = await OfferedCourseService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OfferedCourseService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await OfferedCourseService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course Update successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course Delete successfully',
        data: result
    });
});
export const OfferedCourseController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};
