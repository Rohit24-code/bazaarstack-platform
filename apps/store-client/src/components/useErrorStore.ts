import { create } from "zustand"

type ErrorStore = {
  isOpen: boolean
  errorMessage: string
  isSuccess: boolean
  showError: (message: string) => void
  showSuccess: (message: string) => void
  closeError: () => void
}

export const useErrorStore = create<ErrorStore>((set) => ({
  isOpen: false,
  errorMessage: "",
  isSuccess: false,
  showError: (message: string) =>
    set({ isOpen: true, errorMessage: message, isSuccess: false }),
  showSuccess: (message: string) =>
    set({ isOpen: true, errorMessage: message, isSuccess: true }),
  closeError: () => set({ isOpen: false, errorMessage: "", isSuccess: false }),
}))
