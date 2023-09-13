import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemster.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterZodValidation.create),
  AcademicSemesterController.insertIntoDB
);

router.get('/all-semester', AcademicSemesterController.getAllFromDB);
router.get(
  '/single-semester/:id',
  AcademicSemesterController.getSingleSemester
);
export const AcademicSemesterRoutes = router;
