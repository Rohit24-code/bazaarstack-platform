import { Link } from "react-router-dom"
import type { NavItem } from "./types"
import { styles } from "./constants"

export function NavTextLink({ label, href, icon: Icon }: NavItem) {
  return (
    <Link to={href} className={styles.textLink}>
      <Icon className={"h-4.5 w-4.5"} />
      <span>{label}</span>
    </Link>
  )
}
