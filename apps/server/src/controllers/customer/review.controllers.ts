import { ComputeTokensResponse } from "@google/genai";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireNumber, requireText } from "../../utils/helpers";
import { User } from "../../models/User";
import { AppError } from "../../utils/AppError";
import { Product } from "../../models/Product";
import { Review } from "../../models/Review";
import { ok } from "../../utils/envelope";

export const postReviewController = asyncHandler(async (req, res) => {
  const { user, product, rating, comment } = req.body;

  requireText(comment, "Comment is Required ! ");
  requireNumber(rating, "Rating is Required !");

  // let dbUser = await User.findOne({ _id: user });

  // if (!dbUser) {
  //   throw new AppError(401, "User not found");
  // }

  let dbProduct = await Product.findOne({ _id: product });

  if (!dbProduct) {
    throw new AppError(401, "Product not found");
  }

  let newReview = await Review.create({
    user,
    product,
    rating,
    comment,
  });

  res.status(201).json(ok(newReview));
});

export const getProductReview = asyncHandler(async (req, res) => {
  let { id } = req.query;
  let dbReview = await Review.find({ product: id }).populate(
    "user",
    "name email",
  );

  if (!dbReview) {
    res.status(200).json(ok([]));
  } else {
    res.status(200).json(ok(dbReview));
  }
});
