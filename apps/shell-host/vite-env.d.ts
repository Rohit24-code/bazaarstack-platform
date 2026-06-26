/// <reference types="vite/client" />

// 🚀 Instructs TypeScript to treat federated network paths as valid implicit modules
declare module "storefront/StorefrontApp" {
  const StorefrontApp: React.ComponentType<any>;
  export default StorefrontApp;
}

declare module "storefront/useBootstrapAuth" {
  export const useBootStrapAuth: () => any; // Adjust type signature match later if needed
}

declare module "storefront/ErrorModal" {
  export const ErrorModal: React.ComponentType<any>;
}

declare module "admin_dashboard/AdminApp" {
  const AdminApp: React.ComponentType<any>;
  export default AdminApp;
}
