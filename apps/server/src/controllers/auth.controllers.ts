import { clerkClient, getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import { User } from "../models/User";
import { ok } from "../utils/envelope";

export const createUpdateUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new AppError(401, "User is not authorized!");
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  const clerkEmailAddress =
    clerkUser.emailAddresses.find((user) => user.id === userId) ||
    clerkUser.emailAddresses[0];

  const email = clerkEmailAddress.emailAddress;

  const fullName =
    [clerkUser.firstName, clerkUser.lastName]
      ?.filter(Boolean)
      .join(" ")
      .trim() || clerkUser.username;

  const raw = process.env.ADMIN_EMAILS || "";

  const adminEmails = new Set(
    raw
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );

  // if current user is existing user or not
  const existingUser = await User.findOne({ clerkUserId: userId });

  const shouldBeAdmin = email ? adminEmails.has(email?.toLowerCase()) : false;

  // role
  const nextRole =
    existingUser?.role === "admin"
      ? "admin"
      : shouldBeAdmin
        ? "admin"
        : existingUser?.role || "user";

  const newlyCreateDbUser = await User.findOneAndUpdate(
    {
      clerkUserId: userId,
    },
    {
      clerkUserId: userId,
      email,
      name: fullName,
      role: nextRole,
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  res.status(200).json(
    ok({
      user: {
        id: newlyCreateDbUser._id,
        clerkUserId: newlyCreateDbUser.clerkUserId,
        email: newlyCreateDbUser.email,
        name: newlyCreateDbUser.name,
        role: newlyCreateDbUser.role,
      },
    }),
  );
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new AppError(401, "User is not authorized!");
  }

  const dbUser = await User.findOne({ clerkUserId: userId });

  if (!dbUser) {
    throw new AppError(404, "User is not found in db!");
  }

  res.status(200).json(
    ok({
      user: {
        id: dbUser._id,
        clerkUserId: dbUser.clerkUserId,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
      },
    }),
  );
});
