import { HydratedDocument, Types } from "mongoose";
import { ProductSize } from "./Product.types";

export type CartItem = {
  product: Types.ObjectId;
  quantity: number;
  color?: string;
  size?: ProductSize;
};

export type CartType = {
  user: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartDocument = HydratedDocument<CartType>;

export type ProductPreview = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  salePercentage: number;
  images: Array<{
    url: string;
    isCover?: boolean;
  }>;
};

export type CartPreviewItem = {
  product: ProductPreview | null;
  quantity: number;
  color?: string;
  size?: ProductSize;
};

export type SyncCartItemInput = {
  productId?: string;
  quantity?: number;
  color?: string;
  size?: ProductSize;
};
