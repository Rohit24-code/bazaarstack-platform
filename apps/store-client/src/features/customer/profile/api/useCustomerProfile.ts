import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomerAddresses,
  createCustomerAddresses,
  updateCustomerAddresses,
  deleteCustomerAddress,
} from "../api";
import type { CustomerAddressFormValues } from "../types";
import { toast } from "sonner";

export const customerProfileKeys = {
  all: ["customer-addresses"] as const,
  lists: () => [...customerProfileKeys.all, "list"] as const,
};

export const useCustomerAddresses = () => {
  return useQuery({
    queryKey: customerProfileKeys.lists(),
    queryFn: getCustomerAddresses,
  });
};

export const useCreateCustomerAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CustomerAddressFormValues) =>
      createCustomerAddresses(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerProfileKeys.lists() });
      toast.success("New address saved successfully!");
    },
  });
};

export const useUpdateCustomerAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      addressId,
      body,
    }: {
      addressId: string;
      body: CustomerAddressFormValues;
    }) => updateCustomerAddresses(addressId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerProfileKeys.lists() });
      toast.success("Address updated successfully!");
    },
  });
};

export const useDeleteCustomerAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => deleteCustomerAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerProfileKeys.lists() });
      toast.success("Address deleted successfully!");
    },
  });
};
