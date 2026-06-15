import { useMemo, useState } from "react";
import { useGetAdminBanners, useUploadAdminBanners } from "./useAdminApi";

export function useAdminSettings() {
  const [files, setFiles] = useState<File[]>([]);

  const { data: response, isLoading: loading } = useGetAdminBanners();
  const uploadBannersMutation = useUploadAdminBanners();

  const items = response?.items ?? [];
  const uploading = uploadBannersMutation.isPending;

  function handleUpload() {
    if (!files.length || uploading) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    uploadBannersMutation.mutate(formData, {
      onSuccess: () => {
        setFiles([]);
      },
    });
  }

  const fileCountLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;

    return `${files.length} files selected`;
  }, [files]);

  return {
    items,
    files,
    setFiles,
    fileCountLabel,
    loading,
    handleUpload,
    uploading,
  };
}
