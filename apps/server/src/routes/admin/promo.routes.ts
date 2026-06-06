import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import {
  deletePromoController,
  getPromoController,
  postPromoController,
  updatePromoController,
} from "../../controllers/admin/promo.controllers";

export const adminPromoRouter = Router();

adminPromoRouter.use(requireAdmin);

adminPromoRouter.get("/promos", getPromoController);
adminPromoRouter.post("/promos", postPromoController);
adminPromoRouter.patch("/promos/:promoId", updatePromoController);
adminPromoRouter.delete("/promos/:promoId", deletePromoController);
