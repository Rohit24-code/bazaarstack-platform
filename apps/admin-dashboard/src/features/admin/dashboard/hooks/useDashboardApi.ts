import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardLite } from "../api";

export const useDashboardApi = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: getAdminDashboardLite,
  });
};
