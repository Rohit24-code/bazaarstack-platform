import { create } from "zustand";
import type { Promo } from "./types";

type AdminPromoUiStore = {
  search: string;
  promoDialogOpen: boolean;
  editingPromo: Promo | null;
  setSearch: (searchTerm: string) => void;
  onAddPromo: () => void;
  onClosePromoDialog: () => void;
  onEditPromoDialog: (promo: Promo) => void;
  setPromoDialogToggle: (value: boolean) => void;
};

export const useAdminPromoUiStore = create<AdminPromoUiStore>((set) => ({
  search: "",
  promoDialogOpen: false,
  editingPromo: null,
  setSearch: (searchTerm: string) => {
    set({ search: searchTerm });
  },
  onAddPromo: () => {
    set({ promoDialogOpen: true, editingPromo: null });
  },
  onClosePromoDialog: () => {
    set({ promoDialogOpen: false, editingPromo: null });
  },
  onEditPromoDialog: (promo: Promo) => {
    set({ promoDialogOpen: true, editingPromo: promo });
  },
  setPromoDialogToggle: (value: boolean) => {
    set({ promoDialogOpen: value });
  },
}));
