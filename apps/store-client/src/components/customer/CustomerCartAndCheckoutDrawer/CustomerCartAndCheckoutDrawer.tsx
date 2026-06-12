import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cartAndCheckout/store";
import { CustomerCartAndCheckoutDrawerView } from "./CustomerCartAndCheckoutDrawerView";
import {
  useGetCheckoutData,
  useApplyCustomerPromo,
  useCreateCheckoutSession,
  usePayWithPointsCheckout,
  useConfirmCheckout,
} from "@/features/customer/cartAndCheckout/api/useCustomerCart";
import { waitForRazorpay } from "@/features/customer/cartAndCheckout/razorpay";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function CustomerCartAndCheckoutDrawer() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isOpen,
    setOpen,
    guestCart,
    promoInput,
    setPromoInput,
    appliedPromo,
    setAppliedPromo,
    clearPromoInput,
  } = useCustomerCartAndCheckoutStore((state) => state);

  const {
    data: checkoutData,
    isLoading: isCheckoutDataLoading,
  } = useGetCheckoutData(!!isSignedIn && isOpen);

  const { mutate: applyPromoMutate, isPending: isPromoLoading } = useApplyCustomerPromo();
  const { mutateAsync: createSessionMutate } = useCreateCheckoutSession();
  const { mutateAsync: confirmCheckoutMutate } = useConfirmCheckout();
  const { mutate: payWithPointsMutate, isPending: isPointsCheckoutLoading } = usePayWithPointsCheckout();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const cart = isSignedIn ? checkoutData?.cart ?? { items: [], totalQuantity: 0 } : guestCart;
  const addresses = isSignedIn ? checkoutData?.addresses?.items ?? [] : [];
  const points = isSignedIn ? checkoutData?.points ?? 0 : 0;
  
  const selectedAddress = addresses.find((item) => item.isDefault) || addresses[0] || null;

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0,
  );

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setAppliedPromo(null);
      return;
    }

    applyPromoMutate(
      { code: promoInput.trim(), orderValue: subTotal },
      {
        onSuccess: (response) => {
          if (!response?.code) {
            setAppliedPromo(null);
            return;
          }
          setAppliedPromo(response);
          setPromoInput(response.code);
          toast.success("Promo successfully applied");
        },
        onError: () => {
          setAppliedPromo(null);
          toast.error("Unable to apply promo");
        },
      }
    );
  };

  const handleClearPromo = () => {
    clearPromoInput();
  };

  const handleRazorpayCheckout = async () => {
    if (!isSignedIn) {
      toast.error("Sign in to checkout");
      return;
    }

    if (!selectedAddress?._id) {
      toast.error("Add a default address from profile section");
      return;
    }

    if (!cart.items.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);

      const session = await createSessionMutate({
        addressId: selectedAddress._id,
        promoCode: appliedPromo?.code || undefined,
      });

      if (
        !session.razorpay?.keyId ||
        !session.razorpay.orderId ||
        !session.order._id
      ) {
        throw new Error("Invalid checkout session");
      }

      await waitForRazorpay();

      if (!window.Razorpay) {
        throw new Error("Razorpay not loaded");
      }
      const razorpay = new window.Razorpay({
        key: session.razorpay.keyId,
        amount: session.razorpay.amount,
        currency: session.razorpay.currency,
        order_id: session.razorpay.orderId,
        name: "Bazaar Stack",
        description: "Order payment",
        prefill: { 
          name: user?.fullName || "Customer", 
          email: user?.primaryEmailAddress?.emailAddress || "" 
        },
        handler: async (response: any) => {
          try {
            const confirmed = await confirmCheckoutMutate({
              orderId: session.order._id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (!confirmed._id) {
              throw new Error("Order confirmation failed");
            }

            setOpen(false);
            clearPromoInput();
            queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
            queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
            toast.success("Payment successful");
            navigate("/order-success");
          } catch {
            setCheckoutLoading(false);
            toast.error("Payment confirmation failed");
          }
        },

        modal: {
          ondismiss: () => setCheckoutLoading(false),
        },
      });

      razorpay.open();
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
      setCheckoutLoading(false);
      toast.error("Unable to start checkout");
    }
  };

  const handlePointsCheckout = () => {
    if (!isSignedIn) {
      toast.error("Sign in to checkout");
      return;
    }

    if (!selectedAddress?._id) {
      toast.error("Add a default address from profile section");
      return;
    }

    if (!cart.items.length) {
      toast.error("Your cart is empty");
      return;
    }

    payWithPointsMutate(
      {
        addressId: selectedAddress._id,
        promoCode: appliedPromo?.code || undefined,
      },
      {
        onSuccess: (response) => {
          if (!response._id) {
            toast.error("Unable to place order");
            return;
          }

          setOpen(false);
          clearPromoInput();
          queryClient.invalidateQueries({ queryKey: ["customer", "cart"] });
          queryClient.invalidateQueries({ queryKey: ["customer", "checkoutData"] });
          toast.success("Order placed");
          navigate("/order-success");
        },
        onError: () => {
          toast.error("Failed to place order with points");
        },
      }
    );
  };

  if (!isLoaded) return null;

  return (
    <CustomerCartAndCheckoutDrawerView
      isOpen={isOpen}
      setOpen={setOpen}
      isSignedIn={!!isSignedIn}
      cart={cart}
      addresses={addresses}
      points={points}
      promoInput={promoInput}
      setPromoInput={setPromoInput}
      appliedPromo={appliedPromo}
      promoLoading={isPromoLoading}
      checkoutLoading={checkoutLoading}
      pointsCheckoutLoading={isPointsCheckoutLoading}
      loading={isCheckoutDataLoading}
      onApplyPromo={handleApplyPromo}
      onClearPromo={handleClearPromo}
      onRazorpayCheckout={handleRazorpayCheckout}
      onPointsCheckout={handlePointsCheckout}
    />
  );
}

export default CustomerCartAndCheckoutDrawer;
