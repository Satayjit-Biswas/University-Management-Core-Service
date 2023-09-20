import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import { RoomZodValidation } from './offeredCourseSection.validation';

const router = express.Router();
router.post(
    '/create-offered-courses-section',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    OfferedCourseSectionController.insertIntoDB
);
router.get('/', OfferedCourseSectionController.getAllFromDB);

router.get('/:id', OfferedCourseSectionController.getByIdFromDB);
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(RoomZodValidation.update),
    OfferedCourseSectionController.updateIntoDB
);
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    OfferedCourseSectionController.deleteFromDB
);

export const offeredCourseSectionRoutes = router;
