import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerOrders, returnCustomerOrder } from "../api";

export const useCustomerOrders = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["customer", "orders"],
    queryFn: () => getCustomerOrders(),
    enabled,
  });
};

export const useReturnCustomerOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => returnCustomerOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "orders"],
      });
    },
  });
};
