import { mapPromo } from "../../constants";
import { Promo } from "../../models/Promo";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import { requireFound, requireText } from "../../utils/helpers";

import { Request } from "express";

async function getAllPromos() {
  const promos = await Promo.find().sort({ createdAt: -1 });
  return promos.map((item) => mapPromo(item.toObject()));
}

type PromoPayload = {
  code?: string;
  percentage?: number;
  count?: number;
  minimumOrderValue?: number;
  startsAt?: string;
  endsAt?: string;
};

function parsePromoPayload(req: Request) {
  const body = req.body;
  const code = String(body?.code || "")
    .trim()
    .toUpperCase();
  const percentage = Number(body?.percentage);
  const count = Number(body?.count);
  const minimumOrderValue = Number(body?.minimumOrderValue);
  const startsAt = new Date(body?.startsAt || "");
  const endsAt = new Date(body?.endsAt || "");

  requireText(code, "promo code is required");

  if (Number.isNaN(percentage) || percentage < 1 || percentage > 100) {
    throw new AppError(400, "Percentage must be between 1 and 10");
  }

  if (!Number.isInteger(count) || count < 1) {
    throw new AppError(400, "Promo count must be atleast 1");
  }

  if (Number.isNaN(minimumOrderValue) || minimumOrderValue < 0) {
    throw new AppError(400, "Promo count must be atleast 0 or more");
  }

  if (Number.isNaN(startsAt.getTime())) {
    throw new AppError(400, "Valid start time is required");
  }
  if (Number.isNaN(endsAt.getTime())) {
    throw new AppError(400, "Valid end time is required");
  }

  if (endsAt <= startsAt) {
    throw new AppError(400, "End time should be after start time");
  }

  return {
    code,
    percentage,
    count,
    minimumOrderValue,
    startsAt,
    endsAt,
  };
}

export const getPromoController = asyncHandler(async (req, res) => {
  res.json(
    ok({
      items: await getAllPromos(),
    }),
  );
});

export const postPromoController = asyncHandler(async (req, res) => {
  const payload = parsePromoPayload(req);
  const existingPromo = await Promo.findOne({ code: payload.code });

  if (existingPromo) {
    throw new AppError(404, "Promo code already exist");
  }

  await Promo.create(payload);

  res.json(
    ok({
      items: await getAllPromos(),
    }),
  );
});

export const updatePromoController = asyncHandler(async (req, res) => {
  const promoId = String(req.params.promoId || "").trim();

  requireText(promoId, "Promo id is required");

  const payload = parsePromoPayload(req);

  const promo = await Promo.findById(promoId);

  const foundPromo = requireFound(promo, "Promo not found", 404);

  const existingPromo = await Promo.findOne({
    code: payload.code,
    _id: { $ne: foundPromo._id },
  });

  if (existingPromo) {
    throw new AppError(404, "Promo code already exist");
  }

  foundPromo.code = payload.code;
  foundPromo.percentage = payload.percentage;
  foundPromo.count = payload.count;
  foundPromo.minimumOrderValue = payload.minimumOrderValue;
  foundPromo.startsAt = payload.startsAt;
  foundPromo.endsAt = payload.endsAt;

  await foundPromo.save();

  res.json(
    ok({
      items: await getAllPromos(),
    }),
  );
});

export const deletePromoController = asyncHandler(async (req, res) => {
  const promoId = String(req.params.promoId || "").trim();

  requireText(promoId, "Promo id is required");

  const promo = await Promo.findById(promoId);

  requireFound(promo, "Promo not found", 404);

  await promo.deleteOne();

  res.json(
    ok({
      items: await getAllPromos(),
    }),
  );
});
