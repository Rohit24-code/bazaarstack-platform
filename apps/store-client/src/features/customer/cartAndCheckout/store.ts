import { create } from "zustand";
import type { CustomerCartResponse, GuestCartItem, AppliedPromo } from "./types";

type CustomerCartAndCheckoutStore = {
  isOpen: boolean;
  promoInput: string;
  appliedPromo: AppliedPromo | null;
  guestCart: CustomerCartResponse;
  setOpen: (value: boolean) => void;
  setPromoInput: (value: string) => void;
  setAppliedPromo: (promo: AppliedPromo | null) => void;
  clearPromoInput: () => void;
  loadGuestCart: () => void;
  addGuestItem: (item: Omit<GuestCartItem, "quantity">) => void;
  increaseGuestItem: (productId: string, color?: string, size?: string) => void;
  decreaseGuestItem: (productId: string, color?: string, size?: string) => void;
  removeGuestItem: (productId: string, color?: string, size?: string) => void;
  clearGuestCart: () => void;
};

const GUEST_CART_KEY = "guest_cart_items";

function readGuestItems(): GuestCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const items = JSON.parse(
      window.localStorage.getItem(GUEST_CART_KEY) || "[]",
    );

    return Array.isArray(items)
      ? items.filter(
          (currentItem) =>
            currentItem?.productId && Number(currentItem?.quantity) > 0,
        )
      : [];
  } catch {
    return [];
  }
}

function writeGuestItems(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function getGuestResponse(items = readGuestItems()): CustomerCartResponse {
  return {
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

function isSameItem(
  item: { productId: string; color?: string; size?: string },
  target: { productId: string; color?: string; size?: string },
) {
  return (
    item.productId === target.productId &&
    (item.color || "") === (target.color || "") &&
    (item.size || "") === (target.size || "")
  );
}

export const useCustomerCartAndCheckoutStore =
  create<CustomerCartAndCheckoutStore>((set) => ({
    isOpen: false,
    promoInput: "",
    appliedPromo: null,
    guestCart: { items: [], totalQuantity: 0 },
    setOpen: (value) => set({ isOpen: value }),
    setPromoInput: (value) => set({ promoInput: value }),
    setAppliedPromo: (promo) => set({ appliedPromo: promo }),
    clearPromoInput: () => set({ promoInput: "", appliedPromo: null }),
    loadGuestCart: () => {
      set({ guestCart: getGuestResponse() });
    },
    addGuestItem: (item) => {
      const items = readGuestItems();
      const index = items.findIndex((cartItem) => isSameItem(cartItem, item));

      if (index >= 0) {
        items[index] = {
          ...items[index],
          quantity: items[index].quantity + 1,
        };
      } else {
        items.push({
          ...item,
          quantity: 1,
        });
      }

      writeGuestItems(items);
      set({ guestCart: getGuestResponse(items) });
    },
    increaseGuestItem: (productId, color, size) => {
      const items = readGuestItems().map((cartItem) =>
        isSameItem(cartItem, { productId, color, size })
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );

      writeGuestItems(items);
      set({ guestCart: getGuestResponse(items) });
    },
    decreaseGuestItem: (productId, color, size) => {
      const items = readGuestItems()
        .map((cartItem) =>
          isSameItem(cartItem, { productId, color, size })
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0);

      writeGuestItems(items);
      set({ guestCart: getGuestResponse(items) });
    },
    removeGuestItem: (productId, color, size) => {
      const items = readGuestItems().filter(
        (cartItem) => !isSameItem(cartItem, { productId, color, size }),
      );

      writeGuestItems(items);
      set({ guestCart: getGuestResponse(items) });
    },
    clearGuestCart: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(GUEST_CART_KEY);
      }
      set({ guestCart: { items: [], totalQuantity: 0 } });
    },
  }));
