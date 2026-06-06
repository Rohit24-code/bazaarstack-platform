import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { tableStyles } from "./constants"
import { getCoverImage } from "@/features/admin/products/hooks/useProductForm"
import type { Product } from "@/features/admin/products/types"

type ProductTableRowProps = {
  product: Product
  onEdit: (product: Product) => void
}

export function ProductTableRow({ product, onEdit }: ProductTableRowProps) {
  const cover = getCoverImage(product.images)

  return (
    <TableRow>
      <TableCell>
        <div className={tableStyles.imageBoxClass}>
          {cover ? (
            <img
              src={cover.url}
              alt={product.title}
              className={tableStyles.imageClass}
            />
          ) : null}
        </div>
      </TableCell>

      <TableCell>
        <div className={tableStyles.titleWrapClass}>
          <span className={tableStyles.titleClass}>{product.title}</span>
        </div>
      </TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>{product.category?.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <Badge variant={product.status === "active" ? "default" : "secondary"}>
          {product.status}
        </Badge>
      </TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <div className={tableStyles.editCellWrapClass}>
          <Button size="icon" variant="ghost" onClick={() => onEdit(product)}>
            <Pencil className={tableStyles.editIconClass} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
