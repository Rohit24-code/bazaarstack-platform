import { useQuery } from "@tanstack/react-query";
import { customerProductApi } from "../lib/api";
import { GetCustomerProductsParams } from "@ecom/api-client";

export function useCustomerProducts(params?: GetCustomerProductsParams) {
  return useQuery({
    queryKey: ["customer-products", params],
    queryFn: () => customerProductApi.getCustomerProducts(params),
  });
}
