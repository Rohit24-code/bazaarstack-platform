import { cn } from "@/lib/utils"

// customer product card
export const customerProductCardStyles = {
  card: cn(
    "overflow-hidden border-border/60 bg-card/80 transition hover:border-primary/50"
  ),
  link: cn("block"),
  imageWrap: cn("relative aspect-[4/5] bg-muted"),
  image: cn(
    "h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
  ),
  noImage: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  saleBadge: cn(
    "absolute top-3 left-3 border-primary/30 bg-secondary text-primary hover:bg-secondary"
  ),
  content: cn("space-y-4 p-4"),
  detailsWrap: cn("space-y-1"),
  brand: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  title: cn("line-clamp-1 text-base font-semibold text-foreground"),
  category: cn("text-sm text-muted-foreground"),
  ratingWrap: cn("flex items-center gap-1 mt-1"),
  ratingText: cn("text-sm font-medium text-foreground"),
  ratingIcon: cn("h-4 w-4 fill-amber-400 text-amber-400"),
  priceRow: cn("flex items-center gap-2"),
  salePrice: cn("text-base font-semibold text-foreground"),
  originalPrice: cn("text-sm text-muted-foreground line-through"),
  colorsWrap: cn("flex items-center gap-2"),
  colorSwatch: cn("h-4 w-4 border border-border"),
  extraColors: cn("text-xs text-muted-foreground"),
  footer: cn("flex items-center justify-between gap-3"),
  button: cn("px-4"),
}

// customer filter
export const customerFilterStyles = {
  panelWrapClass: cn("space-y-6 overflow-y-auto px-4 py-2 lg:px-0 lg:py-0"),
  panelHeaderClass: cn("flex items-center justify-between gap-3"),
  titleClass: cn("text-base font-semibold text-foreground"),
  clearButtonClass: cn("px-2 text-sm"),
  sectionClass: cn("space-y-3"),
  sectionTitleClass: cn("text-sm font-medium text-foreground"),
  stackedOptionsClass: cn("space-y-1"),
  fullWidthButtonClass: cn("w-full justify-start"),
  colorsWrapClass: cn("flex flex-wrap gap-3"),
  colorButtonBaseClass: cn(
    "flex flex-col items-center gap-2 text-xs text-muted-foreground"
  ),
  colorButtonActiveClass: cn("text-foreground"),
  colorSwatchBaseClass: cn("h-8 w-8 border"),
  colorSwatchActiveClass: cn("border-primary ring-2 ring-primary/30"),
  colorSwatchInactiveClass: cn("border-border"),
  helperTextClass: cn("text-sm text-muted-foreground"),
  sizesWrapClass: cn("flex flex-wrap gap-2"),
  sizeButtonClass: cn("min-w-12"),
}

// customer product details gallery
export const customerProductDetailsGalleryStyles = {
  galleryWrapClass: cn("space-y-4"),
  mainImageCardClass: cn("overflow-hidden border-border/60 bg-card/80"),
  mainImageWrapClass: cn("aspect-[4/5] bg-muted"),
  imageClass: cn("h-full w-full object-cover"),
  noImageClass: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  thumbnailsGridClass: cn("grid grid-cols-4 gap-3 sm:grid-cols-5"),
  thumbnailButtonBaseClass: cn("overflow-hidden border bg-card"),
  thumbnailButtonActiveClass: cn("border-primary ring-2 ring-primary/30"),
  thumbnailButtonInactiveClass: cn("border-border/60"),
  thumbnailImageWrapClass: cn("aspect-square bg-muted"),
}

// customer product details summary
export const customerProductDetailsSummaryStyles = {
  summaryWrapClass: cn("space-y-6"),
  badgesWrapClass: cn("flex flex-wrap items-center gap-2"),
  categoryBadgeClass: cn(
    "border-border bg-secondary text-secondary-foreground hover:bg-secondary"
  ),
  stockBadgeClass: cn(
    "border-primary/30 bg-primary/15 text-primary hover:bg-primary/15"
  ),
  metaGridClass: cn("grid gap-3 text-sm sm:grid-cols-2"),
  metaItemClass: cn("space-y-1"),
  metaLabelClass: cn("block text-muted-foreground"),
  metaValueClass: cn("block font-medium text-foreground"),
  priceBlockClass: cn("space-y-3"),
  priceRowClass: cn("flex flex-wrap items-center gap-3"),
  salePriceClass: cn("text-3xl font-semibold text-foreground"),
  originalPriceClass: cn("text-lg text-muted-foreground line-through"),
  descriptionClass: cn(
    "text-sm leading-7 whitespace-pre-line text-muted-foreground"
  ),
  actionButtonsClass: cn("flex flex-col gap-3 sm:flex-row"),
  primaryButtonClass: cn("sm:flex-1"),
  secondaryButtonClass: cn("sm:flex-1"),
  reviewContainer: cn("flex justify-center gap-3 align-middle"),
  iconClass: cn("mr-2 h-4 w-4"),
}

