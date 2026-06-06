import { HydratedDocument } from "mongoose";

export type CategoryType = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryDocument = HydratedDocument<CategoryType>;
