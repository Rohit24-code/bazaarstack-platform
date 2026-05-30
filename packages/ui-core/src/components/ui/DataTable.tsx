import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

export type ColumnDef<TData> = {
  header: string | React.ReactNode
  accessorKey?: keyof TData
  render?: (row: TData) => React.ReactNode
  headerClassName?: string
  cellClassName?: string
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  loading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  wrapClassName?: string
}

export function DataTable<TData>({
  columns,
  data,
  loading,
  loadingMessage = "Loading...",
  emptyMessage = "No results found",
  wrapClassName,
}: DataTableProps<TData>) {
  return (
    <div className={wrapClassName}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={col.headerClassName}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-10 text-center text-muted-foreground"
              >
                {loadingMessage}
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-10 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className={col.cellClassName}>
                    {col.render
                      ? col.render(row)
                      : col.accessorKey
                        ? String(row[col.accessorKey])
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
