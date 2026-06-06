import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  deleteAddressController,
  getAddressController,
  postAddressController,
  updateAddressController,
} from "../../controllers/customer/address.controllers";

export const customerAddressRouter = Router();

customerAddressRouter.use(requireAuth);

// customer
customerAddressRouter.get("/addresses", getAddressController);
customerAddressRouter.post("/addresses", postAddressController);
customerAddressRouter.put("/addresses/:addressId", updateAddressController);
customerAddressRouter.delete("/addresses/:addressId", deleteAddressController);
