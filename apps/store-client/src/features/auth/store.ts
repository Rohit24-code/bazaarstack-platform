import type { AppUser } from "@/lib/types"
import { create } from "zustand"

type AuthStatus = "idle" | "loading" | "ready" | "error"

type AuthStore = {
  status: AuthStatus
  isBootStrapped: boolean
  user: AppUser | null
  error: string | null
  setLoading: () => void
  setUser: (user: AppUser | null) => void
  setError: (message: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: "idle",
  isBootStrapped: false,
  user: null,
  error: null,
  setLoading: () =>
    set({
      status: "loading",
      error: null,
    }),
  setUser: (user: AppUser | null) =>
    set({
      status: "ready",
      isBootStrapped: true,
      user,
      error: null,
    }),
  setError: (message: string) =>
    set({
      status: "error",
      isBootStrapped: true,
      error: message,
    }),
  clearAuth: () =>
    set({
      status: "ready",
      isBootStrapped: true,
      user: null,
      error: null,
    }),
}))
