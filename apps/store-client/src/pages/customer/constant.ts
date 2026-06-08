import { cn } from "@/lib/utils";

// productCollection styles
export const productCollectionStyles = {
  pageWrap: cn("min-h-screen bg-background"),
  heroSection: cn(
    "border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background",
  ),
  heroContainer: cn("mx-auto max-w-7xl px-4 py-10"),
  heroEyebrow: cn("text-sm tracking-[0.2em] text-primary uppercase"),
  heroContent: cn(
    "mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
  ),
  heroTitleWrap: cn("space-y-2"),
  heroTitle: cn(
    "text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
  ),
  sortWrap: cn("flex items-center gap-3 text-sm text-muted-foreground"),
  sortTrigger: cn("w-[180px] bg-card"),
  contentContainer: cn("mx-auto max-w-7xl px-4 py-2"),
  topBar: cn(
    "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  ),
  activeBadgesWrap: cn("flex flex-wrap items-center gap-2"),
  activeBadge: cn(
    "border-border bg-secondary text-secondary-foreground hover:bg-secondary",
  ),
  topBarActions: cn("flex items-center gap-3"),
  mobileFilterButton: cn("lg:hidden"),
  mobileFilterIcon: cn("mr-2 h-4 w-4"),
  mobileSheetContent: cn("w-full max-w-sm border-border bg-background"),
  mobileSheetHeader: cn("sr-only"),
  layoutGrid: cn("grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]"),
  desktopAside: cn("hidden lg:block"),
  desktopFilterCard: cn("sticky top-24 border-border/60 bg-card/80 p-5"),
  productSection: cn("space-y-6"),
  actionButton: cn(""),
  emptyCard: cn("border-border/60 bg-card/80"),
  emptyCardContent: cn(
    "flex min-h-60 flex-col items-center justify-center gap-4 p-6 text-center",
  ),
  emptyTitle: cn("text-xl font-semibold text-foreground"),
  productGrid: cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3"),
};

// collection details
export const collectionDetailsStyles = {
  pageWrapClass: cn("min-h-screen bg-background"),
  heroSectionClass: cn(
    "border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background",
  ),
  heroContainerClass: cn("mx-auto max-w-7xl px-4 py-8"),
  backButtonClass: cn("mb-4 px-0 hover:bg-transparent"),
  backIconClass: cn("mr-2 h-4 w-4"),
  heroContentClass: cn("space-y-2"),
  heroEyebrowClass: cn("text-sm tracking-[0.2em] text-primary uppercase"),
  heroTitleClass: cn(
    "max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
  ),
  contentContainerClass: cn("mx-auto max-w-7xl px-4 py-8"),
  contentGridClass: cn("grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"),
  relatedSectionClass: cn("mt-14 space-y-5"),
  relatedHeadingWrapClass: cn("space-y-1"),
  relatedEyebrowClass: cn("text-sm tracking-[0.18em] text-primary uppercase"),
  relatedTitleClass: cn(
    "text-2xl font-semibold tracking-tight text-foreground",
  ),
  relatedGridClass: cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-4"),
};

// Home
export const homeStyles = {
  pageWrapClass: cn(
    "min-h-screen bg-background antialiased selection:bg-primary/20",
  ),
  contentContainerClass: cn("mx-auto max-w-7xl px-4 py-0 sm:px-6 lg:px-8"),
  sectionStackClass: cn("space-y-18"),

  sectionHeadClass: cn("mb-10 space-y-3"),
  sectionEyebrowClass: cn(
    "text-xs font-bold tracking-[0.3em] text-primary/80 uppercase",
  ),
  sectionTitleClass: cn(
    "text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl",
  ),

  bannerGridClass: cn("grid gap-6 lg:grid-cols-[1.6fr_1fr]"),
  bannerMainCardClass: cn(
    "group relative overflow-hidden rounded-[2rem] border border-border/30 bg-card shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5",
  ),
  bannerMainImageClass: cn(
    "h-[540px] w-full object-cover transition-all duration-700 group-hover:scale-105",
  ),

  bannerSideGridClass: cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-1"),
  bannerSideCardClass: cn(
    "group overflow-hidden rounded-[2rem] border border-border/40 bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
  ),
  bannerSideImageClass: cn(
    "h-[258px] w-full object-cover transition-all duration-700 group-hover:scale-105",
  ),

  categoryGridClass: cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-4"),
  categoryCardClass: cn(
    "group relative overflow-hidden rounded-[2rem] border border-border/40 bg-card p-1.5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
  ),
  categoryContentClass: cn(
    "h-full space-y-5 rounded-[1.6rem] bg-gradient-to-br from-background/50 to-muted/30 p-8 backdrop-blur-sm transition-colors duration-500 group-hover:bg-background/80",
  ),
  categoryIconWrapClass: cn(
    "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10",
  ),
  categoryIconClass: cn("h-6 w-6"),
  categoryTextWrapClass: cn("space-y-2"),
  categoryTitleClass: cn("text-xl font-medium tracking-tight text-foreground"),
  categoryLinkClass: cn(
    "inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80",
  ),
  categoryArrowIconClass: cn(
    "h-4 w-4 transition-transform group-hover:translate-x-1",
  ),

  couponGridClass: cn("grid gap-6 md:grid-cols-2 xl:grid-cols-4"),
  couponCardClass: cn(
    "group relative overflow-hidden rounded-[2rem] border border-dashed border-primary/20 bg-primary/[0.02] transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04]",
  ),
  couponContentClass: cn("space-y-6 p-8"),
  couponHeadClass: cn("flex items-start justify-between gap-4"),
  couponIconWrapClass: cn(
    "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:rotate-12",
  ),
  couponIconClass: cn("h-6 w-6"),
  couponCodeClass: cn("text-2xl font-bold tracking-widest text-primary"),

  couponBadgeClass: cn(
    "border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20",
  ),
  couponCodeWrapClass: cn("space-y-1 pt-2"),
  couponCodeLabelClass: cn(
    "text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase",
  ),

  productGridClass: cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-4"),
  productCardClass: cn(
    "group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/40 bg-card p-2 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5",
  ),
  productContentClass: cn("flex flex-1 flex-col justify-between space-y-5 p-4"),
  productImageWrapClass: cn(
    "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted/30",
  ),
  productImageClass: cn(
    "h-full w-full object-cover transition-all duration-700 group-hover:scale-105",
  ),
  productInfoWrapClass: cn("space-y-3"),
  productBrandRowClass: cn("flex items-center justify-between gap-3"),
  productBrandClass: cn(
    "text-xs font-semibold tracking-wider text-muted-foreground uppercase",
  ),
  productTitleClass: cn(
    "line-clamp-2 text-base leading-relaxed font-medium text-foreground transition-colors group-hover:text-primary",
  ),
  productPriceRowClass: cn("flex items-end justify-between gap-3 pt-2"),
  productPriceClass: cn("text-xl font-semibold tracking-tight text-foreground"),
  productOriginalPriceClass: cn(
    "text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/50",
  ),
  productViewClass: cn(
    "inline-flex h-8 items-center justify-center rounded-full bg-primary/5 px-4 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:bg-primary/10 group-hover:opacity-100",
  ),
};

export const orderSuccessStyles = {
  pageWrapClass: cn(
    "flex min-h-screen items-center justify-center bg-background px-4",
  ),
  cardClass: cn(
    "w-full max-w-xl space-y-5 border border-border bg-card p-8 text-center",
  ),
  iconWrapClass: cn(
    "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary",
  ),
  titleClass: cn("text-2xl font-semibold text-foreground"),
  textClass: cn("text-sm text-muted-foreground"),
  buttonRowClass: cn("flex flex-col gap-3 sm:flex-row sm:justify-center"),
  buttonClass: cn("rounded-none"),
};
