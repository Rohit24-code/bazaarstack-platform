import { promoTableStyles } from "@/pages/admin/constants";
import React, { useState } from "react";
import { formatDateTime } from "@/lib/functions";
import { Button } from "@ecom/ui-core";
import { Pencil, Trash2 } from "lucide-react";

import type { Promo } from "@/features/admin/Promo/types";
import { DataTable, type ColumnDef } from "@ecom/ui-core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ecom/ui-core";
import { useAdminPromoUiStore } from "@/features/admin/Promo/useAdminPromStore";
import {
  useDeleteAdminPromo,
  useGetAdminPromos,
} from "@/features/admin/Promo/hooks/useAdminPromo";

const usePromoColumns = (
  onDeleteClick: (id: string) => void,
  isDeleting: boolean,
): ColumnDef<Promo>[] => {
  const { onEditPromoDialog } = useAdminPromoUiStore();

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
            disabled={isDeleting}
            onClick={() => onDeleteClick(promo._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
};

const PromoTable = () => {
  const { data: response, isLoading: loading } = useGetAdminPromos();
  const deletePromoMutation = useDeleteAdminPromo();

  const [promoToDelete, setPromoToDelete] = useState<string | null>(null);

  const promos = response?.items ?? [];
  const isDeleting = deletePromoMutation.isPending;

  const columns = usePromoColumns(setPromoToDelete, isDeleting);

  const handleConfirmDelete = () => {
    if (promoToDelete) {
      deletePromoMutation.mutate(promoToDelete, {
        onSuccess: () => {
          setPromoToDelete(null);
        },
      });
    }
  };

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
        onOpenChange={(open) => !open && !isDeleting && setPromoToDelete(null)}
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
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromoTable;
