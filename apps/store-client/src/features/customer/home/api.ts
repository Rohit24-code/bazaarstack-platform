import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/context/apiContext";
import type { CustomerHomeResponse } from "./types";

export const useCustomerHome = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["customer", "home"],
    queryFn: () => api.get<CustomerHomeResponse>("/customer/home"),
  });
};
