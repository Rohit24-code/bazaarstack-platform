import { Button } from "@/components/ui/button"
import type { ProductImage } from "@/features/admin/products/types"
import { ImagePlus, Star, X } from "lucide-react"
import { useEffect, useMemo } from "react"
import { imageStyles } from "./constants"

type ImagePickerProps = {
  existingImages: ProductImage[]
  newFiles: File[]
  coverImagePublicId: string
  onFilesAdd: (files: FileList | null) => void
  onExistingRemove: (publicId: string) => void
  onCoverImageChange: (publicId: string) => void
  error?: string
}

export function ImagePicker({
  existingImages,
  newFiles,
  coverImagePublicId,
  onFilesAdd,
  onExistingRemove,
  onCoverImageChange,
  error,
}: ImagePickerProps) {
  const previewUrls = useMemo(
    () => newFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [newFiles]
  )

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url))
    }
  }, [previewUrls])

  return (
    <div className={imageStyles.wrapperClass}>
      <div className={imageStyles.headerClass}>
        <h3 className={imageStyles.titleClass}>Images</h3>
      </div>
      <label
        className={`${imageStyles.uploadLabelClass} ${
          error ? "border-destructive text-destructive" : ""
        }`}
      >
        <ImagePlus className={imageStyles.uploadIconClass} />
        <span className={imageStyles.uploadTitleClass}>
          Upload Product Images
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          className={imageStyles.hiddenInputClass}
          onChange={(event) => onFilesAdd(event.target.files)}
        />
      </label>

      {existingImages.length > 0 ? (
        <div className={imageStyles.sectionClass}>
          <p className={imageStyles.sectionTitleClass}>Existing Images</p>

          <div className={imageStyles.gridClass}>
            {existingImages.map((image) => {
              const isCover = coverImagePublicId === image.publicId

              return (
                <div
                  key={image.publicId}
                  className={imageStyles.imageCardClass}
                >
                  <img
                    src={image.url}
                    alt="product"
                    className={imageStyles.imageClass}
                  />

                  <div className={imageStyles.imageActionsClass}>
                    <Button
                      type="button"
                      size="sm"
                      variant={isCover ? "default" : "secondary"}
                      onClick={() => onCoverImageChange(image.publicId)}
                    >
                      <Star className={imageStyles.starIconClass} />
                      {isCover ? "Cover" : "Set Cover"}
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => onExistingRemove(image.publicId)}
                    >
                      <X className={imageStyles.removeIconClass} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      {previewUrls.length > 0 ? (
        <div className={imageStyles.sectionClass}>
          <p className={imageStyles.sectionTitleClass}>New Uploads</p>
          <div className={imageStyles.gridClass}>
            {previewUrls.map((previewItem, index) => (
              <div
                key={`${previewItem.file.name}-${index}`}
                className={imageStyles.imageCardClass}
              >
                <img
                  src={previewItem.url}
                  alt={previewItem.file.name}
                  className={imageStyles.imageClass}
                />
                <div className={imageStyles.fileNameClass}>
                  {previewItem.file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
