import { create } from "zustand";
import type { Product } from "./types";

type ProductUiStore = {
  search: string;
  page: number;
  limit: number;
  productDialogOpen: boolean;
  categoryDialogOpen: boolean;
  editingProduct: Product | null;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  openCreateDialog: () => void;
  openEditDialog: (product: Product) => void;
  setProductDialogToogle: (value: boolean) => void;
  setCategoryDialogOpen: (open: boolean) => void;
};

export const useProductStore = create<ProductUiStore>((set, get) => ({
  search: "",
  page: 1,
  limit: 5,
  productDialogOpen: false,
  categoryDialogOpen: false,
  editingProduct: null,

  setSearch: (search) => set({ search, page: 1 }), // Reset to page 1 on new search
  setPage: (page) => set({ page }),

  openCreateDialog: () =>
    set({ productDialogOpen: true, editingProduct: null }),
  openEditDialog: (product) =>
    set({ productDialogOpen: true, editingProduct: product }),
  setProductDialogToogle: (value: boolean) =>
    set({ productDialogOpen: value, editingProduct: null }),
  setCategoryDialogOpen: (open) => set({ categoryDialogOpen: open }),
}));
