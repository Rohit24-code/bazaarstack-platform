import { Button } from "@ecom/ui-core";
import { Separator } from "@ecom/ui-core";
import { SIZE_OPTIONS } from "@/features/customer/products/constants";
import type { ProductCategory } from "@/features/customer/products/types";
import {
  BRAND_OPTIONS,
  getSwatchColor,
  type CustomerProductFilters,
  type FacetKey,
} from "@/features/customer/products/productListShare";
import { customerFilterStyles } from "../constants";

type CustomerFiltersPanelProps = {
  categories: ProductCategory[];
  filters: CustomerProductFilters;
  availableColors: string[];
  hasActiveFilters: boolean;
  onToggleFacet: (key: FacetKey, value: string) => void;
  onClearFilters: () => void;
};

function CustomerFiltersPanel({
  categories,
  filters,
  availableColors,
  hasActiveFilters,
  onClearFilters,
  onToggleFacet,
}: CustomerFiltersPanelProps) {
  return (
    <div className={customerFilterStyles.panelWrapClass}>
      <div className={customerFilterStyles.panelHeaderClass}>
        <div>
          <h2 className={customerFilterStyles.titleClass}>Filters</h2>
        </div>
        {hasActiveFilters ? (
          <Button
            variant={"ghost"}
            className={customerFilterStyles.clearButtonClass}
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        ) : null}
      </div>

      <Separator />

      <section className={customerFilterStyles.sectionClass}>
        <h3 className={customerFilterStyles.sectionTitleClass}>Categories</h3>

        <div className={customerFilterStyles.stackedOptionsClass}>
          {categories.map((item) => {
            const isActive = filters.category === item._id;

            return (
              <Button
                key={item._id}
                type="button"
                variant={isActive ? "default" : "ghost"}
                className={customerFilterStyles.fullWidthButtonClass}
                onClick={() => onToggleFacet("category", item._id)}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </section>
      <Separator />

      <section className={customerFilterStyles.sectionClass}>
        <h3 className={customerFilterStyles.sectionTitleClass}>Brands</h3>
        <div className={customerFilterStyles.stackedOptionsClass}>
          {BRAND_OPTIONS.map((brand) => {
            const isActive = filters.brand === brand;

            return (
              <Button
                key={brand}
                type="button"
                variant={isActive ? "default" : "ghost"}
                className={customerFilterStyles.fullWidthButtonClass}
                onClick={() => onToggleFacet("brand", brand)}
              >
                {brand}
              </Button>
            );
          })}
        </div>
      </section>
      <Separator />

      <section className={customerFilterStyles.sectionClass}>
        <h3 className={customerFilterStyles.sectionTitleClass}>Colors</h3>
        <div className={customerFilterStyles.colorsWrapClass}>
          {availableColors.map((color) => {
            const isActive = filters.color === color;

            return (
              <button
                key={color}
                type="button"
                className={`${customerFilterStyles.colorButtonBaseClass} ${
                  isActive ? customerFilterStyles.colorButtonActiveClass : ""
                }`}
                onClick={() => onToggleFacet("color", color)}
              >
                <span
                  className={`${customerFilterStyles.colorSwatchBaseClass} ${
                    isActive
                      ? customerFilterStyles.colorSwatchActiveClass
                      : customerFilterStyles.colorSwatchInactiveClass
                  }`}
                  style={{ backgroundColor: getSwatchColor(color) }}
                />
              </button>
            );
          })}
        </div>
      </section>
      <Separator />

      <section className={customerFilterStyles.sectionClass}>
        <h3 className={customerFilterStyles.sectionTitleClass}>Sizes</h3>
        <div className={customerFilterStyles.sizesWrapClass}>
          {SIZE_OPTIONS.map((size: "S" | "M" | "L" | "XL") => {
            const isActive = filters.size === size;

            return (
              <Button
                key={size}
                type="button"
                variant={isActive ? "default" : "ghost"}
                className={customerFilterStyles.fullWidthButtonClass}
                onClick={() => onToggleFacet("size", size)}
              >
                {size}
              </Button>
            );
          })}
        </div>
      </section>
      <Separator />
    </div>
  );
}

export default CustomerFiltersPanel;
