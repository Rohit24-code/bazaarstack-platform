import type { Request, Response } from "express";
import { getDbUserFromReq } from "../../middleware/auth";
import { Banner } from "../../models/Banner";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import { AppError } from "../../utils/AppError";
import { uploadManyBuffersToCloudinary } from "../../utils/cloudinary";
import { AdminBannerItem } from "../../types/Setting.types";
import { BannerDocument } from "../../types/Banner.types";

function mapBanner(item: BannerDocument): AdminBannerItem {
  return {
    _id: String(item._id),
    imageUrl: item.imageUrl,
    imagePublicId: item.imagePublicId,
    createdAt: item.createdAt.toISOString(),
  };
}

const BANNER_FOLDER = "ecommerce-monster-video/banners";

export const getBanners = asyncHandler(async (req: Request, res: Response) => {
  const items = await Banner.find().sort({ createdAt: -1 });

  res.json(
    ok({
      items: items.map(mapBanner),
    }),
  );
});

export const addBanners = asyncHandler(async (req: Request, res: Response) => {
  const dbUser = await getDbUserFromReq(req);

  const files = (req.files || []) as Express.Multer.File[];

  if (!files.length) {
    throw new AppError(400, "At least one image is required");
  }

  const uploadedImages = await uploadManyBuffersToCloudinary(
    files.map((file) => file.buffer),
    BANNER_FOLDER,
  );

  const createFinalBanners = await Banner.insertMany(
    uploadedImages.map((item) => ({
      imageUrl: item.url,
      imagePublicId: item.publicId,
      createdBy: dbUser._id,
    })),
  );

  res.json(
    ok({
      items: createFinalBanners.map(mapBanner),
    }),
  );
});
