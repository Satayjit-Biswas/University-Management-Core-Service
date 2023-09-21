import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';
import { OfferedCourseClassScheduleZodValidation } from './offeredCourseClassSchedule.validation';

const router = express.Router();
router.post(
    '/create-offered-courses-class-schedule',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(OfferedCourseClassScheduleZodValidation.create),
    OfferedCourseClassScheduleController.insertIntoDB
);
router.get('/', OfferedCourseClassScheduleController.getAllFromDB);

router.get('/:id', OfferedCourseClassScheduleController.getByIdFromDB);
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(OfferedCourseClassScheduleZodValidation.update),
    OfferedCourseClassScheduleController.updateIntoDB
);
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    OfferedCourseClassScheduleController.deleteFromDB
);

export const offeredCourseClassScheduleRoutes = router;
