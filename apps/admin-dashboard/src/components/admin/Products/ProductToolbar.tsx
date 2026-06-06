import { styles } from "./constants"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProductStore } from "@/features/admin/products/store"

export function ProductToolbar() {
  const {
    search,
    setCategoryDialogOpen: onOpenChange,
    openCreateDialog: onAddProduct,
    setSearch,
  } = useProductStore()

  return (
    <div className={styles.wrapperClass}>
      <div className={styles.searchWrapClass}>
        <Search className={styles.searchIconClass} />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className={styles.searchInputClass}
        />
      </div>

      <div className={styles.actionsWrapClass}>
        <Button onClick={() => onOpenChange(true)} variant="outline">
          Manage Category
        </Button>
        <Button onClick={onAddProduct}>
          <Plus className={styles.addIconClass} />
          Add Product
        </Button>
      </div>
    </div>
  )
}
