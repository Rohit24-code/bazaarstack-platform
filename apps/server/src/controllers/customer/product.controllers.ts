import { Category } from "../../models/Category";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { ok } from "../../utils/envelope";
import { Product } from "../../models/Product";
import { ProductFilerListQuery, ProductSort } from "../../types/Product.types";
import { requireFound } from "../../utils/helpers";
import mongoose from "mongoose";

export const customerCategoriesController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json(ok(categories));
  },
);

export const customerProductController = asyncHandler(
  async (
    //By passing ProductFilerListQuery as the 4th argument, TypeScript knows exactly what req.query contains.
    // rest 1st 3 are for req , body etc.
    req: Request<{}, {}, {}, ProductFilerListQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const category = (req.query.category || "").trim();
    const brand = (req.query.brand || "").trim();
    const color = (req.query.color || "").trim();
    const size = (req.query.size || "").trim();
    const sort = ((req.query.sort || "recent") as string).trim() as ProductSort;

    const query: Record<string, unknown> = {
      status: "active",
    };

    if (category) {
      query.category = new mongoose.Types.ObjectId(category);
    }
    if (brand) {
      query.brand = brand;
    }
    if (color) {
      query.colors = color;
    }
    if (size) {
      query.sizes = size;
    }

    let sortOptions: Record<string, 1 | -1> = {
      createdAt: -1,
    };

    if (sort === "price-low") {
      sortOptions = { price: 1 };
    }
    if (sort === "price-high") {
      sortOptions = { price: 1 };
    }

    // const products = await Product.find(query)
    //   .populate("category", "name")
    //   .sort(sortOptions);

    const products = await Product.aggregate([
      {
        $match: query,
      },
      {
        $sort: sortOptions,
      },
      // 1. Simplify Category Lookup & instantly flatten it to get just the string name
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDoc",
        },
      },
      {
        $unwind: {
          path: "$categoryDoc",
          preserveNullAndEmptyArrays: true, // Prevents products without a category from disappearing
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "allReviews",
        },
      },

      {
        $addFields: {
          category: "$categoryDoc", // Overwrites the original category ID with the string name
          avgRating: { $avg: "$allReviews.rating" }, // Dynamically averages the array of ratings
        },
      },
      // 4. Clean up temporary accumulator arrays so they don't bloat the network response
      {
        $project: {
          categoryDoc: 0,
          allReviews: 0,
        },
      },
    ]);
    res.json(ok(products));
  },
);

export const customerProductDetailsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    let product = await Product.findOne({
      _id: productId,
      status: "active",
    }).populate("category", "name");

    const foundProduct = requireFound(product, "Product not found");

    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      category: foundProduct.category,
      status: "active",
    })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(
      ok({
        product: foundProduct,
        relatedProducts,
      }),
    );
  },
);
