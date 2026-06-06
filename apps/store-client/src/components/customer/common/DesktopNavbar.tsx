import { Button } from "@store/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@store/components/ui/dropdown-menu";
import { useAuth } from "@clerk/react";
import {
  Heart,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { styles, navPages } from "./constants";
import { NavTextLink } from "./NavTextLink";
import CustomerMobileNavbar from "./MobileNavbar";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useEffect } from "react";
import CustomerWishlistDialog from "../Wishlist/CustomerWishlist";
import { useCustomerProfileStore } from "@/features/customer/profile/store";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cartAndCheckout/store";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import CustomerProfileDialog from "../Profile/CustomerProfileDialog";
import CustomerOrdersDialog from "../Order/CustomerOrderDialog";
import CustomerCartAndCheckoutDrawer from "../CustomerCartAndCheckoutDrawer/CustomerCartAndCheckoutDrawer";

function CustomerNavbar() {
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const { isBootStrapped } = useAuthStore();

  const {
    items: wishlistItems,
    loadWishlist,
    clear: clearWishlist,
    setOpen: setWishlistOpen,
  } = useCustomerWishlistStore((state) => state);

  const { openProfile, clear: clearProfile } = useCustomerProfileStore(
    (state) => state,
  );

  const { setOpen, cart, loadCart } = useCustomerCartAndCheckoutStore(
    (state) => state,
  );

  const { openOrders } = useCustomerOrdersStore((state) => state);

  useEffect(() => {
    if (!isLoaded || !isBootStrapped) return;

    void loadCart(Boolean(isSignedIn));

    if (!isSignedIn) {
      clearWishlist();
      clearProfile();
      return;
    }

    void loadWishlist();
  }, [
    clearWishlist,
    isBootStrapped,
    clearProfile,
    isSignedIn,
    isLoaded,
    loadWishlist,
    loadCart,
  ]);

  const showSignInUi = isLoaded && isBootStrapped && isSignedIn;
  const wishlistCount = wishlistItems.length;

  return (
    <header className={styles.headerClass}>
      <div className={styles.shell}>
        <Link to={"/"} className={styles.brandWrap}>
          <Store className="h-10 w-10" />
          <h1 className={styles.brandTitle}>
            <span className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              Bazaar
            </span>
            Stack
          </h1>
        </Link>

        <div className={styles.desktopCollectionsWrap}>
          <NavTextLink
            href={navPages.collections.href}
            label={navPages.collections.label}
            icon={navPages.collections.icon}
          />
        </div>

        <nav className={styles.desktopNav}>
          {showSignInUi ? (
            <button
              type="button"
              className={styles.iconLink}
              onClick={() => setWishlistOpen(true)}
            >
              <Heart className="h-[20px] w-[20px]" />
              <span className={styles.wishlistBadge}>{wishlistCount}</span>
            </button>
          ) : null}

          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className={styles.dropdownButton}>
                  <User className="h-4.5 w-4.5" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className={styles.accountDropdownContent}
              >
                <DropdownMenuItem
                  onClick={() => void openProfile()}
                  className={styles.dropdownItemLink}
                >
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => void openOrders()}
                  className={styles.dropdownItemLink}
                >
                  <ShoppingBasket className="h-4 w-4" />
                  <span>My Orders</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className={styles.dropdownItemLink}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavTextLink href="/sign-in" label="Login" icon={LogIn} />
          )}

          <div onClick={() => setOpen(true)} className={styles.iconLink}>
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className={styles.cartBadge}>{cart?.items?.length}</span>
          </div>
        </nav>

        <CustomerMobileNavbar isSignedIn={!!isSignedIn} />

        {showSignInUi ? <CustomerWishlistDialog /> : null}
        {showSignInUi ? <CustomerProfileDialog /> : null}
        {showSignInUi ? <CustomerOrdersDialog /> : null}
        <CustomerCartAndCheckoutDrawer />
      </div>
    </header>
  );
}

export default CustomerNavbar;
