import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Leads
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.create({ data: req.body });
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Deals
export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await prisma.deal.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const deal = await prisma.deal.create({ data: req.body });
    res.status(201).json(deal);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
