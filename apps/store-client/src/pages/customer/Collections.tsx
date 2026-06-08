import { Badge } from "@ecom/ui-core";
import { Button } from "@ecom/ui-core";
import { Card, CardContent } from "@ecom/ui-core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ecom/ui-core";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ecom/ui-core";
import { productCollectionStyles } from "./constant";
import { SlidersHorizontal } from "lucide-react";
import { useCustomerProductList } from "@/features/customer/products/useCustomerProductList";
import type { ProductSort } from "@/features/customer/products/types";
import CustomerProductCard from "@/components/customer/Products/CustomerProductCard";
import CustomerFiltersPanel from "@/components/customer/Products/CustomerFilterPanel";

const Collections = () => {
  const {
    sort,
    changeSort,
    loading,
    products,
    hasActiveFilters,
    categories,
    availableColors,
    filters,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  } = useCustomerProductList();

  return (
    <div className={productCollectionStyles.pageWrap}>
      <section className={productCollectionStyles.heroSection}>
        <div className={productCollectionStyles.heroContainer}>
          <p className={productCollectionStyles.heroEyebrow}>New Collections</p>

          <div className={productCollectionStyles.heroContent}>
            <div className={productCollectionStyles.heroTitleWrap}>
              <h1 className={productCollectionStyles.heroTitle}>
                Premium everyday essentials
              </h1>
            </div>

            <div className={productCollectionStyles.sortWrap}>
              <Select
                value={sort}
                onValueChange={(value) => changeSort(value as ProductSort)}
              >
                <SelectTrigger className={productCollectionStyles.sortTrigger}>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className={productCollectionStyles.contentContainer}>
        <div className={productCollectionStyles.topBar}>
          <div className={productCollectionStyles.activeBadgesWrap}>
            {activeFilterBadges.map((item) => (
              <Badge
                key={item.key}
                className={productCollectionStyles.activeBadge}
              >
                {item.label}: {item.value}
              </Badge>
            ))}
          </div>

          {/* mobile sheet component */}
          <div className={productCollectionStyles.topBarActions}>
            <Sheet>
              <SheetTrigger asChild>
                <Button className={productCollectionStyles.mobileFilterButton}>
                  <SlidersHorizontal
                    className={productCollectionStyles.mobileFilterIcon}
                  />
                  Filers
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className={productCollectionStyles.mobileSheetContent}
              >
                <SheetHeader
                  className={productCollectionStyles.mobileSheetHeader}
                >
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                {/* <CustomerFiltersPanel
                  categories={categories}
                  filters={filters}
                  availableColors={availableColors}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                  onToggleFacet={toggleFacet}
                /> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className={productCollectionStyles.layoutGrid}>
          <aside className={productCollectionStyles.desktopAside}>
            <Card className={productCollectionStyles.desktopFilterCard}>
              <CustomerFiltersPanel
                categories={categories}
                filters={filters}
                availableColors={availableColors}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onToggleFacet={toggleFacet}
              />
            </Card>
          </aside>

          <section className={productCollectionStyles.productSection}>
            {!loading && !products.length ? (
              <Card className={productCollectionStyles.emptyCard}>
                <CardContent
                  className={productCollectionStyles.emptyCardContent}
                >
                  <p className={productCollectionStyles.emptyTitle}>
                    No Products Found
                  </p>
                  {hasActiveFilters ? (
                    <Button
                      onClick={clearFilters}
                      className={productCollectionStyles.actionButton}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {!loading && products.length ? (
              <div className={productCollectionStyles.productGrid}>
                {products.map((item) => (
                  <CustomerProductCard key={item._id} product={item} />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Collections;
