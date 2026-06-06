import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "./components/layout/CustomerLayout";
import StoreHome from "./pages/customer/Home";
import Collections from "./pages/customer/Collections";
import CollectionsDetails from "./pages/customer/CollectionsDetails";
import CustomerOrderSuccessPage from "./pages/customer/OrderSuccess";
import CustomerProfile from "./pages/customer/Profile";
import ProtectedLayout from "./components/auth/ProtectedLayout";

export const storeRouter = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <StoreHome /> },
      { path: "collections", element: <Collections /> },
      { path: "collection/:id", element: <CollectionsDetails /> },
      { path: "order-success", element: <CustomerOrderSuccessPage /> },
      {
        element: <ProtectedLayout />, // 🔒 Core customer authorization protection boundary
        children: [{ path: "profile", element: <CustomerProfile /> }],
      },
    ],
  },
]);
