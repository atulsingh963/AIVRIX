import { Router } from 'express';
import { getLeads, createLead, getDeals, createDeal } from '../controllers/crmController';

const router = Router();

// Leads
router.get('/leads', getLeads);
router.post('/leads', createLead);

// Deals
router.get('/deals', getDeals);
router.post('/deals', createDeal);

export default router;
