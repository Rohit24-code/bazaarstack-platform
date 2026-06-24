/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  // Load environment variables based on current execution mode
  const env = loadEnv(mode, process.cwd(), "");

  // 🚀 DYNAMIC PRODUCTION BASE CONFIGURATION:
  // If building on Vercel, use the active domain path. Otherwise, fall back to localhost.
  const productionBaseUrl = env.VERCEL_URL
    ? `https://${env.VERCEL_URL}/`
    : "http://localhost:5175/";

  return {
    root: __dirname,
    base: mode === "production" ? productionBaseUrl : "http://localhost:5175/",
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      federation({
        name: "storefront",
        filename: "remoteEntry.js",
        exposes: {
          "./StorefrontApp": "./src/StorefrontRemote.tsx",
          "./features/auth/useBootstrapAuth":
            "./src/features/auth/useBootstrapAuth.ts",
          "./components/ErrorModal": "./src/components/ErrorModal.tsx",
        },
        shared: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "react-router-dom": "^7.0.0",
          "@clerk/react": "^5.0.0",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@store": path.resolve(__dirname, "./src"),
        "@ecom/ui-core": path.resolve(__dirname, "../../packages/ui-core"),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
    server: {
      port: 5175,
      strictPort: true,
      cors: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    preview: { port: 5175, strictPort: true, cors: true },
    build: { target: "esnext", minify: false, cssCodeSplit: false },
  };
});
