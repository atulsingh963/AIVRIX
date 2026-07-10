import { Router } from 'express';
import { getProjects, createProject, getTasks, createTask } from '../controllers/projectsController';

const router = Router();

// Projects
router.get('/', getProjects);
router.post('/', createProject);

// Tasks
router.get('/tasks', getTasks);
router.post('/tasks', createTask);

export default router;
