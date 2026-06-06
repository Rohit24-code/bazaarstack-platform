import { Schema } from "mongoose";
import { BannerItem } from "../types/Banner.types";
import mongoose from "mongoose";
import { model } from "mongoose";

const bannerSchema = new Schema<BannerItem>(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Banner =
  mongoose.models.Banner || model<BannerItem>("Banner", bannerSchema);
