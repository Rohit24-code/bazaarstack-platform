import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCoupons from "./pages/admin/Promos";
import AdminSettings from "./pages/admin/Settings";
import { SignInPage } from "./pages/auth/SignInPage";

// 🚀 Localized Sub-Router: Completely isolated from consumer logic!
export const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admin", // ◄── This maps directly to your platform's base "/admin" path via the shell
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "coupons", element: <AdminCoupons /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
  { path: "sign-in", element: <SignInPage /> },
]);
