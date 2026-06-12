import { create } from "zustand";
import type { CustomerAddress, CustomerAddressFormValues } from "./types";

const emptyForm: CustomerAddressFormValues = {
  fullName: "",
  address: "",
  state: "",
  postalCode: "",
  isDefault: false,
};

type FormMode = "none" | "add" | "edit";

type CustomerProfileStore = {
  isOpen: boolean;
  mode: FormMode;
  editingAddressId: string;
  form: CustomerAddressFormValues;
  openProfile: () => void;
  closeProfile: () => void;
  startAdd: () => void;
  startEdit: (address: CustomerAddress) => void;
  updateForm: <K extends keyof CustomerAddressFormValues>(
    key: K,
    value: CustomerAddressFormValues[K],
  ) => void;
  cancelForm: () => void;
  clear: () => void;
  saveForm: (createCustomer: any, updateCustomerAddress: any) => void;
  removeAddress: (removeAddress: any, addressId: string) => void;
};

export const useCustomerProfileStore = create<CustomerProfileStore>(
  (set, get, createCustomer) => ({
    isOpen: false,
    mode: "none",
    editingAddressId: "",
    form: emptyForm,
    openProfile: () => {
      set({ isOpen: true });
    },
    closeProfile: () => {
      set({
        isOpen: false,
        mode: "none",
        editingAddressId: "",
        form: emptyForm,
      });
    },
    startAdd: () => {
      set({
        mode: "add",
        editingAddressId: "",
        form: emptyForm,
      });
    },
    startEdit: (currentAddress) => {
      set({
        mode: "edit",
        editingAddressId: currentAddress?._id,
        form: {
          fullName: currentAddress.fullName,
          address: currentAddress.address,
          state: currentAddress.state,
          postalCode: currentAddress.postalCode,
          isDefault: currentAddress.isDefault,
        },
      });
    },
    updateForm: (key, value) => {
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      }));
    },
    cancelForm: () => {
      set({
        mode: "none",
        editingAddressId: "",
        form: emptyForm,
      });
    },
    saveForm: async (createCustomer: any, updateCustomerAddress: any) => {
      const { mode, editingAddressId, form } = get();

      const payload = {
        fullName: form.fullName.trim(),
        address: form.address.trim(),
        state: form.state.trim(),
        postalCode: form.postalCode.trim(),
        isDefault: form.isDefault,
      };
      mode === "edit"
        ? updateCustomerAddress({ addressId: editingAddressId, body: payload })
        : createCustomer(payload);
    },
    removeAddress: async (removeAddressfn, addressId) => {
      try {
        const response = await removeAddressfn(addressId);

        set((state) => ({
          items: response?.items ?? [],
          mode: state.editingAddressId === addressId ? "none" : state.mode,
          editingAddressId:
            state.editingAddressId === addressId ? "" : state.editingAddressId,
          form: state.editingAddressId === addressId ? emptyForm : state.form,
        }));

        // toast.success("Address deleted successfully");
      } catch {
        // toast.error("Failed to delete address!");
      }
    },
    clear: () => {
      set({
        isOpen: false,
        mode: "none",
        form: emptyForm,
        editingAddressId: "",
      });
    },
  }),
);
