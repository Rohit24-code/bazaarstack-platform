import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAdminBanners, uploadAdminBanners } from "../api";
import type { AdminBannersResponse } from "../types";

export const useGetAdminBanners = () => {
  return useQuery<AdminBannersResponse, Error>({
    queryKey: ["admin", "settings", "banners"],
    queryFn: getAdminBanners,
  });
};

export const useUploadAdminBanners = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadAdminBanners(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "settings", "banners"],
      });
      toast.success("Banners uploaded and updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to upload banners.");
      console.error(error);
    },
  });
};
