import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemster.validation';
const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(AcademicSemesterZodValidation.create),
  AcademicSemesterController.insertIntoDB
);

router.get('/', AcademicSemesterController.getAllFromDB);
router.get('/:id', AcademicSemesterController.getSingleSemester);
export const AcademicSemesterRoutes = router;
