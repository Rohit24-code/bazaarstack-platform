import { useAuthStore } from "@/features/auth/store"
import type { UserRole } from "@/lib/types"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "../common/Loader"

type RoleGuardLayoutProps = {
  allow: UserRole[]
}

const RoleGuardLayout = ({ allow }: RoleGuardLayoutProps) => {
  const { isBootStrapped, status, user } = useAuthStore()

  if (!isBootStrapped || status === "loading") return <Loader />

  if (!user) {
    return <Navigate to={"/sign-in"} replace />
  }

  if (!allow.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleGuardLayout
