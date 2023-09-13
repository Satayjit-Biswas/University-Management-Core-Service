import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicFacultyZodValidation.create),
  AcademicFacultyController.insertIntoDB
);

router.get('/all-faculty', AcademicFacultyController.getAllFromDB);
router.get('/single-faculty/:id', AcademicFacultyController.getSingleFromDB);
export const AcademicFacultyRoutes = router;
