import React, { createContext, useContext, useEffect, useMemo } from "react";

import { useAuth } from "@clerk/react"; // Or your active authentication engine
import { ApiClient } from "@ecom/api-client";

// 1. Define the Context Blueprint
const ApiContext = createContext<ApiClient | null>(null);

interface ApiProviderProps {
  children: React.ReactNode;
  baseUrl: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({
  children,
  baseUrl,
}) => {
  const { getToken } = useAuth();

  // 2. Instantiate the ApiClient exactly once inside this application block
  const apiClient = useMemo(
    () =>
      new ApiClient({
        backendUrl: baseUrl,
        tokenGetter: async () => {
          try {
            const token = await getToken();
            return token ?? null;
          } catch (error) {
            console.error("Failed to rotate infrastructure token:", error);
            return null;
          }
        },
      }),
    [baseUrl, getToken],
  );

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
};

export const useApi = (): ApiClient => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error(
      "CRITICAL CONTEXT FAILURE: useApi must be executed within a valid <ApiProvider> tree.",
    );
  }

  return context;
};
