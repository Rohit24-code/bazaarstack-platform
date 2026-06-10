// export interface ProductCategory {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   image?: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }
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

export interface CustomerProduct {
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
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CustomerProductDetailsResponse {
  product: CustomerProduct;
  relatedProducts: CustomerProduct[];
  reviews: Review[];
}

export interface CustomerReviewPayload {
  user: string;
  product: string;
  rating?: number;
  comment: string;
}

export interface GetCustomerProductsParams {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
