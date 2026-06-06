import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@clerk/react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Loader from "../common/Loader"

function PublicOnlyLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isBootStrapped, status } = useAuthStore()
  const location = useLocation()

  if (!isLoaded || (isSignedIn && (!isBootStrapped || status === "loading")))
    return <Loader />

  if (
    isSignedIn &&
    (location?.pathname === "/sign-in" || location?.pathname === "/sign-up")
  ) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicOnlyLayout
