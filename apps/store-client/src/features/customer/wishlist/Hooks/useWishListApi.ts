import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCustomerWishlist,
  getCustomerWishlist,
  removeCustomerWishlistItem,
} from "../api";
import { AddCustomerWishlistItemBody } from "../types";

export const useCustomerWishListQuery = () => {
  return useQuery({
    queryKey: ["customer", "wishlist", "get"],
    queryFn: () => getCustomerWishlist(),
  });
};

export const useAddCustomerWishListQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCustomerWishlistItemBody) =>
      addCustomerWishlist(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "wishlist", "get"],
      });
    },
  });
};

export const useRemoveCustomerWishListQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => removeCustomerWishlistItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "wishlist", "get"],
      });
    },
  });
};
