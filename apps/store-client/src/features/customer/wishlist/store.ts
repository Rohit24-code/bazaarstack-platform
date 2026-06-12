import { create } from "zustand";
import type { CustomerWishlistItem } from "./types";

type CustomerWishlistStore = {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  // setItems: (items: CustomerWishlistItem[]) => void;
  // loadWishlist: () => void;
  removeItem: (productId: string, fn: any) => void;
  clear: () => void;
};

export const useCustomerWishlistStore = create<CustomerWishlistStore>(
  (set) => ({
    isOpen: false,
    setOpen: (value) => set({ isOpen: value }),
    // setItems: (items) => set({ items }),
    clear: () => set({ isOpen: false }),
    // loadWishlist: () => {
    //   getCustomerWishlist();
    // },
    removeItem: (productId, removeCustomerWishlistItem) => {
      removeCustomerWishlistItem(productId);
    },
  }),
);
