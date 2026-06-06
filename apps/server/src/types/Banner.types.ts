import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

export type BannerItem = {
  imageUrl: string;
  imagePublicId: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type BannerDocument = HydratedDocument<BannerItem>;
