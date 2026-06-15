import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "../store";
import { useGetAdminCategories } from "./useProductApi";
import { getAdminProducts } from "../api";

export function useAdminProducts() {
  const { search, page, limit } = useProductStore();
  const queryClient = useQueryClient();

  const offset = (page - 1) * limit;

  useGetAdminCategories();

  useEffect(() => {
    if (!search.trim()) return;

    const timer = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["admin", "products", { search, limit, offset }],
        queryFn: () => getAdminProducts(search, limit, offset),
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [search, limit, offset, queryClient]);
}
