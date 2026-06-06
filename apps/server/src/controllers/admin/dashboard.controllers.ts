import { Category } from "../../models/Category";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import type { Request, Response } from "express";

type TotalSaleRow = {
  _id: null;
  totalSales: number;
};

export const adminDashboard = asyncHandler(
  async (_req: Request, res: Response) => {
    const [
      totalProducts,
      totalCategories,
      totalOrders,
      totalReturnedOrders,
      salesRows,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "returned" }),
      Order.aggregate<TotalSaleRow>([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
      ]),
    ]);

    res.json(
      ok({
        totalProducts,
        totalCategories,
        totalSales: salesRows[0]?.totalSales || 0,
        totalOrders,
        totalReturnedOrders,
      }),
    );
  },
);
