import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerReviewPayload, GetCustomerProductsParams } from "../types";
import {
  getCustomerCategories,
  getCustomerProductDetails,
  getCustomerProducts,
  getReviews,
  postReview,
} from "@ecom/api-client";
import { useApi } from "@/context/apiContext";

export const useCustomerProduct = (params?: GetCustomerProductsParams) => {
  const api = useApi();
  return useQuery({
    queryKey: ["customer", "product", params],
    queryFn: () => getCustomerProducts(api, params),
  });
};

export const useCustomerCategories = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["customer", "categories"],
    queryFn: () => getCustomerCategories(api),
  });
};

export const useCustomerProductDetails = (productId: string) => {
  const api = useApi();
  return useQuery({
    queryKey: ["customer", "product", "details", productId],
    queryFn: () => getCustomerProductDetails(api, productId),
    enabled: !!productId,
  });
};

export const usePostReviewMutation = (productId: string) => {
  const queryClient = useQueryClient();
  const api = useApi();
  return useMutation({
    mutationKey: ["customer", "review"],
    mutationFn: (body: CustomerReviewPayload) => postReview(api, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "post", "single", "review", productId],
      });
    },
  });
};

export const usePostSingleReview = (id: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ["customer", "post", "single", "review", id],
    queryFn: () => getReviews(api, id),
  });
};
