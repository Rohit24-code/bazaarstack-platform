import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "../../controllers/admin/order.controller";

export const adminOrderRouter = Router();

adminOrderRouter.use(requireAdmin);

adminOrderRouter.get("/orders", getAdminOrders);

adminOrderRouter.patch("/orders/:orderId/status", updateAdminOrderStatus);
