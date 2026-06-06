import { styles } from "./constant"
import { SidebarNav } from "./SideBarNav"

function AdminSidebar() {
  return (
    <aside className={styles.sidebarRoot}>
      <div className={styles.brandRow}>
        <div className="flex items-center gap-3">
          <h1>
            <span className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              Bazaar
            </span>
            Stack
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  )
}

export default AdminSidebar
