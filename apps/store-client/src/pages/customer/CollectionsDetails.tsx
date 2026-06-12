import Loader from "@/components/common/Loader";
import { Button } from "@ecom/ui-core";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerProductDetailsStore } from "@/features/customer/products/useCustomerDetails";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useAuth } from "@clerk/react";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collectionDetailsStyles } from "./constant";
import CustomerProductDetailsSummary from "@/components/customer/Products/details/CustomerProductDetailsSummary";
import CustomerProductDetailsGallery from "@/components/customer/Products/details/CustomerProductDetailsGallery";
import CustomerProductRelatedCard from "@/components/customer/Products/details/CustomerProductRelatedCard";
import {
  useCustomerProductDetails,
  usePostSingleReview,
  usePostReviewMutation,
} from "@/features/customer/products/api/useCustomerProduct";
import { useAddCustomerCartItem } from "@/features/customer/cartAndCheckout/api/useCustomerCart";
import {
  useAddCustomerWishListQuery,
  useCustomerWishListQuery,
  useRemoveCustomerWishListQuery,
} from "@/features/customer/wishlist/Hooks/useWishListApi";

function CollectionDetails() {
  const { id = "" } = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootStrapped, user } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  const { data: productDetailsData, isLoading } = useCustomerProductDetails(id);
  const { data: allReviews = [] } = usePostSingleReview(id);
  const { mutate: submitReviewMutate } = usePostReviewMutation(id);
  const { mutate: addCartItemMutate } = useAddCustomerCartItem();
  const { mutate: addWishList } = useAddCustomerWishListQuery();
  const { mutate: deleteWishList } = useRemoveCustomerWishListQuery();

  const {
    initProductState,
    clear,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
    review,
    reviewComment,
    setReview,
    setReviewComment,
    submitReview,
  } = useCustomerProductDetailsStore((state) => state);

  const { data: wishlistItems } = useCustomerWishListQuery();

  const product = productDetailsData?.product ?? null;
  const relatedProducts = productDetailsData?.relatedProducts ?? [];
  const isWishlistActive: any = !!product
    ? wishlistItems?.items?.some((item) => item.productId === product._id)
    : false;

  useEffect(() => {
    if (product && !initialized) {
      initProductState(product);
      setInitialized(true);
    }
  }, [product, initialized, initProductState]);

  useEffect(() => {
    return () => {
      clear();
      setInitialized(false);
    };
  }, [clear]);

  if (isLoading || !product) return <Loader />;

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
                product,
                isLoaded,
                isBootStrapped,
                Boolean(isSignedIn),
                isWishlistActive,
                addWishList,
                deleteWishList,
              )
            }
            isWishlistActive={isWishlistActive}
            onAddToCart={() => {
              return addToCart(
                product,
                isLoaded,
                isBootStrapped,
                Boolean(isSignedIn),
                addCartItemMutate,
              );
            }}
            allReviews={allReviews}
            onSubmitReview={() =>
              submitReview(id, user?.id, submitReviewMutate)
            }
            review={review}
            reviewComment={reviewComment}
            setReview={setReview}
            setReviewComment={setReviewComment}
            showReviewForm={!!user?.id}
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
  );
}

export default CollectionDetails;
