import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store"
import { formatPrice } from "@/lib/utils"
import { Heart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { customerWishlistStyles } from "../constants"

function CustomerWishlistDialog() {
  const { isOpen, setOpen, items, removeItem } = useCustomerWishlistStore(
    (state) => state
  )

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className={customerWishlistStyles.dialogClass}>
        <DialogHeader>
          <DialogTitle className={customerWishlistStyles.DialogTitleClass}>
            <Heart className={customerWishlistStyles.iconClass} />
            Wishlist
          </DialogTitle>
        </DialogHeader>
        <div className={customerWishlistStyles.contentClass}>
          {!items.length ? (
            <p className={customerWishlistStyles.emptyClass}>No Products</p>
          ) : null}

          {items.length ? (
            <div className={customerWishlistStyles.listClass}>
              {items.map((item) => (
                <div
                  key={item.productId}
                  className={customerWishlistStyles.itemClass}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={customerWishlistStyles.imageClass}
                    />
                  ) : (
                    <div className={customerWishlistStyles.noImageClass}>
                      No Image
                    </div>
                  )}

                  <div className={customerWishlistStyles.bodyClass}>
                    <p className={customerWishlistStyles.brandClass}>
                      {item.brand}
                    </p>
                    <Link
                      to={`/collection/${item.productId}`}
                      className={customerWishlistStyles.titleClass}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                    <p className={customerWishlistStyles.priceClass}>
                      {formatPrice(item.finalPrice)}
                    </p>
                    <div className={customerWishlistStyles.actionsClass}>
                      <Button
                        asChild
                        variant={"default"}
                        className={customerWishlistStyles.buttonClass}
                      >
                        <Link
                          onClick={() => setOpen(false)}
                          to={`/collection/${item.productId}`}
                        >
                          View
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        className={customerWishlistStyles.buttonClass}
                        onClick={() => void removeItem(item.productId)}
                      >
                        <Trash2 className={customerWishlistStyles.trashIcon} />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerWishlistDialog
