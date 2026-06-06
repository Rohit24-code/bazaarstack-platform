import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  getCheckoutPoints,
  payWithPoints,
} from "../../controllers/customer/checkOutWithPoints.controllers";

export const customerCheckoutWithPointsRouter = Router();

customerCheckoutWithPointsRouter.use(requireAuth);

customerCheckoutWithPointsRouter.get("/checkout/points", getCheckoutPoints);

customerCheckoutWithPointsRouter.post(
  "/checkout/pay-with-points",
  payWithPoints,
);
