import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 🚀 Dynamic Bundle Division: Code split your app frameworks at the root boundary!
const StorefrontRemote = lazy(() => import("./remotes/StorefrontRemote"));
const AdminRemote = lazy(() => import("./remotes/AdminRemote"));

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
