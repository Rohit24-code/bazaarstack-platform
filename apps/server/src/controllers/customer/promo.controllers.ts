import { Promo } from "../../models/Promo";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import { requireText } from "../../utils/helpers";

export const postPromoController = asyncHandler(async (req, res, next) => {
  const code = String(req.body.code || "")
    .trim()
    .toUpperCase();

  const orderVal = Number(req.body.orderValue || 0);

  requireText(code, "Promo code is required");

  if (Number.isNaN(orderVal) || orderVal < 0) {
    throw new AppError(400, "Valid order value is required");
  }

  const promo = await Promo.findOne({ code });

  if (!promo) {
    throw new AppError(404, "Promo not found");
  }

  const now = new Date();

  if (now < promo.startsAt) {
    throw new AppError(400, "Promo code is not activated");
  }

  if (now > promo.endsAt) {
    throw new AppError(400, "Promo code is expired");
  }

  if (promo.code < 1) {
    throw new AppError(400, "Promo code limit is out of stock");
  }

  if (orderVal < promo.minimumOrderValue) {
    throw new AppError(
      400,
      `Minimum order value is ${promo.minimumOrderValue}`,
    );
  }

  res.json(
    ok({
      code: promo.code,
      percentage: promo.percentage,
      count: promo.count,
      minimumOrderValue: promo.minimumOrderValue,
    }),
  );
});
