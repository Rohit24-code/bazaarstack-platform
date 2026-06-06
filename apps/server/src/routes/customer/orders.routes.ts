import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  getCustomerOrder,
  updateCustomerOrder,
} from "../../controllers/customer/order.controllers";

export const customerOrderRouter = Router();

customerOrderRouter.use(requireAuth);

customerOrderRouter.get("/orders", getCustomerOrder);

customerOrderRouter.patch("/orders/:orderId/return", updateCustomerOrder);
