import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 🐚 Layouts can be imported synchronously if they are always needed immediately
import CustomerLayout from "./components/layout/CustomerLayout";
import ProtectedLayout from "./components/auth/ProtectedLayout";

export { useBootStrapAuth } from "./features/auth/useBootstrapAuth";
export { default as ErrorModal } from "./components/ErrorModal";

const SignInPage = lazy(() =>
  import("./pages/auth/SignInPage").then((m) => ({
    default: m.SignInPage,
  })),
);
const SignUpPage = lazy(() =>
  import("./pages/auth/SignUpPage").then((m) => ({
    default: m.SignUpPage,
  })),
);

// 🚀 GRANULAR CODE SPLITTING: Split each page into its own micro-chunk on the fly!
const StoreHome = lazy(() => import("./pages/customer/Home"));
const Collections = lazy(() => import("./pages/customer/Collections"));
const CollectionsDetails = lazy(
  () => import("./pages/customer/CollectionsDetails"),
);
const CustomerOrderSuccessPage = lazy(
  () => import("./pages/customer/OrderSuccess"),
);
const CustomerProfile = lazy(() => import("./pages/customer/Profile"));

export default function StorefrontRemote() {
  return (
    // Wrap your sub-routes in a Suspense boundary so they can load independently
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">Loading Section...</div>
      }
    >
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="sign-in/*" element={<SignInPage />} />
          <Route path="sign-up/*" element={<SignUpPage />} />
          <Route index element={<StoreHome />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collection/:id" element={<CollectionsDetails />} />
          <Route path="order-success" element={<CustomerOrderSuccessPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path="profile" element={<CustomerProfile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
