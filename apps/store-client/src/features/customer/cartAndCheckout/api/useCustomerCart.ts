import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCustomerCartItem,
  applyCustomerPromo,
  confirmCheckout,
  createCheckoutSession,
  decreaseCustomerCartItem,
  getCheckoutData,
  getCheckoutPoints,
  getCustomerCart,
  increaseCustomerCartItem,
  payWithPointsCheckout,
  removeCustomerCartItem,
  syncCustomerCart,
} from "../api";
import {
  AddCustomerCartItemBody,
  CustomerCartItemIdentifier,
  SyncCustomerCartBody,
} from "../types";

export const useGetCustomerCart = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["customer", "cart"],
    queryFn: () => getCustomerCart(),
    enabled,
  });
};

export const useAddCustomerCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCustomerCartItemBody) => addCustomerCartItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
      queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
    },
  });
};

export const useIncreaseCustomerCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CustomerCartItemIdentifier) =>
      increaseCustomerCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
      queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
    },
  });
};

export const useDecreaseCustomerCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CustomerCartItemIdentifier) =>
      decreaseCustomerCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
      queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
    },
  });
};

export const useRemoveCustomerCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CustomerCartItemIdentifier) =>
      removeCustomerCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
      queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
    },
  });
};

export const useSyncCustomerCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SyncCustomerCartBody) => syncCustomerCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
      queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
    },
  });
};

export const useGetCheckoutPoints = () => {
  return useQuery({
    queryKey: ["customer", "checkoutPoints"],
    queryFn: () => getCheckoutPoints(),
  });
};

export const useGetCheckoutData = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["customer", "checkoutData"],
    queryFn: () => getCheckoutData(),
    enabled,
  });
};

export const useApplyCustomerPromo = () => {
  return useMutation({
    mutationFn: (body: { code: string; orderValue: number }) =>
      applyCustomerPromo(body),
  });
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (body: { addressId: string; promoCode?: string }) =>
      createCheckoutSession(body),
  });
};

export const usePayWithPointsCheckout = () => {
  return useMutation({
    mutationFn: (body: { addressId: string; promoCode?: string }) =>
      payWithPointsCheckout(body),
  });
};

export const useConfirmCheckout = () => {
  return useMutation({
    mutationFn: (body: {
      orderId: string;
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => confirmCheckout(body),
  });
};
