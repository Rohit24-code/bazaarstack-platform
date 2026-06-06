import mongoose, { Schema } from "mongoose";
import { ProductType } from "../types/Product.types";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    isCover: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [ImageSchema],
      default: [],
    },
    colors: {
      type: [String],
      required: true,
      default: [],
    },
    sizes: {
      type: [String],
      required: true,
      default: [],
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    salePercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    avgRating: {
      type: Number,
      min: 0,
      default: 0,
    },
    numRating: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product ||
  mongoose.model<ProductType>("Product", ProductSchema);
