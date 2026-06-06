import { Heart, LogIn, LogOut, ShoppingBag, User } from "lucide-react"

import { cn } from "@/lib/utils"
import type { NavItem } from "@/components/common/types"

export const navPages: Record<string, NavItem> = {
  collections: {
    label: "Collections",
    href: "/collections",
    icon: ShoppingBag,
  },
  wishlist: {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  login: {
    label: "Login",
    href: "/sign-up",
    icon: LogIn,
  },
}

export const mobileNavLoginPages: NavItem[] = [
  { label: "Account", href: "/account", icon: User },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Sign Out", href: "/logout", icon: LogOut },
]

export const mobileNavLogOutPages: NavItem[] = [
  {
    label: "Login",
    href: "/sign-in",
    icon: LogIn,
  },
]

export const styles = {
  shell: cn(
    "mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
  ),
  desktopBrandWrap: cn("flex items-center justify-center gap-3"),
  headerClass: cn(
    "sticky top-0 z-50 border-b border-border/70 bg-secondary/60 backdrop-blur-xl"
  ),
  textLink: cn(
    "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[15px] font-medium text-foreground/90 transition hover:bg-white/5 hover:text-foreground"
  ),
  iconLink: cn(
    "relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground/90 transition hover:bg-white/5 hover:text-foreground"
  ),
  brandWrap: cn("flex shrink-0 items-center gap-3"),
  brandTitle: cn(
    "text-[25px] font-semibold tracking-[-0.02em] text-foreground"
  ),
  desktopCollectionsWrap: cn("ml-6 hidden lg:block"),
  desktopNav: cn("ml-auto hidden items-center gap-1 lg:flex"),
  dropdownButton: cn(
    "h-10 rounded-xl px-3 text-[15px] font-medium text-foreground/90 hover:bg-white/5 hover:text-foreground"
  ),
  dropdownContent: cn(
    "mt-3 rounded-2xl border-border bg-popover/95 p-2 backdrop-blur"
  ),
  accountDropdownContent: cn(
    "mt-3 w-56 rounded-2xl border-border bg-popover/95 p-2 backdrop-blur"
  ),
  dropdownItemLink: cn(
    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5"
  ),
  cartBadge: cn(
    "absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] leading-5 font-semibold text-black"
  ),
  wishlistBadge: cn(
    "absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] leading-5 font-semibold text-black"
  ),
}

export const mobileNavStyles = {
  iconLink: cn(
    "relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground/90 transition hover:bg-white/5 hover:text-foreground"
  ),
  mobileWrap: cn("ml-auto flex items-center gap-1 lg:hidden"),
  menuButton: cn(
    "h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
  ),
  sheetContent: cn(
    "w-[380px] max-w-[92vw] border-r border-border bg-background p-0 sm:w-[460px]"
  ),
  brandWrap: cn("flex items-center gap-3"),
  brandTitle: cn(
    "text-[25px] font-semibold tracking-[-0.02em] text-foreground"
  ),
  brandBlock: cn("px-5 py-6 sm:px-6"),
  drawerSection: cn("space-y-3 px-5 py-5 sm:px-6"),
  drawerTitle: cn("text-sm font-semibold tracking-wide text-muted-foreground"),
  drawerItemsWrap: cn("space-y-1"),
  drawerItemLink: cn(
    "flex items-center gap-3 rounded-xl px-2 py-3 text-[18px] font-medium text-foreground transition hover:bg-white/5"
  ),
  cartBadge: cn(
    "absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] leading-5 font-semibold text-black"
  ),
}
