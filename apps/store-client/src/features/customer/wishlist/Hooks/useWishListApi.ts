import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCustomerWishlist,
  getCustomerWishlist,
  removeCustomerWishlistItem,
} from "../api";
import { AddCustomerWishlistItemBody } from "../types";
import { useAuth } from "@clerk/react";

export const useCustomerWishListQuery = () => {
  const { isLoaded, isSignedIn } = useAuth();
  return useQuery({
    queryKey: ["customer", "wishlist", "get"],
    queryFn: () => getCustomerWishlist(),
    enabled: !!isLoaded && !!isSignedIn,
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
