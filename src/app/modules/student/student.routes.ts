import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentZodValidation } from './student.validation';

const router = express.Router();
router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentZodValidation.create),
  StudentController.insertIntoDB
);
router.get('/', StudentController.getAllFromDB);

router.get('/:id', StudentController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentZodValidation.update),
  StudentController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteFromDB
);

export const studentRoutes = router;
