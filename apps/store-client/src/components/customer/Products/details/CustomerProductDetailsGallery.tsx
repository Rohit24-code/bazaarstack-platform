import { Card } from "@/components/ui/card"
import { getCoverImage } from "@/features/customer/products/productListShare"
import type { CustomerProduct } from "@/features/customer/products/types"
import { customerProductDetailsGalleryStyles } from "../../constants"

type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct
  selectedImage: string
  setSelectedImage: (value: string) => void
}

function CustomerProductDetailsGallery({
  product,
  selectedImage,
  setSelectedImage,
}: CustomerProductDetailsGalleryProps) {
  const galleryImages = product.images || []
  const displayImage = selectedImage || getCoverImage(product)

  return (
    <div className={customerProductDetailsGalleryStyles.galleryWrapClass}>
      <Card className={customerProductDetailsGalleryStyles.mainImageCardClass}>
        <div className={customerProductDetailsGalleryStyles.mainImageWrapClass}>
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.title}
              className={customerProductDetailsGalleryStyles.imageClass}
            />
          ) : (
            <div className={customerProductDetailsGalleryStyles.noImageClass}>
              No Image
            </div>
          )}
        </div>
      </Card>

      {galleryImages.length ? (
        <div
          className={customerProductDetailsGalleryStyles.thumbnailsGridClass}
        >
          {galleryImages.map((item) => {
            const isActive = displayImage === item.url

            return (
              <button
                key={item.publicId}
                type="button"
                className={`${customerProductDetailsGalleryStyles.thumbnailButtonBaseClass} ${
                  isActive
                    ? customerProductDetailsGalleryStyles.thumbnailButtonActiveClass
                    : customerProductDetailsGalleryStyles.thumbnailButtonInactiveClass
                }`}
                onClick={() => setSelectedImage(item.url)}
              >
                <div
                  className={
                    customerProductDetailsGalleryStyles.thumbnailImageWrapClass
                  }
                >
                  <img
                    src={item.url}
                    alt={product.title}
                    className={customerProductDetailsGalleryStyles.imageClass}
                  />
                </div>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default CustomerProductDetailsGallery
