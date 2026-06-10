import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../customer/common/DesktopNavbar";

// 🚀 STRATEGIC INFRASTRUCTURE INJECTIONS
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiProvider } from "../../context/apiContext"; // Aligned to your path casing: apiContext

export default function CustomerLayout() {
  // 🛡️ INFRASTRUCTURE SINGLETON GUARD:
  // Instantiating the QueryClient once inside a useMemo block ensures that the network
  // cache entries do not reset or drop during dynamic page transitions.
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Datasets stay fresh for 5 minutes in memory
            refetchOnWindowFocus: false, // Prevents aggressive network spam on window switching
            retry: 1, // Fails fast on backend infrastructure drops
          },
        },
      }),
    [],
  );

  // Safely extract the gateway route from Vite's compiled meta environment matrix
  const gatewayUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";

  return (
    <ApiProvider baseUrl={gatewayUrl}>
      <QueryClientProvider client={queryClient}>
        {/*  YOUR ORIGINAL VISUAL PRESENTATION LAYER */}
        <div className="min-h-screen bg-background text-foreground">
          <CustomerNavbar />
          <main className="mx-auto max-w-7xl px-4 py-8">
            {/*  The dynamic portal where your collections page mounts safely! */}
            <Outlet />
          </main>
        </div>

        {/* Local developer cache stream visualization layer */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApiProvider>
  );
}
