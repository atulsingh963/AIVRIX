import { Router } from 'express';
import webhookRoutes from './webhooks';
import crmRoutes from './crm';
import hrmsRoutes from './hrms';
import projectsRoutes from './projects';
import financeRoutes from './finance';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/webhooks', webhookRoutes);
router.use('/crm', crmRoutes);
router.use('/hrms', hrmsRoutes);
router.use('/projects', projectsRoutes);
router.use('/finance', financeRoutes);

export default router;
