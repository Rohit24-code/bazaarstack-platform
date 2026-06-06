import { RouterProvider } from "react-router-dom";
import { storeRouter } from "./router";

export default function App() {
  return <RouterProvider router={storeRouter} />;
}
