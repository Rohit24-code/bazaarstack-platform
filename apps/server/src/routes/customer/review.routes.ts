import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  getProductReview,
  postReviewController,
} from "../../controllers/customer/review.controllers";

export const customerReviewRouter = Router();

// customerReviewRouter.use(requireAuth);

customerReviewRouter.post("/review", postReviewController);

customerReviewRouter.get("/review", getProductReview);
