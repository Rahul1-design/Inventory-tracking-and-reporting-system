import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getExpenses } from "../controllers/expenseController";

const router = Router();

router.get("/", authMiddleware, getExpenses);

export default router;