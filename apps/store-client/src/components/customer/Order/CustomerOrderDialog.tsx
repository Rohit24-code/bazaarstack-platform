import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, type ColumnDef } from "@/components/ui/DataTable"
import { useCustomerOrdersStore } from "@/features/customer/orders/store"
import type {
  CustomerOrder,
  CustomerOrderStatus,
  CustomerPaymentStatus,
} from "@/features/customer/orders/types"
import { formatPrice } from "@/lib/utils"
import { ShoppingBasket } from "lucide-react"
import { customerOrderDialogStyles } from "../constants"

function CustomerPaymentStatusBadge(props: { status: CustomerPaymentStatus }) {
  const { status } = props
  const className =
    status === "paid"
      ? customerOrderDialogStyles.successBadgeClass
      : status === "failed"
        ? customerOrderDialogStyles.dangerBadgeClass
        : customerOrderDialogStyles.neutralBadgeClass

  return <Badge className={className}>{status}</Badge>
}

function CustomerOrderStatusBadge(props: { status: CustomerOrderStatus }) {
  const { status } = props
  const className =
    status === "delivered"
      ? customerOrderDialogStyles.successBadgeClass
      : status === "returned"
        ? customerOrderDialogStyles.dangerBadgeClass
        : customerOrderDialogStyles.neutralBadgeClass

  return <Badge className={className}>{status}</Badge>
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString() : "-"
}

function canReturnOrder(order: CustomerOrder) {
  if (order.orderStatus !== "delivered" || !order.deliveredAt) return false

  const diff = Date.now() - new Date(order.deliveredAt).getTime()

  return diff <= 7 * 24 * 60 * 60 * 1000
}

function CustomerOrdersDialog() {
  const { isOpen, closeOrders, loading, items, returnOrder, loadOrders } =
    useCustomerOrdersStore((state) => state)

  const columns: ColumnDef<CustomerOrder>[] = [
    {
      header: "Order",
      accessorKey: "_id",
      cellClassName: "font-medium",
    },
    {
      header: "Items",
      accessorKey: "totalItems",
    },
    {
      header: "Amount",
      render: (row) => formatPrice(row.totalAmount),
    },
    {
      header: "payment",
      render: (row) => (
        <CustomerPaymentStatusBadge status={row.paymentStatus} />
      ),
    },
    {
      header: "Status",
      render: (row) => <CustomerOrderStatusBadge status={row.orderStatus} />,
    },
    {
      header: "Paid at",
      render: (row) => formatDate(row.paidAt || row.createdAt),
    },
    {
      header: "Action",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) =>
        canReturnOrder(row) ? (
          <Button size="sm" className="" onClick={() => returnOrder(row._id)}>
            Return
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">
            {row.orderStatus === "returned" ? "Returned" : ""}
          </span>
        ),
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeOrders()}>
      <DialogContent className={customerOrderDialogStyles.dialogClass}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBasket className="h-4 w-4" />
            My Orders
          </DialogTitle>
        </DialogHeader>
        <div className={customerOrderDialogStyles.wrapClass}>
          <div className={customerOrderDialogStyles.topRowClass}>
            <p className={customerOrderDialogStyles.metaClass}>
              Track your recent orders
            </p>
            <Button
              type="button"
              className={customerOrderDialogStyles.buttonClass}
              onClick={() => void loadOrders()}
            >
              Refresh
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={items}
            loading={loading}
            emptyMessage="No orders found"
            wrapClassName="overflow-x-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerOrdersDialog
