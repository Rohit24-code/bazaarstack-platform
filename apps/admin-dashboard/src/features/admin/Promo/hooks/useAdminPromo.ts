import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAdminPromos,
  createAdminPromo,
  updateAdminPromo,
  deleteAdminPromo,
} from "../api";
import type { AdminPromosResponse, PromoFormValues } from "../types";

interface UpdatePromoVariables {
  promoId: string;
  body: PromoFormValues;
}

export const useGetAdminPromos = () => {
  return useQuery<AdminPromosResponse, Error>({
    queryKey: ["admin", "promos"],
    queryFn: getAdminPromos,
  });
};

export const useCreateAdminPromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PromoFormValues) => createAdminPromo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
      toast.success("Promo code created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create promo code.");
      console.error(error);
    },
  });
};

export const useUpdateAdminPromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ promoId, body }: UpdatePromoVariables) =>
      updateAdminPromo(promoId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
      toast.success("Promo code updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update promo code.");
      console.error(error);
    },
  });
};

export const useDeleteAdminPromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (promoId: string) => deleteAdminPromo(promoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
      toast.success("Promo code deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete promo code.");
      console.error(error);
    },
  });
};
