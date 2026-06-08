import { useAuthStore } from "@/features/auth/store.ts";
import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../common/Loader";

function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootStrapped, status } = useAuthStore();
  if (!isLoaded) return null;

  if (!isLoaded || (isSignedIn && (!isBootStrapped || status === "loading"))) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedLayout;
