import { create } from "zustand";

type CustomerOrdersStore = {
  isOpen: boolean;
  openOrders: () => void;
  closeOrders: () => void;
};

export const useCustomerOrdersStore = create<CustomerOrdersStore>((set) => ({
  isOpen: false,
  openOrders: () => set({ isOpen: true }),
  closeOrders: () => set({ isOpen: false }),
}));
