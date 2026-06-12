import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import { CustomerOrdersDialogView } from "./CustomerOrdersDialogView";
import {
  useCustomerOrders,
  useReturnCustomerOrder,
} from "@/features/customer/orders/api/useCustomerOrders";
import { toast } from "sonner";

function CustomerOrdersDialog() {
  const { isOpen, closeOrders } = useCustomerOrdersStore((state) => state);

  const { data, isLoading, refetch } = useCustomerOrders(isOpen);
  const { mutate: returnOrderMutate } = useReturnCustomerOrder();

  const handleReturnOrder = (orderId: string) => {
    returnOrderMutate(orderId, {
      onSuccess: () => {
        toast.success("Order return requested successfully");
      },
      onError: () => {
        toast.error("Failed to return order");
      },
    });
  };

  return (
    <CustomerOrdersDialogView
      isOpen={isOpen}
      closeOrders={closeOrders}
      loading={isLoading}
      items={data?.items ?? []}
      returnOrder={handleReturnOrder}
      loadOrders={refetch}
    />
  );
}

export default CustomerOrdersDialog;
