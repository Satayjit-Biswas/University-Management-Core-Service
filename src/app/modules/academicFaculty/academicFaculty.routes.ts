import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academicFaculty',
  validateRequest(AcademicFacultyZodValidation.create),
  AcademicFacultyController.insertIntoDB
);

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getSingleFromDB);
export const AcademicFacultyRoutes = router;
