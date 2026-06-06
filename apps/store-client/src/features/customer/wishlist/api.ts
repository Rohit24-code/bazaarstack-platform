import { apiDelete, apiGet, apiPost } from "@/lib/api"
import type {
  AddCustomerWishlistItemBody,
  CustomerWishlistResponse,
} from "./types"

export async function getCustomerWishlist() {
  return apiGet<CustomerWishlistResponse>("/customer/wishlist")
}

export async function addCustomerWishlist(body: AddCustomerWishlistItemBody) {
  return apiPost<CustomerWishlistResponse, AddCustomerWishlistItemBody>(
    "/customer/wishlist",
    body
  )
}

export async function removeCustomerWishlistItem(productId: string) {
  return apiDelete<CustomerWishlistResponse>(`/customer/wishlist/${productId}`)
}
