import {
  mobileNavLoginPages,
  mobileNavLogOutPages,
  mobileNavStyles,
  navPages,
  styles,
} from "./constants";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ecom/ui-core";
import { Heart, Menu, ShoppingBag, Store } from "lucide-react";
import { Button } from "@ecom/ui-core";
import { Link } from "react-router-dom";
import { Separator } from "@ecom/ui-core";
import DrawerSection from "./DrawerSection";
import type { NavItem } from "@/components/common/types";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { useAuthStore } from "@/features/auth/store";

type Props = {
  isSignedIn: boolean;
};

const CustomerMobileNavbar = ({ isSignedIn }: Props) => {
  const mobileAccountItems: NavItem[] = isSignedIn
    ? mobileNavLoginPages
    : mobileNavLogOutPages;

  const { signOut, isLoaded } = useAuth();
  const { isBootStrapped } = useAuthStore();

  const {
    items: wishlistItems,
    loadWishlist,
    clear: clearWishlist,
    setOpen: setWishListOpen,
  } = useCustomerWishlistStore((state) => state);

  useEffect(() => {
    if (!isLoaded || !isBootStrapped) return;

    if (!isSignedIn) {
      clearWishlist();
      return;
    }

    loadWishlist();
  }, [
    clearWishlist,
    isBootStrapped,
    isSignedIn,
    loadWishlist,
    setWishListOpen,
  ]);

  const showSignInUi = isLoaded && isBootStrapped && isSignedIn;
  const wishListCount = wishlistItems.length;

  return (
    <div className={mobileNavStyles?.mobileWrap}>
      {/* <Link to={"/cart"} className={styles.iconLink}> */}
      {showSignInUi ? (
        <button
          type="button"
          className={styles.iconLink}
          onClick={() => setWishListOpen(true)}
        >
          <Heart className="h-4.5 w-4.5" />
          <span className={styles.cartBadge}>{wishListCount}</span>
        </button>
      ) : null}
      {/* </Link> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={mobileNavStyles?.menuButton}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className={mobileNavStyles?.sheetContent}>
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className={mobileNavStyles?.brandBlock}>
            <Link to={"/"} className={mobileNavStyles.brandWrap}>
              <Store className="h-10 w-10" />
              <h1 className={mobileNavStyles.brandTitle}>
                <span className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                  Bazaar
                </span>
                Stack
              </h1>
            </Link>
          </div>

          <Separator />

          <DrawerSection title="Collections" items={[navPages?.collections]} />

          <Separator />

          <DrawerSection title="Account" items={mobileAccountItems} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerMobileNavbar;
