import { Router, type Request, type Response } from "express";
import { requireAdmin } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { Order } from "../../models/Order";
import { ok } from "../../utils/envelope";
import { adminDashboard } from "../../controllers/admin/dashboard.controllers";

type TotalSaleRow = {
  _id: null;
  totalSales: number;
};

export const adminDashboardRouter = Router();

adminDashboardRouter.use(requireAdmin);

adminDashboardRouter.get("/dashboard/lite", adminDashboard);
adminDashboardRouter.get("/dashboard", adminDashboard);
