import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ClerkProvider } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster, ThemeProvider } from "@ecom/ui-core";

import "@ecom/ui-core/src/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// A wrapper component to safely execute hooks inside the React application tree
function ShellRoot() {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
          <ShellRoot />
        </ClerkProvider>
      </QueryClientProvider>
    </StrictMode>
  </ThemeProvider>,
);
