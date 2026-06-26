/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    base: mode === "production" ? "/" : "http://localhost:5175/",
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      federation({
        name: "storefront",
        filename: "remoteEntry.js",
        exposes: {
          "./StorefrontApp": "./src/StorefrontRemote.tsx",
          "./useBootstrapAuth": "./src/features/auth/useBootstrapAuth.ts",
          "./ErrorModal": "./src/components/ErrorModal.tsx",
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
