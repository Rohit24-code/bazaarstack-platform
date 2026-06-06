import { HydratedDocument, Types } from "mongoose";

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type ProductSize = "S" | "M" | "L" | "XL";
export type ProductStatus = "active" | "inactive";

export type ProductType = {
  title: string;
  description: string;
  category: Types.ObjectId;
  brand: string;
  stock: number;
  images: ProductImage[];
  colors: string[];
  sizes: ProductSize[];
  price: number;
  salePercentage: number;
  status: ProductStatus;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
};

export type ProductDocument = HydratedDocument<ProductType>;

export type ProductSort = "recent" | "price-low" | "price-high";

export type ProductFilerListQuery = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  price?: string;
  sort?: ProductSort;
};
