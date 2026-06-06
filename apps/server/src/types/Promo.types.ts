import { HydratedDocument, Types } from "mongoose";

export type PromoType = {
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PromoDocument = HydratedDocument<PromoType>;

export type PromoDbItem = {
  _id?: Types.ObjectId;
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  startsAt: Date;
  endsAt: Date;
  createdAt?: Date;
};
