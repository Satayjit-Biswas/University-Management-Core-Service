import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseZodValidation } from './offeredCourse.validation';

const router = express.Router();
router.post(
    '/create-offeredCourses',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(OfferedCourseZodValidation.create),
    OfferedCourseController.insertIntoDB
);
router.get('/', OfferedCourseController.getAllFromDB);

router.get('/:id', OfferedCourseController.getByIdFromDB);
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(OfferedCourseZodValidation.update),
    OfferedCourseController.updateIntoDB
);
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    OfferedCourseController.deleteFromDB
);

export const offeredCourseRoutes = router;
