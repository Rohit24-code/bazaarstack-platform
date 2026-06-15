import { useMemo } from "react";
import { useAdminPromoUiStore } from "./useAdminPromStore";
import { useGetAdminPromos } from "./hooks/useAdminPromo";

export const useAdminPromoManager = () => {
  const { search } = useAdminPromoUiStore();
  const { data: response, isLoading } = useGetAdminPromos();

  const promos = response?.items ?? [];

  const filteredPromos = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return promos;
    return promos.filter((promo) => promo.code.toLowerCase().includes(query));
  }, [search, promos]);

  return {
    filteredPromos,
    isLoading,
  };
};
