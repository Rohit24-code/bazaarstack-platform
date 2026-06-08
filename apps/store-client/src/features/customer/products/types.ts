export type ProductSort = "recent" | "price-low" | "price-high";

export type ProductSize = "S" | "M" | "L" | "XL";

export type ProductCategory = {
  _id: string;
  name: string;
};

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type CustomerProduct = {
  _id: string;
  title: string;
  description: string;
  category: ProductCategory;
  brand: string;
  stock: number;
  images: ProductImage[];
  colors: string[];
  sizes: ProductSize[];
  price: number;
  salePercentage: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  avgRating?: number;
};

export type GetCustomerProductsParams = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: ProductSort;
};

export type CustomerProductDetailsResponse = {
  product: CustomerProduct;
  relatedProducts: CustomerProduct[];
};

export type CustomerReviewPayload = {
  user: string;
  product: string;
  rating?: number;
  comment: string;
};

export type Category = {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductStatus = "active" | "inactive";

export type Product = {
  _id: string;
  title: string;
  description: string;
  brand: string;
  category: ProductCategory;
  images: ProductImage[];
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
};

export type CreateCategoryBody = {
  name: string;
};

export type UpdateCategoryBody = {
  name: string;
};

export type CreateProductBody = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  stock: number;
  status: ProductStatus;
  existingImages?: ProductImage[];
  coverImagePublicId?: string;
  isFeatured?: boolean;
};

export type UpdateProductBody = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  stock: number;
  status: ProductStatus;
  existingImages?: ProductImage[];
  coverImagePublicId?: string;
  isFeatured?: boolean;
};

export type ProductFormState = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: string;
  salePercentage: string;
  stock: string;
  status: ProductStatus;
  existingImages: ProductImage[];
  newFiles: File[];
  coverImagePublicId: string;
  isFeatured: boolean;
};

export type ErrorFormState = {
  title?: string;
  description?: string;
  category?: string;
  brand?: string;
  status?: string;
  price?: string;
  salePercentage?: string;
  stock?: string;
};
