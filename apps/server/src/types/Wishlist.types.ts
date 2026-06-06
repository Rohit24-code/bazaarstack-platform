import { HydratedDocument, Types } from "mongoose";

export type WishListType = {
  user: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type WishListDocument = HydratedDocument<WishListType>;
