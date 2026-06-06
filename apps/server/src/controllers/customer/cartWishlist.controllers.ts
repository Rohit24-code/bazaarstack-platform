import { Types } from "mongoose";
import { getDbUserFromReq } from "../../middleware/auth";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import { WishList } from "../../models/WishList";
import {
  CartItem,
  CartPreviewItem,
  ProductPreview,
  SyncCartItemInput,
} from "../../types/Cart.types";
import { ProductSize } from "../../types/Product.types";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import { requireFound, requireText } from "../../utils/helpers";
import type { Request, Response } from "express";

function formatProduct(product: ProductPreview) {
  const image =
    product.images.find((item) => item.isCover)?.url ||
    product.images[0]?.url ||
    "";

  const finalPrice = product.salePercentage
    ? Math.round(product.price - (product.price * product.salePercentage) / 100)
    : product.price;

  return {
    productId: String(product._id),
    title: product.title,
    brand: product.brand,
    image,
    finalPrice,
  };
}

async function getCartResponse(userId: string) {
  const cart = await Cart.findOne({ user: userId }).populate(
    //we are using this bcs in Cart we have a array of ref to product
    // having item with every object having product as ref id
    "items.product",
    "title brand price salePercentage images",
  );

  const cartItems = (cart?.items || []) as CartPreviewItem[];

  const items = cartItems.flatMap((cartItem) => {
    if (!cartItem.product) return [];

    return [
      {
        ...formatProduct(cartItem.product),
        quantity: cartItem.quantity,
        color: cartItem.color,
        size: cartItem.size,
      },
    ];
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    totalQuantity,
  };
}

async function getWishlistResponse(userId: string) {
  const wishlist = await WishList.findOne({ user: userId }).populate(
    "products",
    "title brand price salePercentage images",
  );

  const products = (wishlist?.products || []) as Array<ProductPreview | null>;

  const items = products.flatMap((productItem) => {
    if (!productItem) return [];

    return [formatProduct(productItem)];
  });

  return { items };
}

function getSelectedvariant(
  product: { colors: string[]; sizes: ProductSize[] },
  colorValue: string,
  sizeValue: string,
) {
  let color: string | undefined;
  let size: ProductSize | undefined;

  if (product.colors.length > 0) {
    if (!colorValue) {
      throw new AppError(400, "Color is required");
    }

    if (!product.colors.includes(colorValue)) {
      throw new AppError(400, "Selected color is invalid");
    }

    color = colorValue;
  }

  if (product.sizes.length > 0) {
    if (!sizeValue) {
      throw new AppError(400, "Size is required");
    }

    if (!product.sizes.includes(sizeValue as ProductSize)) {
      throw new AppError(400, "Selected size is invalid");
    }

    size = sizeValue as ProductSize;
  }

  return { color, size };
}

function isSameCartItem(
  item: CartItem,
  productId: string,
  color?: string,
  size?: string,
) {
  return (
    String(item.product) === productId &&
    (item.color || "") === (color || "") &&
    (item.size || "") === (size || "")
  );
}

export const getCustomerCartWishlist = asyncHandler(async (req, res, next) => {
  const dbUser = await getDbUserFromReq(req);

  res.json(ok(await getCartResponse(String(dbUser._id))));
});

export const postCustomerCartWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);

    const productId = String(req.body.productId || "").trim();
    const quantity = Number(req.body.quantity || 1);
    const colorValue = String(req.body.color || "").trim();
    const sizeValue = String(req.body.size || "").trim();

    requireText(productId, "Product id is required");

    if (Number.isNaN(quantity) || quantity < 1) {
      throw new AppError(400, "Quantity must be at least 1");
    }

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    const foundProduct = requireFound(product, "Product not found", 404);

    const { color, size } = getSelectedvariant(
      foundProduct,
      colorValue,
      sizeValue,
    );

    if (quantity > foundProduct.stock) {
      throw new AppError(
        400,
        "Quantity is more than the stock of this product",
      );
    }

    let cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      cart = await Cart.create({
        user: dbUser._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex((item: CartItem) =>
      isSameCartItem(item, String(foundProduct._id), color, size),
    );

    if (itemIndex != -1) {
      const nextQuantity =
        (Number(cart.items[itemIndex].quantity) || 0) + quantity;

      if (nextQuantity > foundProduct.stock) {
        throw new AppError(
          400,
          "Quantity is more than the stock of this product",
        );
      }

      cart.items[itemIndex].quantity = nextQuantity;
    } else {
      cart.items.push({
        product: foundProduct._id,
        quantity,
        color,
        size,
      });
    }

    await cart.save();

    res.json(ok(await getCartResponse(String(dbUser._id))));
  },
);

