import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth";
import {
  addProduct,
  getProducts,
  getCategories,
  postCategories,
  updateCategory,
  updateProduct,
  getSingleProduct,
} from "../../controllers/product.controllers";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // keep file in ram instead of writing to disk
  limits: {
    fieldSize: 1024 * 1024 * 5,
    files: 10,
  },
});

export const productRouter = Router();

productRouter.use(requireAuth);
productRouter.use(requireAdmin)

productRouter.get("/categories", getCategories);

productRouter.post("/categories", postCategories);

productRouter.put("/categories/:id", updateCategory);

// product

productRouter.post("/products", upload.array("images", 10), addProduct);

productRouter.put("/product/:id", upload.array("images", 10), updateProduct);

productRouter.get("/products", getProducts);

productRouter.get("/products/:id", getSingleProduct);
