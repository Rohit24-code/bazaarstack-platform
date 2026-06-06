import { Router } from "express";
import { getCustomerHome } from "../../controllers/customer/home.controllers";

export const customerHomeRouter = Router();

customerHomeRouter.get("/home", getCustomerHome);
