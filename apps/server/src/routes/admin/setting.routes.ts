import { requireAdmin } from "../../middleware/auth";
import multer from "multer";
import { Router } from "express";
import {
  addBanners,
  getBanners,
} from "../../controllers/admin/setting.controllers";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 5 * 1024 * 1024,
    files: 10,
  },
});

export const adminSettingsRouter = Router();

adminSettingsRouter.use(requireAdmin);

adminSettingsRouter.get("/settings/banners", getBanners);

adminSettingsRouter.post(
  "/settings/banners",
  upload.array("images", 10),
  addBanners,
);
