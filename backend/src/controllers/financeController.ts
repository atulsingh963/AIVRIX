import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.create({ data: req.body });
    res.status(201).json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
