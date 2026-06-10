import { create } from "zustand"

import { toast } from "sonner"
import { getCoverImage } from "./productListShare"
import {
  addCustomerWishlist,
  removeCustomerWishlistItem,
} from "../wishlist/api"
import { useCustomerWishlistStore } from "../wishlist/store"
import { useCustomerCartAndCheckoutStore } from "../cartAndCheckout/store"
import type { CustomerProduct, ProductSize } from "./types"

type CustomerProductDetailsStore = {
  selectedImage: string
  selectedColor: string
  selectedSize: ProductSize | ""
  review: number
  reviewComment: string
  setReview: (value: number) => void
  setReviewComment: (value: string) => void
  initProductState: (product: CustomerProduct) => void
  clear: () => void
  setSelectedImage: (value: string) => void
  setSelectedColor: (value: string) => void
  setSelectedSize: (value: ProductSize | "") => void
  addToCart: (
    product: CustomerProduct,
    isLoaded: boolean,
    isBootstrapped: boolean,
    isSignedIn: boolean
  ) => Promise<void>
  toggleWishlist: (
    product: CustomerProduct,
    isLoaded: boolean,
    isBootstrapped: boolean,
    isSignedIn: boolean,
    isWishlistActive: boolean
  ) => Promise<void>
  submitReview: (
    productId: string | undefined,
    userId: string | undefined,
    submitReviewMutate: any
  ) => void
}

const defaultState = {
  selectedImage: "",
  selectedColor: "",
  selectedSize: "" as ProductSize | "",
  review: 0,
  reviewComment: "",
}

export const useCustomerProductDetailsStore =
  create<CustomerProductDetailsStore>((set, get) => ({
    ...defaultState,
    initProductState: (product) => {
      set({
        selectedImage: product ? getCoverImage(product) : "",
        selectedColor: product?.colors?.[0] || "",
        selectedSize: product?.sizes?.[0] || "",
      })
    },
    clear: () => set(defaultState),
    setReview: (value: number) => {
      set({ review: value })
    },
    setReviewComment: (value: string) => {
      set({ reviewComment: value })
    },
    setSelectedImage: (value) => set({ selectedImage: value }),
    setSelectedColor: (value) => set({ selectedColor: value }),
    setSelectedSize: (value) => set({ selectedSize: value }),
    toggleWishlist: async (
      product,
      isLoaded,
      isBootstrapped,
      isSignedIn,
      isWishlistActive
    ) => {
      if (!product) return

      if (!isLoaded || !isBootstrapped || !isSignedIn) {
        toast.error("Sign in to save")
        return
      }

      try {
        if (isWishlistActive) {
          const response = await removeCustomerWishlistItem(product?._id)
          useCustomerWishlistStore.getState().setItems(response?.items ?? [])
          toast.success("Removed")
          return
        }

        const response = await addCustomerWishlist({
          productId: product._id,
        })
        useCustomerWishlistStore.getState().setItems(response?.items ?? [])
        toast.success("Saved")
      } catch {
        toast.error("Failed to toggle wishlist items")
      }
    },
    addToCart: async (product, isLoaded, isBootatraped, isSignedIn) => {
      const { selectedColor, selectedSize } = get()

      if (!product || product.stock < 1) return

      if (!isLoaded || !isBootatraped) {
        toast.error("Try again")
        return
      }

      await useCustomerCartAndCheckoutStore.getState().addItem(
        {
          productId: product._id,
          quantity: 1,
          color: selectedColor || undefined,
          size: selectedSize || undefined,
          title: product.title,
          brand: product.brand,
          image: getCoverImage(product),
          finalPrice: product.salePercentage
            ? product.price - (product.price * product.salePercentage) / 100
            : product.price,
        },
        isSignedIn
      )
    },
    submitReview: (productId, userId, submitReviewMutate) => {
      const { review, reviewComment, setReviewComment, setReview } = get()
      if (!productId || !userId) return;
      
      submitReviewMutate(
        {
          product: productId,
          user: userId,
          comment: reviewComment,
          rating: review,
        },
        {
          onSuccess: () => {
            setReviewComment("");
            setReview(0);
            toast.success("Review submitted");
          },
          onError: () => {
            toast.error("Failed to submit review");
          },
        }
      );
    },
  }))
