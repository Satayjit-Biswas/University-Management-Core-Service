import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDB
);

router.get('/all-faculty', FacultyController.getAllFromDB);
router.get('/single-faculty/:id', FacultyController.getSingleFaculty);
export const facultyRoutes = router;
