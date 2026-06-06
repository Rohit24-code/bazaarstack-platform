import mongoose from "mongoose";
import { PromoType } from "../types/Promo.types";

const PromoSchema = new mongoose.Schema<PromoType>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    minimumOrderValue: {
      type: Number,
      required: true,
      min: 0,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Promo =
  mongoose.models.Promo || mongoose.model<PromoType>("Promo", PromoSchema);
