import { useEffect, useState } from "react"
import type {
  ErrorFormState,
  Product,
  ProductFormState,
  ProductImage,
} from "../types"
import { createAdminProduct, updateAdminProduct } from "../api"
import { useProductStore } from "../store"

function getEmptyForm(): ProductFormState {
  return {
    title: "",
    description: "",
    category: "",
    brand: "",
    colors: [],
    sizes: [],
    price: "",
    salePercentage: "0",
    stock: "",
    status: "active",
    existingImages: [],
    newFiles: [],
    coverImagePublicId: "",
    isFeatured: false,
  }
}

export function getCoverImage(images: ProductImage[] = []) {
  return images.find((img) => img.isCover) ?? images[0]
}

function mapProductToFormValues(product: Product): ProductFormState {
  const cover = getCoverImage(product.images)

  return {
    title: product.title,
    description: product.description,
    category: product.category?._id,
    brand: product.brand,
    colors: product.colors ?? [],
    sizes: product.sizes ?? [],
    price: String(product.price),
    salePercentage: String(product.salePercentage ?? 0),
    stock: String(product.stock),
    status: product.status,
    existingImages: product.images ?? [],
    newFiles: [],
    coverImagePublicId: cover?.publicId ?? "",
    isFeatured: product.isFeatured ?? false,
  }
}

type AppProps = {
  product: Product | null
}

export function useProductForm({ product }: AppProps) {
  const [form, setForm] = useState<ProductFormState>(getEmptyForm())
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<ErrorFormState>({})

  const {
    productDialogOpen: open,
    setProductDialogToogle,
    refreshAll: onSaved,
  } = useProductStore()

  useEffect(() => {
    setForm(product ? mapProductToFormValues(product) : getEmptyForm())
    setErrors({})
  }, [open, product])

  const onClose = () => setProductDialogToogle(false)

  function toggleSize(size: string) {
    setForm((prev: ProductFormState) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }))
  }

  function addColor(color: string) {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors
        : [...prev.colors, color],
    }))
  }

  function removeColor(color: string) {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((item) => item !== color),
    }))
  }

  function addFiles(files: FileList | null) {
    if (!files?.length) return

    setForm((prev) => ({
      ...prev,
      newFiles: [...prev.newFiles, ...Array.from(files)],
    }))

    if ((errors as any).images) {
      setErrors((prev) => ({
        ...prev,
        images: undefined,
      }))
    }
  }

  function updateField<K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))

    if (errors[key as keyof ErrorFormState]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }))
    }
  }

  function removeExistingImage(publicId: string) {
    setForm((prev) => {
      const nextImages = prev.existingImages.filter(
        (image) => image.publicId !== publicId
      )

      const nextCoverImageId =
        prev.coverImagePublicId === publicId
          ? (nextImages[0]?.publicId ?? "")
          : prev.coverImagePublicId

      return {
        ...prev,
        existingImages: nextImages,
        coverImagePublicId: nextCoverImageId,
      }
    })
  }

  function changeCoverImage(publicId: string) {
    updateField("coverImagePublicId", publicId)
  }

  function validate(): boolean {
    const newErrors: ErrorFormState = {}
    let isValid = true

    if (!form.title.trim()) {
      newErrors.title = "Title is required"
      isValid = false
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required"
      isValid = false
    }

    if (!form.category) {
      newErrors.category = "Category is required"
      isValid = false
    }

    if (!form.brand.trim()) {
      newErrors.brand = "Brand is required"
      isValid = false
    }

    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Valid price is required"
      isValid = false
    }

    if (
      form.salePercentage &&
      (isNaN(Number(form.salePercentage)) ||
        Number(form.salePercentage) < 0 ||
        Number(form.salePercentage) > 100)
    ) {
      newErrors.salePercentage = "Sale percentage must be between 0 and 100"
      isValid = false
    }

    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) {
      newErrors.stock = "Valid stock is required"
      isValid = false
    }

    if (form.existingImages.length === 0 && form.newFiles.length === 0) {
      ;(newErrors as any).images = "At least one image is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  async function submit() {
    if (!validate()) return

    try {
      setSaving(true)

      if (product) {
        //edit

        await updateAdminProduct(
          product?._id,
          {
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            brand: form.brand,
            colors: form.colors,
            sizes: form.sizes,
            price: Number(form.price),
            salePercentage: Number(form.salePercentage) || 0,
            stock: Number(form.stock),
            status: form.status,
            existingImages: form.existingImages,
            coverImagePublicId: form.coverImagePublicId || undefined,
            isFeatured: form.isFeatured,
          },
          form.newFiles
        )
      } else {
        await createAdminProduct(
          {
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            brand: form.brand,
            colors: form.colors,
            sizes: form.sizes,
            price: Number(form.price),
            salePercentage: Number(form.salePercentage) || 0,
            stock: Number(form.stock),
            status: form.status,
            isFeatured: form.isFeatured,
          },
          form.newFiles
        )
      }

      await onSaved()
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return {
    form,
    errors,
    saving,
    isEditMode: !!product,
    toggleSize,
    addColor,
    removeColor,
    addFiles,
    submit,
    updateField,
    removeExistingImage,
    changeCoverImage,
  }
}
