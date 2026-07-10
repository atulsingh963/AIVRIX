import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Employees
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { user: true, department: true },
    });
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await prisma.employee.create({ data: req.body });
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Departments
export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: { _count: { select: { employees: true } } }
    });
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.create({ data: req.body });
    res.status(201).json(department);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
