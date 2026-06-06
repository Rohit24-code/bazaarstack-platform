import { Product } from "../models/Product";
import { asyncHandler } from "../utils/asyncHandler";
import type { Request, Response, NextFunction } from "express";
import { ok } from "../utils/envelope";
import { Category } from "../models/Category";
import { requireFound, requireNumber, requireText } from "../utils/helpers";
import { AppError } from "../utils/AppError";
import { uploadManyBuffersToCloudinary } from "../utils/cloudinary";
import { getDbUserFromReq } from "../middleware/auth";

type UploadImageType = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json(ok(categories));
});

export const postCategories = asyncHandler(async (req, res, next) => {
  const { body } = req;

  const name = body;
  requireText(String(name)?.trim(), "Category name is required");

  const category = await Category.create(body);

  res.status(201).json(ok(category));
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { body } = req;

  const { name } = body;

  requireText(String(name)?.trim(), "Category name is required");

  const extractCategoryId = req.params.id as string;

  const existingCategory = await Category.findById(extractCategoryId);

  const category = requireFound(existingCategory, "Category not found");

  category.name = name;

  await category.save();

  res.status(201).json(ok(category));
});

// Product

export const getProducts = asyncHandler(async (req, res, next) => {
  const search = String(req.query.search || "").trim();
  const limit = Number(req.query.limit || 10); //10
  const offset = Number(req.query.offset || 0); //20
  const isFeatured = req.query.isFeatured === "true";

  const query: Record<string, unknown> = {};

  if (search) {
    // over here i is for case insensitive
    query.title = { $regex: search, $options: "i" };
  }

  if (isFeatured) {
    query.isFeatured = isFeatured;
  }

  const products = await Product.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  const totalCount = await Product.countDocuments(query);

  res.status(200).json(ok(products, undefined, totalCount));
});

export const getSingleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const extractedProductId = req.params.id as string;

    const exitingProduct = await Product.findById(extractedProductId).populate(
      "category",
      "name",
    );

    requireText(exitingProduct, "Product not found");

    res.status(201).json(ok(exitingProduct));
  },
);

export const addProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const brand = String(body.brand || "").trim();
    const price = Number(body.price || 0);
    const salePercentage = Number(body.salePercentage || 0);
    const stock = Number(body.stock || 0);
    const status: string = String(body.status || "active").trim();
    const colors = body.colors || [];
    const sizes = body.sizes || [];
    const isFeatured = body.isFeatured || false;

    requireText(title, "Title is required");
    requireText(description, "Description is required");
    requireText(category, "Category is required");
    requireText(brand, "Brand is required");
    requireText(status, "Status is required");
    requireNumber(price, "Price is required");
    requireNumber(salePercentage, "Sale Percentage is required");
    requireNumber(stock, "Stock is required");

    const existingCategory = await Category.findById(category);

    requireText(existingCategory, "Category not found", 404);

    const existingTitle = await Product.findOne({ title });

    if (existingTitle != null) {
      throw new AppError(400, "Product with same title exists");
    }

    const files = (req.files as Express.Multer.File[]) || [];

    if (!files.length) {
      throw new AppError(400, "At least one image is required");
    }

    const uploadedImages = await uploadManyBuffersToCloudinary(
      files.map((file) => file.buffer),
    );

    const images = uploadedImages.map((image, index) => ({
      url: image.url,
      publicId: image.publicId,
      isCover: index === 0,
    }));

    const user = await getDbUserFromReq(req);

    const product = await Product.create({
      title,
      description,
      category,
      brand,
      price,
      salePercentage,
      stock,
      status,
      images,
      colors,
      sizes,
      isFeatured,
      createBy: user._id,
    });

    const createdProduct = await Product.findById(product._id).populate(
      "category",
      "name",
    );

    res.status(201).json(ok(createdProduct));
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const productId = req.params.id as string;
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const brand = String(body.brand || "").trim();
    const price = Number(body.price || 0);
    const salePercentage = Number(body.salePercentage || 0);
    const stock = Number(body.stock || 0);
    const status: string = String(body.status || "active").trim();
    const colors = body.colors || [];
    const sizes = body.sizes || [];
    const isFeatured = body.isFeatured || false;

    const coverImagePublicId = String(body.coverImagePublicId || "").trim();

    requireText(title, "Title is required");
    requireText(description, "Description is required");
    requireText(category, "Category is required");
    requireText(brand, "Brand is required");
    requireText(status, "Status is required");
    requireNumber(price, "Price is required");
    requireNumber(salePercentage, "Sale Percentage is required");
    requireNumber(stock, "Stock is required");

    const existingCategoryDoc = await Category.findById(category);

    const existingCategory = requireFound(
      existingCategoryDoc,
      "Category not found",
      404,
    );

    const existingTitle = await Product.findOne({
      title,
      _id: { $ne: productId },
    });

    if (existingTitle != null) {
      throw new AppError(400, "Product with same title exists");
    }

    const productDoc = await Product.findById(productId);

    const product = requireFound(productDoc, "Product not found", 404);

    const files = (req.files as Express.Multer.File[]) || [];

    const uploadedNewImages = await uploadManyBuffersToCloudinary(
      files.map((file) => file.buffer),
    );

    const newlyAddedImages = uploadedNewImages?.map((image) => ({
      url: image.url,
      publicId: image.publicId,
      isCover: false,
    }));

    let existingImages: UploadImageType[] = product.images.map(
      (image: UploadImageType) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: image.isCover,
      }),
    );

    const mergedImages: UploadImageType[] = [
      ...existingImages,
      ...newlyAddedImages,
    ];

    if (!mergedImages.length) {
      throw new AppError(400, "At least one image is required");
    }

    const finalImages: UploadImageType[] = mergedImages.map(
      (image: UploadImageType, index: number) => ({
        url: image.url,
        publicId: image.publicId,
        isCover: coverImagePublicId
          ? coverImagePublicId === image.publicId
          : index === 0,
      }),
    );

    product.title = title;
    product.description = description;
    product.category = existingCategory._id;
    product.brand = brand;
    product.price = price;
    product.salePercentage = salePercentage;
    product.stock = stock;
    product.status = status;
    product.colors = colors;
    product.sizes = sizes;
    product.set("images", finalImages);

    await product.save();

    const updatedProduct = await Product.findById(product._id).populate(
      "category",
      "name",
    );

    res.json(ok(updatedProduct));
  },
);
