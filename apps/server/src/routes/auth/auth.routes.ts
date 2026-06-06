import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { createUpdateUser, getUser } from "../../controllers/auth.controllers";

export const authRouter = Router();

authRouter.post("/sync", requireAuth, createUpdateUser);

authRouter.get("/me", requireAuth, getUser);
