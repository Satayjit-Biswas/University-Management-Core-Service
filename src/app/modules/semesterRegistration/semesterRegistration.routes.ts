import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationZodValidation } from './semesterRegistration.validation';

const router = express.Router();
router.post(
    '/create-semesterRegistration',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(SemesterRegistrationZodValidation.create),
    SemesterRegistrationController.insertIntoDB
);
router.post(
    '/start-registration',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.STUDENT
    ),
    SemesterRegistrationController.startMyRegistration
);
router.get('/', SemesterRegistrationController.getAllFromDB);

router.get('/:id', SemesterRegistrationController.getByIdFromDB);
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(SemesterRegistrationZodValidation.update),
    SemesterRegistrationController.updateIntoDB
);
router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    SemesterRegistrationController.deleteFromDB
);

export const semesterRegistrationRoutes = router;
