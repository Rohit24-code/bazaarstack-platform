import Loader from "@/components/common/Loader"
import { Badge } from "@ecom/ui-core"
import { Card, CardContent, CardHeader, CardTitle } from "@ecom/ui-core"
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@ecom/ui-core"
import { DataTable, type ColumnDef } from "@ecom/ui-core"
import { useAdminOrdersStore } from "@/features/admin/orders/store"
import type {
  AdminOrder,
  AdminOrderStatus,
  AdminPaymentStatus,
} from "@/features/admin/orders/types"
import { formatPrice } from "@/lib/utils"
import { useEffect } from "react"
import { orderStyles } from "./constants"

const orderStatusOptions: AdminOrderStatus[] = [
  "placed",
  "shipped",
  "delivered",
]

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString() : "-"
}

function AdminPaymentStatusBadge(props: { status: AdminPaymentStatus }) {
  const { status } = props
  const className =
    status === "paid"
      ? orderStyles.successBadgeClass
      : status === "failed"
        ? orderStyles.dangerBadgeClass
        : orderStyles.neutralBadgeClass

  return <Badge className={className}>{status}</Badge>
}

function canUpdateStatus(order: AdminOrder) {
  if (order.paymentStatus !== "paid") return false
  if (order.orderStatus === "delivered") return false
  if (order.orderStatus === "returned") return false

  return true
}

function getNextStatusValue(order: AdminOrder) {
  if (order.orderStatus === "delivered" || order.orderStatus === "returned")
    return ""

  return order.orderStatus
}

function AdminOrders() {
  const { loading, orders, updatingOrderId, fetchOrders, changeStatus } =
    useAdminOrdersStore((state) => state)

  useEffect(() => {
    void fetchOrders()
  }, [fetchOrders])

  if (loading) return <Loader />

  const columns: ColumnDef<AdminOrder>[] = [
    {
      header: "Order",
      accessorKey: "_id",
      cellClassName: "font-medium",
    },
    {
      header: "Customer",
      accessorKey: "customerName",
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
      header: "Payment",
      render: (row) => <AdminPaymentStatusBadge status={row.paymentStatus} />,
    },
    {
      header: "Paid at",
      render: (row) => formatDate(row.paidAt || row.createdAt),
    },
    {
      header: "Update",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => {
        const canUpdate = canUpdateStatus(row)
        return canUpdate ? (
          <Select
            value={getNextStatusValue(row)}
            onValueChange={(value) =>
              void changeStatus(row._id, value as AdminOrderStatus)
            }
            disabled={updatingOrderId === row._id}
          >
            <SelectTrigger className={orderStyles.selectTriggerClass}>
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              {orderStatusOptions.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  disabled={status === "placed" || status === row.orderStatus}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <span className={orderStyles.subTextClass}>
            {row.paymentStatus !== "paid"
              ? "Payment not paid"
              : row.orderStatus === "returned"
                ? "Returned"
                : "Completed"}
          </span>
        )
      },
    },
  ]

  return (
    <div className={orderStyles.pageWrapClass}>
      <div className={orderStyles.contentWrapClass}>
        <Card className={orderStyles.cardClass}>
          <CardHeader className={orderStyles.wrapClass}>
            <CardTitle className={orderStyles.titleClass}>Orders</CardTitle>
          </CardHeader>

          <CardContent>
            {!orders.length ? (
              <div className={orderStyles.emptyClass}>No Orders found</div>
            ) : (
              <DataTable
                columns={columns}
                data={orders}
                wrapClassName={orderStyles.tableWrapClass}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminOrders
