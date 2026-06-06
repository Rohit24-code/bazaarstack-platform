import type { NavItem } from "@/components/common/types"
import {
  BadgePercent,
  BarChart3,
  LayoutDashboard,
  Package,
  Settings2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const items: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { label: "Orders", href: "/admin/orders", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
]

const navItemBase =
  "flex h-11 items-center gap-3 px-4 text-[15px] font-medium transition-colors"

export const styles = {
  sidebarRoot: cn(
    "hidden w-[300px] shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col"
  ),
  brandRow: cn(
    "flex h-[72px] items-center border-b border-sidebar-border px-5"
  ),
  navWrap: cn("space-y-2"),
  navItemBase,
  navItemDesktop: cn(`${navItemBase} `),
  navItemMobile: navItemBase,
  activeItem: cn("bg-sidebar-primary text-sidebar-primary-foreground"),
  idleItem: cn(
    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  ),
}
