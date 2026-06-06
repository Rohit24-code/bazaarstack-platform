import { cn } from "@/lib/utils"

export const styles = {
  wrapperClass: cn(
    "flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
  ),
  searchWrapClass: cn("relative w-full md:w-80"),
  searchIconClass: cn(
    "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
  ),
  searchInputClass: cn("pl-9"),
  actionsWrapClass: cn("flex flex-col gap-3 sm:flex-row"),
  addIconClass: cn("mr-2 h-4 w-4"),
}

export const categoryStyles = {
  dialogContentClass: cn("sm:max-w-xl"),
  contentWrap: cn("space-y-4"),
  formRow: cn("flex gap-3"),
  categoriesList: cn("space-y-2"),
  categoryRow: cn(
    "flex items-center justify-between rounded-xl border border-border bg-card px-3 py-3"
  ),
  categoryInfo: cn("flex items-center gap-2"),
  categoryIcon: cn("h-4 w-4 text-muted-foreground"),
  categoryName: cn("text-sm font-medium text-foreground"),
  emptyStateClass: cn(
    "rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground"
  ),
  editButtonClass: cn("h-4 w-4"),
}

export const productDialogStyles = {
  dialogContentClass: cn("max-h-[92vh] overflow-y-auto sm:max-w-4xl"),
  contentWrapClass: cn("grid gap-6"),
  twoColumnGridClass: cn("grid gap-4 md:grid-cols-2"),
  threeColumnGridClass: cn("grid gap-4 md:grid-cols-3"),
  fieldGroupClass: cn("space-y-2"),
  sectionGridClass: cn("grid justify-center gap-6 align-middle md:grid-cols-3"),
  statusGroupClass: cn(
    "flex gap-6 rounded-xl border border-border bg-card px-4 py-3"
  ),
  statusItemClass: cn("flex items-center space-x-2"),
  actionsRowClass: cn("flex justify-end gap-3"),
}

// for colors style
export const colorStyles = {
  wrapperClass: cn("space-y-3"),
  headerClass: cn("space-y-1"),
  titleClass: cn("text-sm font-semibold text-foreground"),
  descriptionClass: cn("text-sm text-muted-foreground"),
  actionsRowClass: cn("flex flex-wrap items-center gap-3"),
  colorInputClass: cn("h-11 w-16 rounded-lg p-1"),
  colorsListClass: cn("flex flex-wrap gap-2"),
  colorChipClass: cn(
    "group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground transition hover:bg-muted"
  ),
  colorDotClass: cn("h-4 w-4 rounded-full border border-black/10"),
  removeIconClass: cn(
    "h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground"
  ),
}

// for size style
export const sizeStyles = {
  wrapperClass: cn("space-y-3"),
  headerClass: cn("space-y-1"),
  titleClass: cn("text-sm font-semibold text-foreground"),
  descriptionClass: cn("text-sm text-muted-foreground"),
  gridClass: cn("grid grid-cols-4 gap-2"),
  sizeButtonClass: cn("h-11"),
}

// for image styles
export const imageStyles = {
  wrapperClass: cn("space-y-4"),
  headerClass: cn("space-y-1"),
  titleClass: cn("text-sm font-semibold text-foreground"),
  descriptionClass: cn("text-sm text-muted-foreground"),
  uploadLabelClass: cn(
    "flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center transition hover:bg-muted"
  ),
  uploadIconClass: cn("mb-2 h-5 w-5 text-muted-foreground"),
  uploadTitleClass: cn("text-sm font-medium text-foreground"),
  uploadSubtitleClass: cn("mt-1 text-xs text-muted-foreground"),
  hiddenInputClass: cn("hidden"),
  sectionClass: cn("space-y-2"),
  sectionTitleClass: cn("text-sm font-medium text-foreground"),
  gridClass: cn("grid grid-cols-2 gap-3 md:grid-cols-4"),
  imageCardClass: cn("overflow-hidden rounded-xl border border-border bg-card"),
  imageClass: cn("h-28 w-full object-cover"),
  imageActionsClass: cn("flex items-center justify-between gap-2 p-2"),
  starIconClass: cn("mr-1 h-3.5 w-3.5"),
  removeIconClass: cn("h-4 w-4"),
  fileNameClass: cn("p-2 text-xs text-muted-foreground"),
}

// for table styles
export const tableStyles = {
  wrapperClass: cn("overflow-x-auto rounded-xl border border-border"),
  tableHeaderClass: cn("bg-muted/50"),
  imageHeadClass: cn("w-[90px]"),
  editHeadClass: cn("w-[80px] text-right"),
  stateCellClass: cn("h-28 text-center text-muted-foreground"),
  imageBoxClass: cn(
    "h-14 w-14 overflow-hidden rounded-lg border border-border bg-muted"
  ),
  imageClass: cn("h-full w-full object-cover"),
  titleWrapClass: cn("space-y-1"),
  titleClass: cn("font-medium text-foreground"),
  descriptionClass: cn("line-clamp-1 text-xs text-muted-foreground"),
  editCellWrapClass: cn("flex justify-end"),
  editIconClass: cn("h-4 w-4"),
}

export const TABLE_HEADERS = [
  { label: "Image", className: tableStyles.imageHeadClass },
  { label: "Title" },
  { label: "Brand" },
  { label: "Category" },
  { label: "Price" },
  { label: "Status" },
  { label: "Stock" },
  { label: "Edit", className: tableStyles.editHeadClass },
]
