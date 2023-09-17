import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseZodValidation } from './course.validation';

const router = express.Router();
router.post(
  '/create-course',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(CourseZodValidation.create),
  CourseController.insertIntoDB
);

router.get('/', CourseController.getAllFromDB);

router.get('/:id', CourseController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(CourseZodValidation.update),
  CourseController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CourseController.deleteFromDB
);

router.post(
  '/:id/assign-faculties',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CourseController.assignFaculies
);

router.delete(
  '/:id/remove-faculties',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CourseController.removeFaculties
);

export const courseRoutes = router;
