import { Router } from 'express';
import { getInvoices, createInvoice } from '../controllers/financeController';

const router = Router();

router.get('/invoices', getInvoices);
router.post('/invoices', createInvoice);

export default router;
