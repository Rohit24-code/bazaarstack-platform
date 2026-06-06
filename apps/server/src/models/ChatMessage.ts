import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  userId: mongoose.Types.ObjectId;
  role: "user" | "model";
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["user", "model"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

export const ChatMessage =
  mongoose.models.ChatMessage ||
  mongoose.model<IChatMessage>("ChatMessage", chatMessageSchema);
