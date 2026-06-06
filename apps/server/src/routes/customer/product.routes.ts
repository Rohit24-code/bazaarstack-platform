import { Router } from "express";
import {
  customerCategoriesController,
  customerProductController,
  customerProductDetailsController,
} from "../../controllers/customer/product.controllers";

export const customerProductRouter = Router();

customerProductRouter.get("/categories", customerCategoriesController);
customerProductRouter.get("/products", customerProductController);
customerProductRouter.get("/products/:id", customerProductDetailsController);
