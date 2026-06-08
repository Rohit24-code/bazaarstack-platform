import { DataTable } from "@ecom/ui-core";

import type { AdminBanner } from "@/features/admin/Settings/types";

const tableWrapClass = "overflow-x-auto";
const previewWrapClass =
  "h-16 w-28 overflow-hidden border border-border bg-muted";
const imageClass = "h-full w-full object-cover";
const publicIdTextClass =
  "max-w-[360px] truncate text-sm text-muted-foreground";

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString();
}

function useSettingColums() {
  return [
    {
      header: "Preview",
      render: (row: any) => (
        <div className={previewWrapClass}>
          <img src={row.imageUrl} alt="banner" className={imageClass} />
        </div>
      ),
    },
    {
      header: "Public rowIndex",
      render: (item: any) => item.imagePublicId,
      cellClassName: publicIdTextClass,
    },
    {
      header: "Created At",
      render: (item: any) => formatDateTime(item.createdAt),
    },
  ];
}

function AdminSettingsBannersTable({ items }: { items: AdminBanner[] }) {
  const columns = useSettingColums();
  return (
    <DataTable
      wrapClassName={tableWrapClass}
      columns={columns}
      data={items}
      loading={false}
      loadingMessage="Loading Banners..."
      emptyMessage="No Banners found"
    />
  );
}

export default AdminSettingsBannersTable;
