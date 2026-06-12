import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@ecom/ui-core";

import { ScrollArea } from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { Button } from "@ecom/ui-core";
import { formatPrice } from "@/lib/utils";
import { customerCartAndCheckoutDrawerStyles } from "../constants";
import CustomerCartItems from "./CustomerCartItems";
import type { CustomerCartResponse, AppliedPromo, CheckoutAddressOption } from "@/features/customer/cartAndCheckout/types";

function SummaryRow(props: { label: string; value: string | number }) {
  return (
    <div className={customerCartAndCheckoutDrawerStyles.rowClass}>
      <span className="text-muted-foreground">{props.label}</span>
      <span>{props.value}</span>
    </div>
  );
}

export type CustomerCartAndCheckoutDrawerViewProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  isSignedIn: boolean;
  cart: CustomerCartResponse;
  addresses: CheckoutAddressOption[];
  points: number;
  promoInput: string;
  setPromoInput: (val: string) => void;
  appliedPromo: AppliedPromo | null;
  promoLoading: boolean;
  checkoutLoading: boolean;
  pointsCheckoutLoading: boolean;
  loading: boolean;
  onApplyPromo: () => void;
  onClearPromo: () => void;
  onRazorpayCheckout: () => void;
  onPointsCheckout: () => void;
};

export function CustomerCartAndCheckoutDrawerView({
  isOpen,
  setOpen,
  isSignedIn,
  cart,
  addresses,
  points,
  promoInput,
  setPromoInput,
  appliedPromo,
  promoLoading,
  checkoutLoading,
  pointsCheckoutLoading,
  loading,
  onApplyPromo,
  onClearPromo,
  onRazorpayCheckout,
  onPointsCheckout,
}: CustomerCartAndCheckoutDrawerViewProps) {
  const selectedAddress =
    addresses.find((item) => item.isDefault) || addresses[0] || null;

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
                                onClick={onApplyPromo}
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
                                onClick={onClearPromo}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </section>
                        <SummaryRow label="Items" value={cart.totalQuantity} />
                        <SummaryRow label="Subtotal" value={formatPrice(subTotal)} />
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
                        onClick={onRazorpayCheckout}
                        type="button"
                        className={
                          customerCartAndCheckoutDrawerStyles.primaryButtonClass
                        }
                        disabled={
                          loading ||
                          !cart.items.length ||
                          !selectedAddress ||
                          checkoutLoading ||
                          pointsCheckoutLoading
                        }
                      >
                        {checkoutLoading
                          ? "Processing..."
                          : "Pay with Razorpay"}
                      </Button>
                      <Button
                        onClick={onPointsCheckout}
                        disabled={
                          !(
                            Boolean(isSignedIn) &&
                            Boolean(selectedAddress) &&
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
