import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@ecom/ui-core";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store";
import { useAuth, useUser } from "@clerk/react";
import { ScrollArea } from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { Button } from "@ecom/ui-core";
import { formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { customerCartAndCheckoutDrawerStyles } from "../constants";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cartAndCheckout/store";
import CustomerCartItems from "./CustomerCartItems";

function SummaryRow(props: { label: string; value: string | number }) {
  return (
    <div className={customerCartAndCheckoutDrawerStyles.rowClass}>
      <span className="text-muted-foreground">{props.label}</span>
      <span>{props.value}</span>
    </div>
  );
}

function CustomerCartAndCheckoutDrawer() {
  const { isBootStrapped } = useAuthStore();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    isOpen,
    setOpen,
    loadCart,
    selectedAddressId,
    addresses,
    promoInput,
    appliedPromo,
    points,
    promoLoading,
    checkoutLoading,
    pointsCheckoutLoading,
    setPromoInput,
    clearPromo,
    applyPromo,
    startRazorpayCheckout,
    startPointsCheckout,
    loading,
    cart,
  } = useCustomerCartAndCheckoutStore((state) => state);

  useEffect(() => {
    if (!isOpen || !isLoaded || !isBootStrapped) return;

    loadCart(Boolean(isSignedIn));
  }, [isBootStrapped, isLoaded, isOpen, isSignedIn, loadCart]);

  const selectedAddress =
    addresses.find((item) => item._id === selectedAddressId) || null;

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0,
  );

  const discountAmount = appliedPromo
    ? Math.round((subTotal * appliedPromo.percentage) / 100)
    : 0;

  const totalAmount = Math.max(subTotal - discountAmount, 0);

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent
        className={customerCartAndCheckoutDrawerStyles.contentClass}
      >
        <div className={customerCartAndCheckoutDrawerStyles.shellClass}>
          <div className={customerCartAndCheckoutDrawerStyles.leftPaneClass}>
            <CustomerCartItems />
          </div>
          <aside className={customerCartAndCheckoutDrawerStyles.rightPaneClass}>
            <div
              className={customerCartAndCheckoutDrawerStyles.rightInnerClass}
            >
              <div className={customerCartAndCheckoutDrawerStyles.panelClass}>
                <DrawerHeader
                  className={
                    customerCartAndCheckoutDrawerStyles.panelHeaderClass
                  }
                >
                  <DrawerTitle
                    className={
                      customerCartAndCheckoutDrawerStyles.panelTitleClass
                    }
                  >
                    Checkout
                  </DrawerTitle>
                </DrawerHeader>

                {isSignedIn ? (
                  <>
                    <ScrollArea
                      className={
                        customerCartAndCheckoutDrawerStyles.scrollClass
                      }
                    >
                      <div
                        className={
                          customerCartAndCheckoutDrawerStyles.bodyClass
                        }
                      >
                        <section className="space-y-2">
                          <p
                            className={
                              customerCartAndCheckoutDrawerStyles.sectionTitleClass
                            }
                          >
                            Default Address
                          </p>

                          {selectedAddress ? (
                            <div
                              className={
                                customerCartAndCheckoutDrawerStyles.cardClass
                              }
                            >
                              <p
                                className={
                                  customerCartAndCheckoutDrawerStyles.helperClass
                                }
                              >
                                {selectedAddress.fullName}
                              </p>
                              <p
                                className={
                                  customerCartAndCheckoutDrawerStyles.helperClass
                                }
                              >
                                {selectedAddress.address}
                                {selectedAddress.state}
                              </p>
                              <p
                                className={
                                  customerCartAndCheckoutDrawerStyles.helperClass
                                }
                              >
                                {selectedAddress.postalCode}
                              </p>
                            </div>
                          ) : (
                            <p>
                              No default address present. Add one from profile
                              dialog
                            </p>
                          )}
                        </section>

                        <section className="space-y-2">
                          <p
                            className={
                              customerCartAndCheckoutDrawerStyles.promoTitle
                            }
                          >
                            Promo Code
                          </p>
                          {!appliedPromo ? (
                            <div
                              className={
                                customerCartAndCheckoutDrawerStyles.promoRowClass
                              }
                            >
                              <Input
                                value={promoInput}
                                onChange={(event) =>
                                  setPromoInput(event.target.value)
                                }
                                placeholder="Enter Promo Code"
                                className={
                                  customerCartAndCheckoutDrawerStyles.promoInputClass
                                }
                              />
                              <Button
                                type="button"
                                variant={"default"}
                                onClick={() => void applyPromo()}
                                disabled={promoLoading || !promoInput.trim()}
                              >
                                {promoLoading ? "Applying..." : "Apply"}
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <span>
                                {appliedPromo.code} ({appliedPromo.percentage}%)
                              </span>
                              <Button
                                type="button"
                                variant={"default"}
                                onClick={clearPromo}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </section>
                        <SummaryRow label="Items" value={cart.totalQuantity} />
                        <SummaryRow label="Subtotal" value={subTotal} />
                        <SummaryRow
                          label="Discount"
                          value={formatPrice(discountAmount)}
                        />
                        <SummaryRow label="Points" value={points} />
                        <div
                          className={
                            customerCartAndCheckoutDrawerStyles.totalRowClass
                          }
                        >
                          <span>Total</span>
                          <span>{formatPrice(totalAmount)}</span>
                        </div>
                      </div>
                    </ScrollArea>

                    <DrawerFooter
                      className={
                        customerCartAndCheckoutDrawerStyles.actionClass
                      }
                    >
                      <Button
                        onClick={() => {
                          void setOpen(false);
                          void startRazorpayCheckout({
                            isSignedIn: Boolean(isSignedIn),
                            name: user?.fullName || "Customer",
                            email:
                              user?.primaryEmailAddress?.emailAddress || "",
                            onSuccess: () => navigate("/order-success"),
                          });
                        }}
                        type="button"
                        className={
                          customerCartAndCheckoutDrawerStyles.primaryButtonClass
                        }
                        disabled={
                          loading ||
                          !cart.items.length ||
                          !selectedAddressId ||
                          checkoutLoading ||
                          pointsCheckoutLoading
                        }
                      >
                        {checkoutLoading
                          ? "Processing..."
                          : "Pay with Razorpay"}
                      </Button>
                      <Button
                        onClick={() => {
                          void startPointsCheckout({
                            isSignedIn: Boolean(isSignedIn),
                            onSuccess: () => navigate("/order-success"),
                          });
                        }}
                        disabled={
                          !(
                            Boolean(isSignedIn) &&
                            Boolean(selectedAddressId) &&
                            Boolean(cart.items.length) &&
                            points >= totalAmount &&
                            !checkoutLoading &&
                            !pointsCheckoutLoading
                          )
                        }
                        type="button"
                        className={
                          customerCartAndCheckoutDrawerStyles.primaryButtonClass
                        }
                      >
                        {pointsCheckoutLoading
                          ? "Processing..."
                          : "Pay with Points"}
                      </Button>
                    </DrawerFooter>
                  </>
                ) : (
                  <div
                    className={customerCartAndCheckoutDrawerStyles.bodyClass}
                  >
                    <div
                      className={
                        customerCartAndCheckoutDrawerStyles.infoBoxClass
                      }
                    >
                      Sign in to continue to checkout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomerCartAndCheckoutDrawer;
