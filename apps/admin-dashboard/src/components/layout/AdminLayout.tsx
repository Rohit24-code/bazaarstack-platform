import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/common/Sidebar";
import { UserButton } from "@clerk/react";
import { useBootStrapAuth } from "@/features/auth/useBootstrapAuth";
import { ApiProvider } from "@/context/apiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AdminLayout() {
  useBootStrapAuth();

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

  const gatewayUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";

  return (
    <ApiProvider baseUrl={gatewayUrl}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-secondary/40 text-foreground">
          <div className="flex min-h-screen">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border px-4 backdrop-blur-2xl lg:px-6">
                <div className="ml-auto flex items-center gap-2">
                  <UserButton />
                </div>
              </header>

              <main className="flex-1">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApiProvider>
  );
}

export default AdminLayout;
