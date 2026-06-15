import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@ecom/ui-core/src/index.css";

import { ClerkProvider } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiProvider } from "./context/apiContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const clerkPubKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YWN0dWFsLWFpcmVkYWxlLTQuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!clerkPubKey) {
  console.error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ApiProvider baseUrl={import.meta.env.BASE_URL}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
