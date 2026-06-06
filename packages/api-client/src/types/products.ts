export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string | ProductCategory;
  brand: string;
  variants?: Array<{
    size?: string;
    color?: string;
    stock: number;
  }>;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  productId: string;
  rating: number;
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
