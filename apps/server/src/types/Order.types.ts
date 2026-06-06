import { HydratedDocument, Types } from "mongoose";

export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus = "placed" | "shipped" | "delivered" | "returned";

export type OrderItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type OrderType = {
  user: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalItems: number;
  deliveryName: string;
  deliveryAddress: string;
  promoCode?: string;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  razorpayOrderId: string;
  paymentId?: string;
  paidAt?: Date | null;
  deliveredAt?: Date | null;
  returnedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderDocument = HydratedDocument<OrderType>;

export type CustomerOrderRow = {
  _id: Types.ObjectId;
  totalItems: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paidAt?: Date | null;
  deliveredAt?: Date | null;
  returnedAt?: Date | null;
  createdAt: Date;
};
