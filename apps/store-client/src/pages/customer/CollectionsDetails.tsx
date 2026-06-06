import Loader from "@/components/common/Loader"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/store"
import { useCustomerProductDetailsStore } from "@/features/customer/products/useCustomerDetails"
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store"
import { useAuth } from "@clerk/react"
import { ArrowLeft } from "lucide-react"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { collectionDetailsStyles } from "./constant"
import CustomerProductDetailsSummary from "@/components/customer/Products/details/CustomerProductDetailsSummary"
import CustomerProductDetailsGallery from "@/components/customer/Products/details/CustomerProductDetailsGallery"
import CustomerProductRelatedCard from "@/components/customer/Products/details/CustomerProductRelatedCard"

function CollectionDetails() {
  const { id = "" } = useParams()
  const { isLoaded, isSignedIn } = useAuth()
  const { isBootStrapped } = useAuthStore()

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state)

  const wishlistItems = useCustomerWishlistStore((state) => state.items)

  const product = data?.product ?? null
  const relatedProducts = data?.relatedProducts ?? []
  const isWishlistActive = !!product
    ? wishlistItems.some((item) => item.productId === product._id)
    : false

  useEffect(() => {
    void loadProduct(id)

    return () => {
      clear()
    }
  }, [clear, id, loadProduct])

  if (!product) return <Loader />

  return (
    <div className={collectionDetailsStyles.pageWrapClass}>
      <section className={collectionDetailsStyles.heroSectionClass}>
        <div className={collectionDetailsStyles.heroContainerClass}>
          <Button
            asChild
            variant="ghost"
            className={collectionDetailsStyles.backButtonClass}
          >
            <Link to="/collections">
              <ArrowLeft className={collectionDetailsStyles.backIconClass} />
              Back to Collections
            </Link>
          </Button>
          <div className={collectionDetailsStyles.heroContentClass}>
            <p className={collectionDetailsStyles.heroEyebrowClass}>
              {product?.brand}
            </p>
            <p className={collectionDetailsStyles.heroTitleClass}>
              {product?.title}
            </p>
          </div>
        </div>
      </section>

      <div className={collectionDetailsStyles.contentContainerClass}>
        <div className={collectionDetailsStyles.contentGridClass}>
          <CustomerProductDetailsGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <CustomerProductDetailsSummary
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
            toggleWishlist={() =>
              toggleWishlist(
                isLoaded,
                isBootStrapped,
                Boolean(isSignedIn),
                isWishlistActive
              )
            }
            isWishlistActive={isWishlistActive}
            onAddToCart={() =>
              addToCart(isLoaded, isBootStrapped, Boolean(isSignedIn))
            }
          />
        </div>

        {relatedProducts.length ? (
          <section className={collectionDetailsStyles.relatedSectionClass}>
            <div className={collectionDetailsStyles.relatedHeadingWrapClass}>
              <p className={collectionDetailsStyles.relatedEyebrowClass}>
                You may also like
              </p>
              <p className={collectionDetailsStyles.relatedTitleClass}>
                Related Products
              </p>
            </div>

            <div className={collectionDetailsStyles.relatedGridClass}>
              {relatedProducts.map((item) => (
                <CustomerProductRelatedCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

export default CollectionDetails
