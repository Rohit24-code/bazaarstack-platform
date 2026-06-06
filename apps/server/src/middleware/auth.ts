import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { AppError } from "../utils/AppError";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);

  if (!userId) {
    return next(new AppError(401, "User is not authorized!"));
  }

  next();
}

export async function getDbUserFromReq(req: Request) {
  const { userId } = getAuth(req);
  const dbUser = await User.findOne({ clerkUserId: userId });
  if (!userId) {
    throw new AppError(401, "User in Db Does not exist!");
  }

  return dbUser;
}

export const requireAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const extractCurrentDbUser = await getDbUserFromReq(req);

    if (extractCurrentDbUser.role !== "admin") {
      throw new AppError(403, "Admin access denied!");
    }

    next();
  },
);
