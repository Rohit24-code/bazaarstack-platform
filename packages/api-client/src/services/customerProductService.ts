import { ApiClient } from "../index";
import type {
  CustomerProduct,
  CustomerProductDetailsResponse,
  CustomerReviewPayload,
  GetCustomerProductsParams,
  ProductCategory,
} from "../types/products";

// Industry Best Practice: Decouple the engine using explicit parameter injection!
export async function getCustomerCategories(api: ApiClient) {
  return api.get<ProductCategory[]>("/customer/categories");
}

export async function getCustomerProducts(
  api: ApiClient,
  params?: GetCustomerProductsParams,
) {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.set("category", params.category);
  if (params?.brand) searchParams.set("brand", params.brand);
  if (params?.color) searchParams.set("color", params.color);
  if (params?.size) searchParams.set("size", params.size);
  if (params?.sort) searchParams.set("sort", params.sort);

  const queryString = searchParams.toString();
  const url = queryString
    ? `/customer/products?${queryString}`
    : `/customer/products`;

  return api.get<CustomerProduct[]>(url);
}

export async function getCustomerProductDetails(
  api: ApiClient,
  productId: string,
) {
  return api.get<CustomerProductDetailsResponse>(
    `/customer/products/${productId}`,
  );
}

export async function postReview(api: ApiClient, body: CustomerReviewPayload) {
  return api.post<CustomerReviewPayload>("customer/review", body);
}

export async function getReviews(api: ApiClient, id: string) {
  return api.get<any>(`customer/review?id=${id}`);
}
