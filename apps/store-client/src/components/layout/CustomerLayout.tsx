import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../customer/common/DesktopNavbar";

// 🚀 STRATEGIC INFRASTRUCTURE INJECTIONS
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiProvider } from "../../context/apiContext";
import { useBootStrapAuth } from "@/features/auth/useBootstrapAuth";
import ErrorModal from "../ErrorModal";

function StorefrontInitializer({ children }: { children: React.ReactNode }) {
  useBootStrapAuth();
  return <>{children}</>;
}

export default function CustomerLayout() {
  let hasParentQueryClient = false;
  try {
    hasParentQueryClient = !!useQueryClient();
  } catch {
    hasParentQueryClient = false;
  }

  const localQueryClient = useMemo(() => {
    if (hasParentQueryClient) return null;
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }, [hasParentQueryClient]);

  const gatewayUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";

  const layoutContent = (
    <div className="min-h-screen bg-background text-foreground">
      <CustomerNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
      <ErrorModal />
    </div>
  );

  return (
    <ApiProvider baseUrl={gatewayUrl}>
      {localQueryClient ? (
        <QueryClientProvider client={localQueryClient}>
          {/* ✅ Wrap layout content so the hook runs AFTER the client is set */}
          <StorefrontInitializer>
            {layoutContent}
            <ReactQueryDevtools initialIsOpen={false} />
          </StorefrontInitializer>
        </QueryClientProvider>
      ) : (
        /* ✅ If the host app already provides a QueryClient, wrap it here too */
        <StorefrontInitializer>{layoutContent}</StorefrontInitializer>
      )}
    </ApiProvider>
  );
}