// customer options group
export const customerOptionsGroupStyles = {
  wrapClass: cn("flex flex-wrap gap-2"),
  baseButtonClass: cn(
    "inline-flex items-center justify-center gap-2 border px-4 py-2 text-sm font-medium transition"
  ),
  activeButtonClass: cn(
    "border-primary bg-primary/15 text-primary ring-2 ring-primary/20"
  ),
  inactiveButtonClass: cn(
    "border-border bg-secondary text-secondary-foreground hover:border-primary/40"
  ),
  sizeButtonClass: cn("min-w-12"),
  colorButtonClass: cn(""),
  swatchClass: cn("h-4 w-4 border border-border"),
}

// customer related product cards
export const customerRelatedProductCardStyles = {
  cardClass: cn(
    "overflow-hidden border-border/60 bg-card/80 transition hover:border-primary/50"
  ),
  linkClass: cn("block"),
  imageWrapClass: cn("aspect-[4/5] bg-muted"),
  imageClass: cn("h-full w-full object-cover"),
  noImageClass: cn(
    "flex h-full items-center justify-center text-sm text-muted-foreground"
  ),
  contentClass: cn("space-y-2 p-4"),
  brandClass: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  titleClass: cn("line-clamp-1 text-base font-semibold text-foreground"),
  priceRowClass: cn("flex items-center gap-2"),
  salePriceClass: cn("font-semibold text-foreground"),
  originalPriceClass: cn("text-sm text-muted-foreground line-through"),
}

// wishlist style
export const customerWishlistStyles = {
  dialogClass: cn("sm:max-w-xl"),
  contentClass: cn("space-y-4"),
  listClass: cn("space-y-3"),
  itemClass: cn(
    "flex items-start gap-3 border border-border/60 bg-card/80 p-3"
  ),
  imageClass: cn("h-20 w-16 shrink-0 object-cover"),
  noImageClass: cn(
    "flex h-20 w-16 shrink-0 items-center justify-center bg-muted text-xs text-muted-foreground"
  ),
  bodyClass: cn("min-w-0 flex-1 space-y-1"),
  brandClass: cn("text-xs tracking-[0.18em] text-muted-foreground uppercase"),
  titleClass: cn("line-clamp-2 text-sm font-medium text-foreground"),
  priceClass: cn("text-sm font-semibold text-foreground"),
  actionsClass: cn("flex gap-2 pt-1"),
  buttonClass: cn("h-8 px-3 text-xs"),
  emptyClass: cn("text-sm text-muted-foreground"),
  iconClass: cn("h-4 w-4"),
  DialogTitleClass: cn("flex items-center gap-2"),
  trashIcon: cn("mr-2 h-4 w-4"),
}

// customer product reviews style
export const customerProductReviewsStyles = {
  container: cn("mt-8"),
  header: cn("text-xl font-semibold mb-4 text-foreground"),
  listContainer: cn("flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"),
  reviewCard: cn("border border-border rounded-lg p-4 bg-card shadow-sm"),
  reviewHeader: cn("flex items-center gap-3 mb-2"),
  avatar: cn("flex bg-primary/10 rounded-full h-10 w-10 items-center justify-center font-bold text-primary uppercase"),
  userInfo: cn("flex flex-col"),
  userName: cn("font-semibold text-sm capitalize text-foreground"),
  starsContainer: cn("flex gap-0.5 mt-1"),
  starIconActive: cn("w-3 h-3 fill-amber-400 text-amber-400"),
  starIconInactive: cn("w-3 h-3 text-muted-foreground/30"),
  commentText: cn("text-muted-foreground text-sm mt-2"),
}

