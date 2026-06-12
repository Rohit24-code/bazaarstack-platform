import { useCustomerCartAndCheckoutStore } from "@/features/customer/cartAndCheckout/store";
import { useAuth } from "@clerk/react";
import { CustomerCartItemsView } from "./CustomerCartItemsView";
import {
  useGetCustomerCart,
  useIncreaseCustomerCartItem,
  useDecreaseCustomerCartItem,
  useRemoveCustomerCartItem,
} from "@/features/customer/cartAndCheckout/api/useCustomerCart";
import { CustomerCartItemIdentifier } from "@/features/customer/cartAndCheckout/types";
import { toast } from "sonner";

function CustomerCartItems() {
  const { isSignedIn } = useAuth();
  const {
    setOpen,
    guestCart,
    increaseGuestItem,
    decreaseGuestItem,
    removeGuestItem,
  } = useCustomerCartAndCheckoutStore((state) => state);

  const { data: cartResponse } = useGetCustomerCart(!!isSignedIn);
  const { mutate: increaseMutate } = useIncreaseCustomerCartItem();
  const { mutate: decreaseMutate } = useDecreaseCustomerCartItem();
  const { mutate: removeMutate } = useRemoveCustomerCartItem();

  const handleIncrease = (item: CustomerCartItemIdentifier) => {
    if (isSignedIn) {
      increaseMutate(item, {
        onSuccess: () => toast.success("Cart updated"),
        onError: () => toast.error("Failed to update cart"),
      });
    } else {
      increaseGuestItem(item.productId, item.color, item.size);
      toast.success("Cart updated");
    }
  };

  const handleDecrease = (item: CustomerCartItemIdentifier) => {
    if (isSignedIn) {
      decreaseMutate(item, {
        onSuccess: () => toast.success("Cart updated"),
        onError: () => toast.error("Failed to update cart"),
      });
    } else {
      decreaseGuestItem(item.productId, item.color, item.size);
      toast.success("Cart updated");
    }
  };

  const handleRemove = (item: CustomerCartItemIdentifier) => {
    if (isSignedIn) {
      removeMutate(item, {
        onSuccess: () => toast.success("Cart item removed"),
        onError: () => toast.error("Failed to remove from cart"),
      });
    } else {
      removeGuestItem(item.productId, item.color, item.size);
      toast.success("Cart item removed");
    }
  };

  const currentCart = isSignedIn
    ? cartResponse ?? { items: [], totalQuantity: 0 }
    : guestCart;

  return (
    <CustomerCartItemsView
      cart={currentCart}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onRemove={handleRemove}
      setOpen={setOpen}
    />
  );
}

export default CustomerCartItems;
