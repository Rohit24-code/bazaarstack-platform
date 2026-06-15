import { tableStyles } from "./constants";
import { getCoverImage } from "@/features/admin/products/hooks/useProductForm";

import { DataTable, type ColumnDef } from "@ecom/ui-core";
import type { Product } from "@/features/admin/products/types";
import { Badge } from "@ecom/ui-core";
import { Button } from "@ecom/ui-core";
import { Pencil } from "lucide-react";
import { useProductStore } from "@/features/admin/products/store";
import { useGetAdminProducts } from "@/features/admin/products/hooks/useProductApi";

const useProductColumns = (): ColumnDef<Product>[] => {
  const { openEditDialog: onEdit } = useProductStore();

  return [
    {
      header: "Image",
      render: (product) => {
        const cover = getCoverImage(product.images);
        return (
          <div className={tableStyles.imageBoxClass}>
            {cover ? (
              <img
                src={cover.url}
                alt={product.title}
                className={tableStyles.imageClass}
              />
            ) : null}
          </div>
        );
      },
    },
    {
      header: "Title",
      render: (product) => (
        <div className={tableStyles.titleWrapClass}>
          <span className={tableStyles.titleClass}>{product.title}</span>
        </div>
      ),
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    {
      header: "Category",
      render: (product) => product.category?.name,
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Status",
      render: (product) => (
        <Badge variant={product.status === "active" ? "default" : "secondary"}>
          {product.status}
        </Badge>
      ),
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Edit",
      render: (product) => (
        <div className={tableStyles.editCellWrapClass}>
          <Button size="icon" variant="ghost" onClick={() => onEdit(product)}>
            <Pencil className={tableStyles.editIconClass} />
          </Button>
        </div>
      ),
    },
  ];
};

export function ProductTable() {
  const { page, limit, search, setPage } = useProductStore();

  const offset = (page - 1) * limit;

  const { data: response, isLoading: loading } = useGetAdminProducts(
    search,
    limit,
    offset,
  );

  const products = response?.data ?? [];
  const totalCount = response?.totalCount ?? 0;

  const columns = useProductColumns();
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-4">
      <DataTable
        wrapClassName={tableStyles.wrapperClass}
        columns={columns}
        data={products}
        loading={loading}
        loadingMessage="Loading Products..."
        emptyMessage="No products found!!!"
      />
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalCount)} of {totalCount} products
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1 || loading}
            >
              Previous
            </Button>
            <div className="text-sm font-medium mx-2">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
