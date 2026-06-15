import { RouterProvider } from "react-router-dom";
import { storeRouter } from "./router";
import { useBootStrapAuth } from "./features/auth/useBootstrapAuth";

export default function App() {
  useBootStrapAuth();
  return <RouterProvider router={storeRouter} />;
}
