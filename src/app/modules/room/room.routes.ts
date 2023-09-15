import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomZodValidation } from './room.validation';

const router = express.Router();
router.post(
  '/create-room',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(RoomZodValidation.create),
  RoomController.insertIntoDB
);
router.get('/', RoomController.getAllFromDB);

router.get('/:id', RoomController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(RoomZodValidation.update),
  RoomController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RoomController.deleteFromDB
);

export const roomRoutes = router;
