import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 🌐 TRUE RUNTIME FEDERATION IMPORTS: Pulled purely across network origins!
// @ts-ignore
const StorefrontRemote = lazy(() => import("storefront/StorefrontApp"));
// @ts-ignore
const AdminRemote = lazy(() => import("admin_dashboard/AdminApp"));

export const router = createBrowserRouter([
  {
    path: "/admin/*", // 🔐 Intercept all traffic targeting management views
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading Enterprise Management Matrix...
          </div>
        }
      >
        <AdminRemote />
      </Suspense>
    ),
  },
  {
    path: "/*", // 🛒 Capture all other public/consumer traffic
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Streaming BazaarStack Catalog...
          </div>
        }
      >
        <StorefrontRemote />
      </Suspense>
    ),
  },
]);
