import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  checkoutConfirm,
  checkoutCreateSession,
} from "../../controllers/customer/checkout.controller";

export const customerCheckoutRouter = Router();

customerCheckoutRouter.use(requireAuth);

customerCheckoutRouter.post("/checkout/create-session", checkoutCreateSession);

customerCheckoutRouter.post("/checkout/confirm", checkoutConfirm);
