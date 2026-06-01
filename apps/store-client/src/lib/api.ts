import { ApiClient, CustomerProductService } from "@ecom/api-client";

const apiClient = new ApiClient({
  backendUrl: "http://localhost:5000/api",
  tokenGetter: async () => null,
  onSessionExpired: () => {
    window.location.href = "/login";
  },
});

export const customerProductApi = new CustomerProductService(apiClient);
