import mongoose from "mongoose";
import { WishListType } from "../types/Wishlist.types";

const WishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const WishList =
  mongoose.models.WishList ||
  mongoose.model<WishListType>("WishList", WishListSchema);
