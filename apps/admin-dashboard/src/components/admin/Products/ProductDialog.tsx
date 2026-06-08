import { useForm } from "react-hook-form"; // 🚀 Base form contextual manager
import { FormContainer, FormField } from "@ecom/ui-core"; // 🚀 Context mapping containers

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { Label } from "@ecom/ui-core";
import { RadioGroup, RadioGroupItem } from "@ecom/ui-core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ecom/ui-core";
import { Textarea } from "@ecom/ui-core";
import { BRANDS } from "@/features/admin/products/constants";
import type {
  Category,
  Product,
  ProductStatus,
} from "@/features/admin/products/types";
import { Button } from "@ecom/ui-core";

import { productDialogStyles } from "./constants";
import { useProductStore } from "@/features/admin/products/store";
import { useProductForm } from "@/features/admin/products/hooks/useProductForm";
import { ColorPicker } from "./ColorPicker";
import { SizeSelector } from "./SizePicker";
import { ImagePicker } from "./ImagePicker";
import { Checkbox } from "@ecom/ui-core";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@ecom/ui-core";
import { FormItem } from "@ecom/ui-core/src/components/ui/form";

export function ProductDialog() {
  const {
    categories,
    productDialogOpen,
    setProductDialogToogle,
    editingProduct,
  } = useProductStore();

  const {
    form,
    errors,
    saving,
    isEditMode,
    updateField,
    toggleSize,
    addColor,
    removeColor,
    addFiles,
    submit,
    removeExistingImage,
    changeCoverImage,
  } = useProductForm({ product: editingProduct });

  // 🚀 Initialize the ghost validation bridge to feed state downward into design tokens
  const methods = useForm({
    values: form,
  });

  return (
    <Dialog
      open={productDialogOpen}
      onOpenChange={() => setProductDialogToogle(!productDialogOpen)}
    >
      <DialogContent className={productDialogStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>

        {/* 🚀 Encapsulate the block inside the main provider state engine wrapper */}
        <FormContainer {...methods}>
          <div className={productDialogStyles.contentWrapClass}>
            <div className={productDialogStyles.twoColumnGridClass}>
              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  required
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Title"
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Brand</Label>
                <Select
                  value={form.brand}
                  required
                  onValueChange={(val) => updateField("brand", val)}
                >
                  <SelectTrigger
                    className={errors.brand ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>

                  <SelectContent>
                    {BRANDS.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.brand}
                  </p>
                )}
              </div>
            </div>
            <div className={productDialogStyles.fieldGroupClass}>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                required
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                rows={5}
                placeholder="Description"
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.description}
                </p>
              )}
            </div>

            <div className={productDialogStyles.twoColumnGridClass}>
              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  required
                  onValueChange={(val) => updateField("category", val)}
                >
                  <SelectTrigger
                    className={errors.category ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Status</Label>
                <RadioGroup
                  value={form.status}
                  required
                  onValueChange={(value) =>
                    updateField("status", value as ProductStatus)
                  }
                  className={productDialogStyles.statusGroupClass}
                >
                  <div className={productDialogStyles.statusItemClass}>
                    <RadioGroupItem value="active" id="product-status-active" />
                    <Label htmlFor="product-status-active">Active</Label>
                  </div>

                  <div className={productDialogStyles.statusItemClass}>
                    <RadioGroupItem
                      value="inactive"
                      id="product-status-inactive"
                    />
                    <Label htmlFor="product-status-inactive">Inactive</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className={productDialogStyles.threeColumnGridClass}>
              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Price</Label>
                <Input
                  value={form.price}
                  required
                  onChange={(e) => updateField("price", e.target.value)}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Sale Percentage</Label>
                <Input
                  value={form.salePercentage}
                  onChange={(e) =>
                    updateField("salePercentage", e.target.value)
                  }
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  className={errors.salePercentage ? "border-destructive" : ""}
                />
                {errors.salePercentage && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.salePercentage}
                  </p>
                )}
              </div>

              <div className={productDialogStyles.fieldGroupClass}>
                <Label>Stock</Label>
                <Input
                  value={form.stock}
                  required
                  onChange={(e) => updateField("stock", e.target.value)}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={errors.stock ? "border-destructive" : ""}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            <div className={productDialogStyles.sectionGridClass}>
              <ColorPicker
                colors={form.colors}
                onAdd={addColor}
                onRemove={removeColor}
              />

              <div className={productDialogStyles.fieldGroupClass}>
                <Label htmlFor="toggle-checkbox-2" className="mb-2 block">
                  Featured State
                </Label>
                <div className="my-auto flex items-start space-x-3 rounded-md border p-4 bg-card">
                  {/* 🚀 Bypasses all strict hooks and relies completely on your custom hook logic */}
                  <Checkbox
                    checked={form.isFeatured}
                    onCheckedChange={(e) =>
                      updateField("isFeatured", e as boolean)
                    }
                    id="toggle-checkbox-2"
                    name="toggle-checkbox-2"
                  />

                  <div className="space-y-1 leading-none">
                    <label
                      htmlFor="toggle-checkbox-2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Is Featured
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Is this a featured platform item
                    </p>
                  </div>
                </div>
              </div>

              <SizeSelector selectedSizes={form.sizes} onToggle={toggleSize} />
            </div>

            <div>
              <ImagePicker
                existingImages={form.existingImages}
                newFiles={form.newFiles}
                coverImagePublicId={form.coverImagePublicId}
                onFilesAdd={addFiles}
                onExistingRemove={removeExistingImage}
                onCoverImageChange={changeCoverImage}
                error={(errors as any).images}
              />
              {(errors as any).images && (
                <p className="mt-1 text-sm text-destructive">
                  {(errors as any).images}
                </p>
              )}
            </div>

            <div className={productDialogStyles.actionsRowClass}>
              <Button
                variant="outline"
                onClick={() => setProductDialogToogle(false)}
              >
                Cancel
              </Button>

              <Button onClick={submit} disabled={saving}>
                {saving
                  ? "Saving..."
                  : isEditMode
                    ? "Update Product"
                    : "Create Product"}
              </Button>
            </div>
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}