export const customerProfileStyles = {
  dialogClass: cn(
    "max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-5xl"
  ),
  dialogTitle: cn("flex items-center gap-2"),
  shellClass: cn("space-y-6"),
  accountCardClass: cn("border border-border/60 bg-card/80 p-5"),
  accountRowClass: cn("flex flex-wrap items-center justify-between gap-4"),
  accountTextClass: cn("space-y-1"),
  accountTitleClass: cn("text-xl font-semibold text-foreground"),
  emailClass: cn("text-sm text-muted-foreground"),
  pointsClass: cn(
    "inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
  ),
  gridClass: cn("grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"),
  singleGridClass: cn("grid gap-6"),
  sectionClass: cn("space-y-4"),
  sectionHeaderClass: cn("flex items-center justify-between gap-3"),
  sectionTitleClass: cn("text-lg font-semibold text-foreground"),
  sectionTextClass: cn("text-sm text-muted-foreground"),
  listClass: cn("space-y-3"),
  itemClass: cn("space-y-3 border border-border/60 bg-card/80 p-4"),
  itemTopClass: cn("flex flex-wrap items-start justify-between gap-3"),
  itemTextClass: cn("space-y-1"),
  defaultClass: cn(
    "inline-flex rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
  ),
  nameClass: cn("font-medium text-foreground"),
  addressClass: cn("text-sm text-muted-foreground"),
  actionRowClass: cn("flex gap-2"),
  buttonClass: cn(""),
  emptyClass: cn("text-sm text-muted-foreground"),
  formWrapClass: cn("space-y-4 border border-border/60 bg-card/80 p-5"),
  twoColumnClass: cn("grid gap-4 sm:grid-cols-2"),
  threeColumnClass: cn("grid gap-4 sm:grid-cols-3"),
  fieldClass: cn("space-y-2"),
  inputClass: cn(""),
  checkboxRowClass: cn(
    "flex items-center gap-3 border border-border bg-secondary/40 px-3 py-3 text-sm text-foreground"
  ),
  checkboxClass: cn("h-4 w-4 accent-[var(--primary)]"),
  formActionsClass: cn("flex flex-wrap justify-end gap-3"),
}

// customer order dialog style
export const customerOrderDialogStyles = {
  dialogClass: cn(
    "max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-3xl"
  ),
  wrapClass: cn("space-y-4"),
  topRowClass: cn("flex items-center justify-between gap-3"),
  metaClass: cn("text-sm text-muted-foreground"),
  buttonClass: cn(""),
  emptyClass: cn("text-sm text-muted-foreground"),
  successBadgeClass: cn(
    "border-primary/30 bg-primary/10 text-primary hover:bg-primary/10"
  ),
  dangerBadgeClass: cn(
    "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/10"
  ),
  neutralBadgeClass: cn(
    "border-border bg-secondary/60 text-foreground hover:bg-secondary/60"
  ),
}

// customer cart and checkout drawer
export const customerCartAndCheckoutDrawerStyles = {
  contentClass: cn(
    "ml-auto flex h-[90dvh] max-h-[90dvh] w-full overflow-hidden border-l border-border bg-background p-0"
  ),
  shellClass: cn("grid h-full min-h-0 w-full lg:grid-cols-[1.7fr_1fr]"),
  leftPaneClass: cn("min-h-0 border-b border-border lg:border-r lg:border-b-0"),
  rightPaneClass: cn(
    "min-h-0 bg-gradient-to-b from-secondary/40 via-background to-background"
  ),
  rightInnerClass: cn("flex h-full min-h-0 flex-col p-5"),
  panelClass: cn(
    "flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
  ),
  panelHeaderClass: cn("border-b border-border px-5 py-4"),
  panelTitleClass: cn("flex items-center gap-2 text-left"),
  scrollClass: cn("min-h-0 flex-1"),
  bodyClass: cn("space-y-4 px-5 py-4"),
  sectionTitleClass: cn("text-sm font-medium text-foreground"),
  helperClass: cn("text-xs text-muted-foreground"),
  cardClass: cn("border border-border bg-background/50 p-3 text-sm"),
  rowClass: cn("flex items-center justify-between text-sm"),
  totalRowClass: cn(
    "flex items-center justify-between border-t border-border pt-4 text-base font-semibold"
  ),
  promoRowClass: cn("flex gap-2"),
  promoInputClass: cn(""),
  actionClass: cn("shrink-0 space-y-3 border-t border-border px-5 py-4"),
  primaryButtonClass: cn("h-11 w-full"),
  secondaryButtonClass: cn("h-11 w-full"),
  promoTitle: cn("flex items-center gap-2 text-sm font-medium text-foreground"),
  infoBoxClass: cn(
    "rounded-2xl border border-dashed border-border bg-background/70 p-4 text-sm text-muted-foreground"
  ),
}
