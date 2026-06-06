import { Link } from "react-router-dom"
import { mobileNavStyles } from "./constants"
import type { NavItem } from "@/components/common/types"

type DrawerSectionProps = {
  title: string
  items: NavItem[]
}

const DrawerSection = ({ title, items }: DrawerSectionProps) => {
  return (
    <section className={mobileNavStyles.drawerSection}>
      <p className={mobileNavStyles.drawerTitle}>{title}</p>
      <div className={mobileNavStyles.drawerItemsWrap}>
        {items?.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.href}
              className={mobileNavStyles.drawerItemLink}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default DrawerSection
