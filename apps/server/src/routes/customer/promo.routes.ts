import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { postPromoController } from "../../controllers/customer/promo.controllers";

export const customerPromoRouter = Router();

customerPromoRouter.use(requireAuth);

customerPromoRouter.post("/promos/apply", postPromoController);
