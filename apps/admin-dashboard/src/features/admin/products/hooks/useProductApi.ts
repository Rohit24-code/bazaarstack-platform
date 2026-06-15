import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  getAdminProducts,
  getAdminSingleProduct,
  createAdminProduct,
  updateAdminProduct,
} from "../api";
import type {
  Category,
  CreateCategoryBody,
  UpdateCategoryBody,
  CreateProductBody,
  UpdateProductBody,
  Product,
} from "../types";

export const useGetAdminCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["admin", "categories"],
    queryFn: getAdminCategories,
  });
};

interface UpdateCategoryVariables {
  categoryId: string;
  body: UpdateCategoryBody;
}

export const useCreateAdminCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCategoryBody) => createAdminCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create category.");
      console.error(error);
    },
  });
};

export const useUpdateAdminCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, body }: UpdateCategoryVariables) =>
      updateAdminCategory(categoryId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update category.");
      console.error(error);
    },
  });
};

export const useGetAdminProducts = (
  search?: string,
  limit?: number,
  offset?: number,
) => {
  return useQuery({
    queryKey: ["admin", "products", { search, limit, offset }],
    queryFn: () => getAdminProducts(search, limit, offset),
  });
};

export const useGetAdminSingleProduct = (productId: string) => {
  return useQuery<Product, Error>({
    queryKey: ["admin", "products", "single", productId],
    queryFn: () => getAdminSingleProduct(productId),
    enabled: !!productId, // Only fetch if productId parameter is valid
  });
};

interface CreateProductVariables {
  body: CreateProductBody;
  files: File[];
}

interface UpdateProductVariables {
  productId: string;
  body: UpdateProductBody;
  files: File[];
}

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, files }: CreateProductVariables) =>
      createAdminProduct(body, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product uploaded and saved successfully!");
    },
    onError: (error) => {
      toast.error("Failed to compile product entry.");
      console.error(error);
    },
  });
};

export const useUpdateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body, files }: UpdateProductVariables) =>
      updateAdminProduct(productId, body, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

      queryClient.invalidateQueries({
        queryKey: ["admin", "products", "single", variables.productId],
      });

      toast.success("Product metrics synchronized successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update target product record.");
      console.error(error);
    },
  });
};
