import type { Category } from "@/features/customer/products/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  CustomerProduct,
  GetCustomerProductsParams,
  ProductSort,
} from "./types";
import type {
  ActiveFilterBadge,
  CustomerProductFilters,
  FacetKey,
} from "./productListShare";
import {
  useCustomerCategories,
  useCustomerProduct,
} from "./api/useCustomerProduct";

export function useCustomerProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading: isCategoriesLoading, data: categories = [] } =
    useCustomerCategories();

  const filters = useMemo<CustomerProductFilters>(
    () => ({
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      size: searchParams.get("size") || "",
    }),
    [searchParams],
  );

  const sort = (searchParams.get("sort") as ProductSort) || "recent";

  const query = useMemo<GetCustomerProductsParams>(
    () => ({
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      color: filters.color || undefined,
      sort,
      size: filters.size || undefined,
    }),
    [filters, sort],
  );

  const { isLoading: isProductLoading, data: products = [] } =
    useCustomerProduct(query);

  const hasActiveFilters = Boolean(
    filters.category || filters.brand || filters.color || filters.size,
  );

  // update params -> when user will select or deselect filters/sort
  const updateParams = useCallback(
    (next: URLSearchParams) => {
      setSearchParams(next);
    },
    [setSearchParams],
  );

  const { data: rawBaseProducts = [] } = useCustomerProduct({});

  const availableColors = useMemo<string[]>(() => {
    const uniqueColors = new Set<string>();
    rawBaseProducts.forEach((item: any) => {
      item.colors?.forEach((color: any) => uniqueColors.add(color));
    });
    return Array.from(uniqueColors).sort((a, b) => a.localeCompare(b));
  }, [rawBaseProducts]);

  // toggle filter facets
  const toggleFacet = useCallback(
    (key: FacetKey, value: string) => {
      // This creates COPY of current URL params.
      const nextValue = new URLSearchParams(searchParams);
      const currentvalue = searchParams.get(key) || "";

      if (currentvalue === value) {
        nextValue.delete(key);
      } else {
        nextValue.set(key, value);
      }

      updateParams(nextValue);
    },
    [searchParams, updateParams],
  );

  // handle sort
  const changeSort = useCallback(
    (value: ProductSort) => {
      const nextValue = new URLSearchParams(searchParams);

      if (value === "recent") {
        nextValue.delete("sort");
      } else {
        nextValue.set("sort", value);
      }

      updateParams(nextValue);
    },
    [searchParams, updateParams],
  );

  // clear all filters
  const clearFilters = useCallback(() => {
    const nextValue = new URLSearchParams(searchParams);
    nextValue.delete("category");
    nextValue.delete("brand");
    nextValue.delete("size");
    nextValue.delete("color");
    updateParams(nextValue);
  }, [searchParams, updateParams]);

  // active filter badges
  const activeFilterBadges = useMemo<ActiveFilterBadge[]>(() => {
    const items: ActiveFilterBadge[] = [];

    if (filters.category) {
      const found = categories?.find((item) => item._id === filters.category);

      items.push({
        key: "category",
        label: "Category",
        value: found?.name || filters.category,
      });
    }

    if (filters.brand) {
      items.push({
        key: "brand",
        label: "Brand",
        value: filters.brand,
      });
    }

    if (filters.color) {
      items.push({
        key: "color",
        label: "Color",
        value: filters.color,
      });
    }

    if (filters.size) {
      items.push({
        key: "size",
        label: "Size",
        value: filters.size,
      });
    }

    return items;
  }, [categories, filters]);

  return {
    categories,
    products,
    isProductLoading,
    isCategoriesLoading,
    filters,
    sort,
    hasActiveFilters,
    changeSort,
    availableColors,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  };
}
