import { promoTableStyles } from "@/pages/admin/constants"
import React, { useState } from "react"
import { formatDateTime } from "@/lib/functions"
import { Button } from "../ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useAdminPromoStore } from "@/features/admin/Promo/useAdminPromStore"
import type { Promo } from "@/features/admin/Promo/types"
import { DataTable, type ColumnDef } from "../ui/DataTable"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

const usePromoColumns = (
  onDeleteClick: (id: string) => void
): ColumnDef<Promo>[] => {
  const { deletingPromoId, onEditPromoDialog } = useAdminPromoStore()

  return [
    {
      header: "Code",
      accessorKey: "code",
      cellClassName: promoTableStyles.codeCellClass,
    },
    {
      header: "Discount",
      render: (promo) => `${promo.percentage}%`,
    },
    {
      header: "Count",
      accessorKey: "count",
    },
    {
      header: "Min Order",
      accessorKey: "minimumOrderValue",
    },
    {
      header: "Valid From",
      render: (promo) => formatDateTime(promo.startsAt),
    },
    {
      header: "Valid Till",
      render: (promo) => formatDateTime(promo.endsAt),
    },
    {
      header: "Edit",
      headerClassName: "w-[80px] text-right",
      render: (promo) => (
        <div className={promoTableStyles.rightWrapClass}>
          <Button
            size={"icon"}
            variant={"ghost"}
            className={promoTableStyles.iconButtonClass}
            onClick={() => onEditPromoDialog(promo)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      header: "Delete",
      headerClassName: "w-[80px] text-right",
      render: (promo) => (
        <div className={promoTableStyles.rightWrapClass}>
          <Button
            size={"icon"}
            variant={"ghost"}
            className={promoTableStyles.deleteButtonClass}
            disabled={deletingPromoId === promo._id}
            onClick={() => onDeleteClick(promo._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}

const PromoTable = () => {
  const { promos, loading, removePromo, deletingPromoId } = useAdminPromoStore()
  const [promoToDelete, setPromoToDelete] = useState<string | null>(null)

  // Pass the state setter into the columns so the Trash button can trigger the modal
  const columns = usePromoColumns(setPromoToDelete)

  const handleConfirmDelete = () => {
    if (promoToDelete) {
      removePromo(promoToDelete)
      setPromoToDelete(null) // Close the modal immediately after confirming
    }
  }

  return (
    <>
      <DataTable
        wrapClassName={promoTableStyles.wrapClass}
        columns={columns}
        data={promos}
        loading={loading}
        loadingMessage="Loading Promos..."
        emptyMessage="No Promos found"
      />

      <Dialog
        open={!!promoToDelete}
        onOpenChange={(open) => !open && setPromoToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              promo code.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPromoToDelete(null)}
              disabled={!!deletingPromoId}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!!deletingPromoId}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PromoTable
