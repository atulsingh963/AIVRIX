import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { client: true, tasks: true, milestones: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Tasks
export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: projectId ? { projectId: String(projectId) } : {},
      include: { assignee: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.create({ data: req.body });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
