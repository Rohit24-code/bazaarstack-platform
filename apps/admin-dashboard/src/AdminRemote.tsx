import { useEffect, useState } from "react";
import { SignIn, useAuth } from "@clerk/react";
import { Routes, Route } from "react-router-dom";
import { injectAuthHeaderGetter } from "./lib/api";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardHome from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/Products";
import OrdersManagement from "./pages/admin/Orders";
import AdminCoupons from "./pages/admin/Promos";
import AdminSettings from "./pages/admin/Settings";
import AdminProtectedLayout from "./components/auth/ProtectedLayout";

export default function AdminRemote() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      injectAuthHeaderGetter(() => getToken());
      setIsAuthReady(true);
    }
  }, [getToken, isLoaded, isSignedIn]);

  if (!isLoaded || !isAuthReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-slate-100">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto"></div>
          <p className="text-sm font-medium tracking-wide text-slate-400">
            Hydrating Secure Administrative Shell...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route element={<AdminLayout />}>
        <Route element={<AdminProtectedLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
