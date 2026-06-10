import { extractSalePrice } from "@/features/customer/products/productListShare";
import type {
  CustomerProduct,
  ProductSize,
} from "@/features/customer/products/types";
import { Badge } from "@ecom/ui-core";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@ecom/ui-core";
import { Button } from "@ecom/ui-core";
import { Heart, ShoppingBag, StarIcon } from "lucide-react";
import { customerProductDetailsSummaryStyles } from "../../constants";
import CustomerProductOptionsGroup from "./CustomerProductOptionsGroup";
import { Textarea } from "@ecom/ui-core";
import CustomerProductReviews from "./CustomerProductReviews";

type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  selectedColor: string;
  selectedSize: string;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize) => void;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
  allReviews: any[];
  onSubmitReview: () => void;
  review: number;
  reviewComment: string;
  setReview: (value: number) => void;
  setReviewComment: (value: string) => void;
  showReviewForm: boolean;
};

function CustomerProductDetailsSummary({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  toggleWishlist,
  isWishlistActive,
  onAddToCart,
  allReviews,
  onSubmitReview,
  review,
  reviewComment,
  setReview,
  setReviewComment,
  showReviewForm,
}: CustomerProductDetailsSummaryProps) {
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <section className={customerProductDetailsSummaryStyles.summaryWrapClass}>
      <div className={customerProductDetailsSummaryStyles.badgesWrapClass}>
        <Badge
          className={customerProductDetailsSummaryStyles.categoryBadgeClass}
        >
          {product?.category?.name}
        </Badge>

        {product?.stock > 0 ? (
          <Badge
            className={customerProductDetailsSummaryStyles.stockBadgeClass}
          >
            {product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
          </Badge>
        ) : (
          <Badge variant={"destructive"}>Out of stock</Badge>
        )}

        {hasSale ? (
          <Badge
            className={customerProductDetailsSummaryStyles.stockBadgeClass}
          >
            {product.salePercentage}% OFF
          </Badge>
        ) : null}
      </div>

      <div className={customerProductDetailsSummaryStyles.metaGridClass}>
        <p className={customerProductDetailsSummaryStyles.metaItemClass}>
          <span className={customerProductDetailsSummaryStyles.metaLabelClass}>
            Brand
          </span>
          <span className={customerProductDetailsSummaryStyles.metaValueClass}>
            {product?.brand}
          </span>
        </p>

        <p className={customerProductDetailsSummaryStyles.metaItemClass}>
          <span className={customerProductDetailsSummaryStyles.metaLabelClass}>
            Category
          </span>
          <span className={customerProductDetailsSummaryStyles.metaValueClass}>
            {product?.category.name}
          </span>
        </p>
      </div>

      <div className={customerProductDetailsSummaryStyles.priceBlockClass}>
        <div className={customerProductDetailsSummaryStyles.priceRowClass}>
          <span className={customerProductDetailsSummaryStyles.salePriceClass}>
            {formatPrice(salePrice)}
          </span>
          {hasSale ? (
            <span
              className={customerProductDetailsSummaryStyles.originalPriceClass}
            >
              {formatPrice(product.price)}
            </span>
          ) : null}
        </div>

        {product.description ? (
          <p className={customerProductDetailsSummaryStyles.descriptionClass}>
            {product.description}
          </p>
        ) : null}
      </div>

      {product.colors.length ? (
        <CustomerProductOptionsGroup
          values={product.colors}
          selectedValue={selectedColor}
          onSelect={setSelectedColor}
          variant="color"
        />
      ) : null}

      {product.colors.length ? (
        <CustomerProductOptionsGroup
          values={product.sizes}
          selectedValue={selectedSize}
          onSelect={setSelectedSize}
          variant="size"
        />
      ) : null}

      <Separator />

      <div className={customerProductDetailsSummaryStyles.actionButtonsClass}>
        <Button
          type="button"
          className={customerProductDetailsSummaryStyles.primaryButtonClass}
          disabled={product.stock < 1}
          onClick={() => onAddToCart()}
        >
          <ShoppingBag
            className={customerProductDetailsSummaryStyles.iconClass}
          />
          Add to Cart
        </Button>

        <Button
          type="button"
          variant="outline"
          className={customerProductDetailsSummaryStyles.secondaryButtonClass}
          onClick={() => toggleWishlist()}
        >
          <Heart
            className={`${customerProductDetailsSummaryStyles.iconClass} ${isWishlistActive ? "fill-current" : ""}`}
          />
          {isWishlistActive ? "Remove from Wishlist" : "Save to Wishlist"}
        </Button>
      </div>

      {showReviewForm && (
        <>
          <div className={customerProductDetailsSummaryStyles.reviewContainer}>
            <div className="flex gap-0.5">
              {new Array(5).fill("").map((_, index) => {
                return (
                  <div
                    key={index}
                    className="m-auto flex cursor-pointer"
                    onClick={() => setReview(index + 1)}
                  >
                    <StarIcon
                      className={`${index + 1 <= review && "fill-amber-300"}`}
                    />
                  </div>
                );
              })}
            </div>

            <Textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              className={
                customerProductDetailsSummaryStyles.secondaryButtonClass
              }
              onClick={onSubmitReview}
            >
              Submit Review
            </Button>
          </div>
        </>
      )}

      <CustomerProductReviews reviews={allReviews} />
    </section>
  );
}

export default CustomerProductDetailsSummary;
