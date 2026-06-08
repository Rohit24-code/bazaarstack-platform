import { Card, CardContent } from "@ecom/ui-core";
import {
  extractSalePrice,
  getCoverImage,
} from "@/features/customer/products/productListShare";

import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { customerRelatedProductCardStyles } from "../../constants";

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

function CustomerProductRelatedCard({
  product,
}: CustomerProductRelatedCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className={customerRelatedProductCardStyles.cardClass}>
      <Link
        to={`/collection/${product._id}`}
        className={customerRelatedProductCardStyles.linkClass}
      >
        <div className={customerRelatedProductCardStyles.imageWrapClass}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className={customerRelatedProductCardStyles.imageClass}
            />
          ) : (
            <div className={customerRelatedProductCardStyles.noImageClass}>
              No Image
            </div>
          )}
        </div>

        <CardContent className={customerRelatedProductCardStyles.contentClass}>
          <p className={customerRelatedProductCardStyles.brandClass}>
            {product.brand}
          </p>
          <h3 className={customerRelatedProductCardStyles.titleClass}>
            {product.title}
          </h3>

          <div className={customerRelatedProductCardStyles.priceRowClass}>
            <span className={customerRelatedProductCardStyles.salePriceClass}>
              {formatPrice(salePrice)}
            </span>
            {hasSale ? (
              <span
                className={customerRelatedProductCardStyles.originalPriceClass}
              >
                {formatPrice(product.price)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CustomerProductRelatedCard;
