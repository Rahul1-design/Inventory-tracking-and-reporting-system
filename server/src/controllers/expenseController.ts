import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await prisma.expenses.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses" });
  }
};