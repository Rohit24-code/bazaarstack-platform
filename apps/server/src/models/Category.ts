import mongoose, { HydratedDocument } from "mongoose";
import { CategoryType } from "../types/Category.types";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryType>("Category", CategorySchema);
