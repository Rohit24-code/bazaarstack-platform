import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { extractAdminOrders, updateAdminOrderStatus } from "../api";
import { UpdateOrderStatusVariables } from "../types";
import { toast } from "sonner";

export const useExtractAdminOrderApi = () => {
  return useQuery({
    queryKey: ["admin", "extract", "order"],
    queryFn: extractAdminOrders,
  });
};

export const useUpdateAdminOrderStatusApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "update", "order", "status"],
    mutationFn: ({ orderId, orderStatus }: UpdateOrderStatusVariables) =>
      updateAdminOrderStatus(orderId, orderStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "extract", "order"],
      });
      toast.success("Order status updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update order status.");
      console.error(error);
    },
  });
};
