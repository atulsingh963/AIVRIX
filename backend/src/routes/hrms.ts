import { Router } from 'express';
import { getEmployees, createEmployee, getDepartments, createDepartment } from '../controllers/hrmsController';

const router = Router();

// Employees
router.get('/employees', getEmployees);
router.post('/employees', createEmployee);

// Departments
router.get('/departments', getDepartments);
router.post('/departments', createDepartment);

export default router;
