import { apiGet, apiPost } from "@/lib/api"
import type {
  CustomerProduct,
  CustomerProductDetailsResponse,
  CustomerReviewPayload,
  GetCustomerProductsParams,
  ProductCategory,
} from "./types"

export async function getCustomerCategories() {
  return apiGet<ProductCategory[]>("/customer/categories")
}

export async function getCustomerProducts(params?: GetCustomerProductsParams) {
  const searchParams = new URLSearchParams()

  if (params?.category) {
    searchParams.set("category", params.category)
  }

  if (params?.brand) {
    searchParams.set("brand", params.brand)
  }

  if (params?.color) {
    searchParams.set("color", params.color)
  }

  if (params?.size) {
    searchParams.set("size", params.size)
  }

  if (params?.sort) {
    searchParams.set("sort", params.sort)
  }

  const queryString = searchParams.toString()

  const url = queryString
    ? `/customer/products?${queryString}`
    : `/customer/products`

  return apiGet<CustomerProduct[]>(url)
}

export async function getCustomerProductDetails(productId: string) {
  return apiGet<CustomerProductDetailsResponse>(
    `/customer/products/${productId}`
  )
}

export async function postReview(body: CustomerReviewPayload) {
  return apiPost<CustomerReviewPayload>(`customer/review`, body)
}

export async function getReviews(id: string) {
  return apiGet(`customer/review?id=${id}`)
}
