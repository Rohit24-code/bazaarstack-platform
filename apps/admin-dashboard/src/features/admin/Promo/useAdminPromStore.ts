import { create } from "zustand"
import type { Promo } from "./types"
import {
  createAdminPromo,
  deleteAdminPromo,
  getAdminPromos,
  updateAdminPromo,
} from "./api"
import { useErrorStore } from "../../../components/useErrorStore"

type AdminPromoStore = {
  search: string
  promoDialogOpen: boolean
  promos: Promo[]
  loading: boolean
  editingPromo: Promo | null
  deletingPromoId: string
  saving: boolean
  setSearch: (searchTerm: string) => void
  onAddPromo: () => void
  onClosePromoDialog: () => void
  onEditPromoDialog: (promo: Promo) => void
  setPromos: (promo: Promo) => void
  setLoading: () => void
  setPromoDialogToggle: (value: boolean) => void
  setEditingPromo: () => void
  setDeletingPromoId: () => void
  setSaving: () => void
  removePromo: (id: string) => void
  savePromo: (data: any) => void
  refreshAll: () => void
}

export const useAdminPromoStore = create<AdminPromoStore>((set, get) => ({
  promos: [],
  search: "",
  loading: true,
  promoDialogOpen: false,
  editingPromo: null,
  deletingPromoId: "",
  saving: false,
  setSearch: (searchTerm: string) => {
    set({ search: searchTerm })
  },
  onAddPromo: () => {
    set({ promoDialogOpen: true, editingPromo: null })
  },
  onClosePromoDialog: () => {
    set({ promoDialogOpen: false, editingPromo: null })
  },
  onEditPromoDialog: (promo: Promo) => {
    set({ promoDialogOpen: true, editingPromo: promo })
  },
  setPromos: (promo) => set((prev) => ({ promos: [...prev.promos, promo] })),
  setLoading: () => {},
  setPromoDialogToggle: (value: boolean) => {
    set({ promoDialogOpen: value })
  },
  setEditingPromo: () => {},
  setDeletingPromoId: () => {},
  setSaving: () => {},
  removePromo: async (id: string) => {
    try {
      set({ loading: true })
      const response = await deleteAdminPromo(id)
      set({ promos: response.items ?? [] })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!"
      useErrorStore.getState().showError(errorMessage)
    } finally {
      set({ loading: false })
    }
  },
  savePromo: async (data) => {
    try {
      set({ loading: true })
      const editingPromo = get().editingPromo
      const response = editingPromo
        ? await updateAdminPromo(editingPromo._id, data)
        : await createAdminPromo(data)
      set({ promos: response.items ?? [] })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!"
      useErrorStore.getState().showError(errorMessage)
    } finally {
      set({ loading: false })
      get().onClosePromoDialog()
      useErrorStore.getState().showSuccess("Promo saved successfully")
    }
  },
  refreshAll: async () => {
    try {
      set({ loading: false })
      const response = await getAdminPromos()
      set({ promos: response.items ?? [] })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!"
      useErrorStore.getState().showError(errorMessage)
    } finally {
      set({ loading: false })
    }
  },
}))
