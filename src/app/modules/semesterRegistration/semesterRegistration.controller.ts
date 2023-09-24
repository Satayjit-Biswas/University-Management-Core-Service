import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.contants';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SemesterRegistrationService.getAllFromDB(
        filters,
        options
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await SemesterRegistrationService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration Update successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration Delete successfully',
        data: result
    });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.startMyRegistration(
        user.userId
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Registration Start successfully',
        data: result
    });
});
const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.enrollIntoCourse(
        user.userId,
        req.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enroll IntoCourse Start successfully',
        data: { result }
    });
});
export const SemesterRegistrationController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    startMyRegistration,
    enrollIntoCourse
};