export const updateCustomerCartIncrease = asyncHandler(
  async (req, res, next) => {
    const dbuser = await getDbUserFromReq(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.query.color || "").trim();
    const sizeValue = String(req.query.size || "").trim();

    requireText(productId, "Product is required");

    const cart = await Cart.findOne({ user: dbuser._id });

    const foundCart = requireFound(cart, "Cart not found", 404);

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    const foundProduct = requireFound(product, "Product not found", 404);

    const { color, size } = getSelectedvariant(
      foundProduct,
      colorValue,
      sizeValue,
    );

    const itemIndex = cart.items.findIndex((item: CartItem) =>
      isSameCartItem(item, String(foundProduct._id), color, size),
    );

    if (itemIndex < 0) {
      throw new AppError(400, "Cart Item not found");
    }

    if (foundCart.items[itemIndex].quantity + 1 > foundProduct.stock) {
      throw new AppError(400, "Quantiy is more than stock of this product");
    }

    foundCart.items[itemIndex].quantity += 1;

    await foundCart.save();

    res.json(ok(await getCartResponse(String(dbuser._id))));
  },
);

export const updateCustomerCartDecrease = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.query.color || "").trim();
    const sizeValue = String(req.query.size || "").trim();

    requireText(productId, "Product id is required");

    const cart = await Cart.findOne({ user: dbUser._id });
    const foundCart = requireFound(cart, "Cart not found", 404);

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    const foundProduct = requireFound(product, "Product not found", 404);

    const { color, size } = getSelectedvariant(
      foundProduct,
      colorValue,
      sizeValue,
    );

    const itemIndex = cart.items.findIndex((item: CartItem) =>
      isSameCartItem(item, String(foundProduct._id), color, size),
    );

    if (itemIndex < 0) {
      throw new AppError(400, "Cart item not found here");
    }

    foundCart.items[itemIndex].quantity -= 1;

    if (foundCart.items[itemIndex].quantity <= 0) {
      // SAFETY CHECK: If quantity hits 0, we should remove the item entirely
      foundCart.items.splice(itemIndex, 1);
    }

    await foundCart.save();

    res.json(ok(await getCartResponse(String(dbUser._id))));
  },
);

export const deleteCustomerCartWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);
    const productId = String(req.params.productId || "").trim();
    const colorValue = String(req.query.color || "").trim();
    const sizeValue = String(req.query.size || "").trim();

    requireText(productId, "Product id is required");

    const cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      res.json(ok({ items: [], totalQuantity: 0 }));
      return;
    }

    cart.items = cart.items.filter(
      (item: CartItem) =>
        !isSameCartItem(item, productId, colorValue, sizeValue),
    );

    await cart.save();
    res.json(ok(await getCartResponse(String(dbUser._id))));
  },
);

export const syncCustomerCartWishlist = asyncHandler(async (req, res, next) => {
  const dbUser = await getDbUserFromReq(req);

  const incomingItems = Array.isArray(req.body.items)
    ? (req.body.items as SyncCartItemInput[])
    : [];

  let cart = await Cart.findOne({ user: dbUser._id });

  if (!cart) {
    cart = await cart.create({
      user: dbUser._id,
      items: [],
    });
  }

  for (const rawItem of incomingItems) {
    const productId = String(rawItem.productId || "").trim();
    const colorValue = String(rawItem.color || "").trim();
    const sizeValue = String(rawItem.size || "").trim();
    const quantity = Number(rawItem.quantity || 0);

    if (!productId || Number.isNaN(quantity) || quantity < 1) {
      continue;
    }

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    if (!product || product.stock < 1) {
      continue;
    }

    try {
      const { color, size } = getSelectedvariant(
        product,
        colorValue,
        sizeValue,
      );

      const itemIndex = cart.items.findIndex((item: CartItem) =>
        isSameCartItem(item, String(product._id), color, size),
      );

      if (itemIndex >= 0) {
        const nextQuantity = cart.items[itemIndex].quantity + quantity;

        cart.items[itemIndex].quantity = Math.min(nextQuantity, product.stock);
      } else {
        cart.items.push({
          product: product._id,
          quantity: Math.min(quantity, product.stock),
          color,
          size,
        });
      }
    } catch {
      continue;
    }
  }

  await cart.save();
  res.json(ok(await getCartResponse(String(dbUser._id))));
});

export const getCustomerWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);

    res.json(ok(await getWishlistResponse(String(dbUser._id))));
  },
);
export const postCustomerWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);
    const productId = String(req.body.productId || "").trim();

    requireText(productId, "Product id is required");

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    const foundProduct = requireFound(product, "Product not found", 404);

    let wishlist = await WishList.findOne({ user: dbUser._id });

    if (!wishlist) {
      wishlist = await WishList.create({
        user: dbUser._id,
        products: [],
      });
    }

    const exists = wishlist.products.some(
      (item: Types.ObjectId) => String(item) === String(foundProduct._id),
    );

    if (!exists) {
      wishlist.products.push(foundProduct._id);
      await wishlist.save();
    }

    res.json(ok(await getWishlistResponse(String(dbUser._id))));
  },
);
export const deleteCustomerWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const dbUser = await getDbUserFromReq(req);
    const productId = String(req.params.productId || "").trim();

    requireText(productId, "Product id is required");

    let wishlist = await WishList.findOne({ user: dbUser._id });

    if (!wishlist) {
      res.json(ok({ items: [] }));
      return;
    }

    wishlist.products = wishlist.products.filter(
      (item: Types.ObjectId) => String(item) !== productId,
    );

    await wishlist.save();

    res.json(ok(await getWishlistResponse(String(dbUser._id))));
  },
);
