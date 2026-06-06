import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { customerProductCardStyles } from "../constants"
import type { CustomerProduct } from "@/features/customer/products/types"
import { formatPrice } from "@/lib/utils"
import {
  extractSalePrice,
  getCoverImage,
  getSwatchColor,
} from "@/features/customer/products/productListShare"
import { Link } from "react-router-dom"
import { StarIcon } from "lucide-react"

type CustomerProductCardProps = {
  product: CustomerProduct
}

const CustomerProductCard = ({ product }: CustomerProductCardProps) => {
  const coverImage = getCoverImage(product)
  const salePrice = extractSalePrice(product)
  const hasSale = product.salePercentage > 0

  return (
    <Card className={customerProductCardStyles.card}>
      <Link
        to={`/collection/${product._id}`}
        className={customerProductCardStyles.link}
      >
        <div className={customerProductCardStyles.imageWrap}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className={customerProductCardStyles.image}
            />
          ) : (
            <div className={customerProductCardStyles.noImage}>No Image</div>
          )}

          {hasSale ? (
            <Badge className={customerProductCardStyles.saleBadge}>
              {product.salePercentage}% OFF
            </Badge>
          ) : null}
        </div>

        <CardContent className={customerProductCardStyles.content}>
          <div className={customerProductCardStyles.detailsWrap}>
            <p className={customerProductCardStyles.brand}>{product.brand}</p>
            <p className={customerProductCardStyles.title}>{product.title}</p>
            <p className={customerProductCardStyles.category}>
              {product.category?.name}
            </p>
            {product.avgRating ? (
              <div className={customerProductCardStyles.ratingWrap}>
                <StarIcon className={customerProductCardStyles.ratingIcon} />
                <span className={customerProductCardStyles.ratingText}>
                  {Number(product.avgRating).toFixed(2)}
                </span>
              </div>
            ) : null}
          </div>

          <div className={customerProductCardStyles.priceRow}>
            <span className={customerProductCardStyles.salePrice}>
              {formatPrice(salePrice)}
            </span>
            {hasSale ? (
              <span className={customerProductCardStyles.originalPrice}>
                {formatPrice(product.price)}
              </span>
            ) : null}
          </div>
          {product.colors.length ? (
            <div className={customerProductCardStyles.colorsWrap}>
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className={customerProductCardStyles.colorSwatch}
                  style={{ backgroundColor: getSwatchColor(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 ? (
                <span className={customerProductCardStyles.extraColors}>
                  +{product.colors.length - 4}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className={customerProductCardStyles.footer}>
            <Button className={customerProductCardStyles.button}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default CustomerProductCard
