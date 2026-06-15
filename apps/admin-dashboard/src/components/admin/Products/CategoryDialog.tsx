import { Button } from "@ecom/ui-core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { Separator } from "@ecom/ui-core";
import type { Category } from "@/features/admin/products/types";
import { Pencil, Tag, Loader2 } from "lucide-react";
import { useState } from "react";
import { categoryStyles } from "./constants";
import { useProductStore } from "@/features/admin/products/store";
import {
  useCreateAdminCategory,
  useGetAdminCategories,
  useUpdateAdminCategory,
} from "@/features/admin/products/hooks/useProductApi";

export function CategoryDialog() {
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { categoryDialogOpen: open, setCategoryDialogOpen: onOpenChange } =
    useProductStore();

  const { data: categories = [], isLoading } = useGetAdminCategories();

  const createCategoryMutation = useCreateAdminCategory();
  const updateCategoryMutation = useUpdateAdminCategory();

  const isSaving =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  function handleSave() {
    if (!name.trim() || isSaving) return;

    const trimmedName = name.trim();

    if (editingCategory) {
      updateCategoryMutation.mutate(
        {
          categoryId: editingCategory._id,
          body: { name: trimmedName },
        },
        {
          onSuccess: () => {
            setName("");
            setEditingCategory(null);
          },
        },
      );
    } else {
      createCategoryMutation.mutate(
        { name: trimmedName },
        {
          onSuccess: () => {
            setName("");
          },
        },
      );
    }
  }

  function handleEdit(getCurrentCategory: Category) {
    setEditingCategory(getCurrentCategory);
    setName(getCurrentCategory.name);
  }

  function handleToggle(nextOpen: boolean) {
    if (!nextOpen) {
      setName("");
      setEditingCategory(null);
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogContent className={categoryStyles.dialogContentClass}>
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>

        <div className={categoryStyles.contentWrap}>
          <div className={categoryStyles.formRow}>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter category name you want to add!!!"
              disabled={isSaving}
            />
            <Button onClick={handleSave} disabled={isSaving || !name.trim()}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCategory ? "Update" : "Add"}
            </Button>
          </div>

          <Separator />

          <div className={categoryStyles.categoriesList}>
            {isLoading ? (
              <div className="flex items-center justify-center py-6 gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Fetching operational categories...</span>
              </div>
            ) : categories?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No categories active.
              </p>
            ) : (
              categories?.map((cat) => (
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
                    disabled={isSaving}
                  >
                    <Pencil className={categoryStyles.editButtonClass} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
