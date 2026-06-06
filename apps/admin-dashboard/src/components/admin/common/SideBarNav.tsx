import { NavLink } from "react-router-dom"
import { items, styles } from "./constant"

export function SidebarNav() {
  return (
    <nav className={styles.navWrap}>
      {items?.map((item) => {
        const Icon = item.icon
        const link = (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              `${styles.navItemDesktop} ${isActive ? styles.activeItem : styles.idleItem}`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        )

        return link
      })}
    </nav>
  )
}
