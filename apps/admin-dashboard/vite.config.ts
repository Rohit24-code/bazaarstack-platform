import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// 🚀 Make sure "export default" is explicitly stated here!
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/" : "http://localhost:5175/",
    server: {
      port: 5174,
      strictPort: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    preview: {
      port: 5174,
      strictPort: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "admin_dashboard",
        filename: "remoteEntry.js",
        exposes: {
          "./AdminApp": "./src/AdminRemote.tsx", // 🚀 Expose the corporate management route tree
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
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  };
});
