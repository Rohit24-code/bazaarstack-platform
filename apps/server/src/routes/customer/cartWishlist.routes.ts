import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  deleteCustomerCartWishlist,
  deleteCustomerWishlist,
  getCustomerCartWishlist,
  getCustomerWishlist,
  postCustomerCartWishlist,
  postCustomerWishlist,
  syncCustomerCartWishlist,
  updateCustomerCartDecrease,
  updateCustomerCartIncrease,
} from "../../controllers/customer/cartWishlist.controllers";

export const customerCartWishlistRouter = Router();

customerCartWishlistRouter.use(requireAuth);

// Cart Routes
customerCartWishlistRouter.get("/cart", getCustomerCartWishlist);
customerCartWishlistRouter.post("/cart", postCustomerCartWishlist);
customerCartWishlistRouter.patch(
  "/cart/:productId/increase",
  updateCustomerCartIncrease,
);
customerCartWishlistRouter.patch(
  "/cart/:productId/decrease",
  updateCustomerCartDecrease,
);
customerCartWishlistRouter.delete(
  "/cart/:productId",
  deleteCustomerCartWishlist,
);
customerCartWishlistRouter.post("/cart/sync", syncCustomerCartWishlist);

// Wishlist Routes
customerCartWishlistRouter.get("/wishlist", getCustomerWishlist);
customerCartWishlistRouter.post("/wishlist", postCustomerWishlist);
customerCartWishlistRouter.delete(
  "/wishlist/:productId",
  deleteCustomerWishlist,
);
