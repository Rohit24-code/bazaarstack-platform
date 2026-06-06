import { cn } from "@/lib/utils"

export const styles = {
  pageWrap: cn("space-y-6 p-6"),
  cardClass: cn("border-border bg-card shadow-sm"),
  cardHeaderClass: cn("space-y-4"),
  cardTitleClass: cn("text-xl"),
  cardContentClass: cn("space-y-4"),
}

export const promoStyles = {
  pageWrapClass: cn("space-y-6 p-6"),
  cardClass: cn("border-border bg-card shadow-sm"),
  cardHeaderClass: cn("space-y-4"),
  cardTitleClass: cn("text-xl"),
  cardContentClass: cn("space-y-4"),
  errorClass: cn(
    " border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
  ),
}

// promo toolbar
export const promoToolbarStyles = {
  wrapClass: cn(
    "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  ),
  searchWrapClass: cn("relative w-full max-w-sm"),
  searchIconClass: cn(
    "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
  ),
  searchInputClass: cn("rounded pl-9"),
  addButtonClass: cn("rounded"),
  addButtonIconClass: cn("mr-2 h-4 w-4"),
}

// promo table
export const promoTableStyles = {
  wrapClass: cn("overflow-x-auto rounded-xl border border-border"),
  tableHeaderClass: cn("bg-muted/50"),
  loadingCellClass: cn("h-28 text-center text-muted-foreground"),
  codeCellClass: cn("font-medium text-foreground"),
  rightWrapClass: cn("flex justify-end"),
  iconButtonClass: cn("rounded"),
  deleteButtonClass: cn("rounded text-destructive hover:text-destructive"),
}

// promo dialog
export const promoDialogStyles = {
  dialogContentClass: cn(
    "max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-2xl"
  ),
  layoutClass: cn("grid gap-6"),
  firstRowClass: cn("grid gap-4 md:grid-cols-2"),
  secondRowClass: cn("grid gap-4 md:grid-cols-2"),
  thirdRowClass: cn("grid gap-4 md:grid-cols-2"),
  fieldWrapClass: cn("space-y-2"),
  inputClass: cn("rounded"),
  errorTextClass: cn("text-sm text-destructive"),
  footerClass: cn("flex justify-end gap-3"),
  outlineButtonClass: cn("rounded"),
  primaryButtonClass: cn("rounded"),
}

// setting
export const settingStyles = {
  pageWrapClass: cn("min-h-screen bg-background"),
  contentContainerClass: cn("mx-auto max-w-7xl px-4 py-8"),
  uploadPanelClass: cn("grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]"),
  cardClass: cn("border-border/60 bg-card/80"),
  cardTitleClass: cn("text-2xl font-semibold text-foreground"),
  cardContentClass: cn("space-y-6"),
  uploadBoxClass: cn(
    "flex min-h-[220px] flex-col items-center justify-center gap-4 border border-dashed border-border bg-background/40 p-6 text-center"
  ),
  uploadIconWrapClass: cn(
    "flex h-14 w-14 items-center justify-center border border-border bg-secondary/50"
  ),
  uploadIconClass: cn("h-6 w-6 text-primary"),
  uploadTextWrapClass: cn("space-y-2"),
  uploadHeadingClass: cn("text-base font-medium text-foreground"),
  uploadSubtextClass: cn("text-sm text-muted-foreground"),
  fileInputClass: cn(""),
  fileCountClass: cn("text-xs text-muted-foreground"),
  fullButtonClass: cn("w-full "),
  buttonClass: cn(""),
  errorBoxClass: cn(
    "border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"
  ),
  emptyStateClass: cn(
    "border border-border bg-background/40 p-6 text-sm text-muted-foreground"
  ),
  tableHeaderClass: cn("flex flex-row items-center justify-between gap-3"),
}

// orders
export const orderStyles = {
  pageWrapClass: cn("min-h-screen bg-background"),
  contentWrapClass: cn("mx-auto max-w-7xl px-4 py-8"),
  cardClass: cn("border-border bg-card"),
  wrapClass: cn("space-y-4"),
  topRowClass: cn(
    "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  ),
  titleClass: cn("flex items-center gap-2 text-2xl font-semibold"),
  metaClass: cn("text-sm text-muted-foreground"),
  buttonClass: cn(""),
  emptyClass: cn(
    "rounded-lg border border-border bg-background p-6 text-sm text-muted-foreground"
  ),
  tableWrapClass: cn("overflow-x-auto"),
  cellStackClass: cn("space-y-1"),
  primaryTextClass: cn("font-medium text-foreground"),
  subTextClass: cn("text-xs text-muted-foreground"),
  selectTriggerClass: cn("h-9 w-[160px] "),
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
