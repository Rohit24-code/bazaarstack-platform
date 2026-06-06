import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  createAdminCategory,
  updateAdminCategory,
} from "@/features/admin/products/api"
import type { Category } from "@/features/admin/products/types"
import { Pencil, Tag } from "lucide-react"
import { use, useState } from "react"
import { categoryStyles } from "./constants"
import { useProductStore } from "@/features/admin/products/store"

export function CategoryDialog() {
  const [name, setName] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)

  const {
    categoryDialogOpen: open,
    setCategoryDialogOpen: onOpenChange,
    refreshAll,
  } = useProductStore()

  const { categories } = useProductStore()

  async function handleSave() {
    if (!name.trim()) return

    try {
      setSaving(true)

      if (editingCategory) {
        await updateAdminCategory(editingCategory._id, { name: name.trim() })
      } else {
        await createAdminCategory({ name: name.trim() })
      }

      setName("")
      setEditingCategory(null)
      await refreshAll()
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(getCurrentCategory: Category) {
    setEditingCategory(getCurrentCategory)
    setName(getCurrentCategory.name)
  }

  function handleToggle(nextOpen: boolean) {
    if (!nextOpen) {
      setName("")
      setEditingCategory(null)
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogContent className={categoryStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>Manage Catgories</DialogTitle>
        </DialogHeader>

        <div className={categoryStyles.contentWrap}>
          <div className={categoryStyles.formRow}>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter category name you want to add!!!"
            />
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              {editingCategory ? "Update" : "Add"}
            </Button>
          </div>

          <Separator />

          <div className={categoryStyles.categoriesList}>
            {categories.map((cat) => (
              <div key={cat._id} className={categoryStyles.categoryRow}>
                <div className={categoryStyles.categoryInfo}>
                  <Tag className={categoryStyles.categoryIcon} />
                  <span className={categoryStyles.categoryName}>
                    {cat.name}
                  </span>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(cat)}
                >
                  <Pencil className={categoryStyles.editButtonClass} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
