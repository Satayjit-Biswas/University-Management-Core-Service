import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingZodValidation } from './building.validation';

const router = express.Router();
router.post(
  '/create-building',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingZodValidation.create),
  BuildingController.insertIntoDB
);
router.get('/', BuildingController.getAllFromDB);

router.get('/:id', BuildingController.getByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingZodValidation.update),
  BuildingController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BuildingController.deleteFromDB
);

export const buildingRoutes = router;
