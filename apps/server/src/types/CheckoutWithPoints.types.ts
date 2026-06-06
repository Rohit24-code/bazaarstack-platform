import { Types } from "mongoose";
import { ProductSize } from "./Product.types";

export type UserAddressRow = {
  _id: Types.ObjectId;
  fullName: string;
  address: string;
  state: string;
  postalCode: string;
};

export type CheckoutUserRow = {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  points: number;
  addresses: UserAddressRow[];
};

export type CartRow = {
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
    color?: string;
    size?: ProductSize;
  }>;
};

export type ProductRow = {
  _id: Types.ObjectId;
  price: number;
  salePercentage: number;
  stock: number;
  status: "active" | "inactive";
};

export type PromoRow = {
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  startsAt: Date;
  endsAt: Date;
};
