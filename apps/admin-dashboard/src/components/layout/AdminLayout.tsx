import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/common/Sidebar";
import { useAuth, UserButton } from "@clerk/react";
import { useBootStrapAuth } from "@/features/auth/useBootstrapAuth";
import { ApiProvider } from "@/context/apiContext";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeToggle, ThemeProvider } from "@ecom/ui-core"; // 🚀 IMPORT THEMEPROVIDER HERE TOO!
import { LogIn } from "lucide-react";
import { NavTextLink } from "../common/NavTextLink";

function AdminInitializer({ children }: { children: React.ReactNode }) {
  useBootStrapAuth();
  return <>{children}</>;
}

function AdminLayout() {
  const { isSignedIn } = useAuth();
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
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border px-4 backdrop-blur-2xl lg:px-6">
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              {isSignedIn ? (
                <UserButton />
              ) : (
                <NavTextLink href="/sign-in" label="Login" icon={LogIn} />
              )}
            </div>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );

  return (
    // 🎯 WRAP EVERYTHING NATIVELY IN THEMEPROVIDER HERE
    // This provides a local memory reference for the theme context that matches this chunk's ThemeToggle!
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApiProvider baseUrl={gatewayUrl}>
        {localQueryClient ? (
          <QueryClientProvider client={localQueryClient}>
            <AdminInitializer>
              {layoutContent}
              <ReactQueryDevtools initialIsOpen={false} />
            </AdminInitializer>
          </QueryClientProvider>
        ) : (
          <AdminInitializer>{layoutContent}</AdminInitializer>
        )}
      </ApiProvider>
    </ThemeProvider>
  );
}

export default AdminLayout;
