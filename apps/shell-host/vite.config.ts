import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ command }) => {
  // Check if we are running local dev server (vite) or production build (vite build)
  const isDev = command === "serve";

  const plugins: any[] = [react(), tailwindcss()];

  if (isDev) {
    // 🚧 DEV MODE: Physical paths and monolithic compilation
    plugins.push({
      name: "monorepo-alias-resolver",
      enforce: "pre",
      resolveId(source: any, importer: any) {
        // Direct physical mapping for root App remotes used in router.tsx
        if (source === "storefront/StorefrontApp") {
          return path.resolve(
            __dirname,
            "../store-client/src/StorefrontRemote.tsx",
          );
        }
        if (source === "admin_dashboard/AdminApp") {
          return path.resolve(
            __dirname,
            "../admin-dashboard/src/AdminRemote.tsx",
          );
        }

        // Context-aware resolver for nested @/ paths
        if (source.startsWith("@/")) {
          const subPath = source.slice(2);
          let targetDir = path.resolve(__dirname, "./src"); // Default shell-host

          if (importer && importer.includes("/store-client/")) {
            targetDir = path.resolve(__dirname, "../store-client/src");
          } else if (importer && importer.includes("/admin-dashboard/")) {
            targetDir = path.resolve(__dirname, "../admin-dashboard/src");
          }

          const targetPath = path.resolve(targetDir, subPath);

          // Manually check physical extensions since Vite expects fully resolved paths from plugins
          const extensions = [
            "",
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".css",
            ".json",
            "/index.ts",
            "/index.tsx",
            "/index.js",
            "/index.jsx",
          ];

          for (const ext of extensions) {
            if (fs.existsSync(targetPath + ext)) {
              return targetPath + ext;
            }
          }

          return null; // Let Vite handle/fail if not found
        }
      },
    });
  } else {
    // 🌐 BUILD MODE: True Module Federation across network boundaries
    plugins.push(
      federation({
        name: "shell_host",
        remotes: {
          storefront: "http://localhost:5175/assets/remoteEntry.js",
          admin_dashboard: "http://localhost:5174/assets/remoteEntry.js",
        },
        shared: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "react-router-dom": "^7.0.0",
          "@clerk/react": "^5.0.0",
        },
      }),
    );
  }

  return {
    root: __dirname,
    plugins,
    resolve: {
      alias: isDev
        ? [
            {
              find: "@ecom/ui-core",
              replacement: path.resolve(__dirname, "../../packages/ui-core"),
            },
            {
              find: "@store",
              replacement: path.resolve(__dirname, "../store-client/src"),
            },
            {
              find: "@admin",
              replacement: path.resolve(__dirname, "../admin-dashboard/src"),
            },
          ]
        : [
            { find: "@", replacement: path.resolve(__dirname, "./src") },
            {
              find: "@ecom/ui-core",
              replacement: path.resolve(__dirname, "../../packages/ui-core"),
            },
            { find: "@store", replacement: "storefront" }, // Maps alias to federation remote key
            { find: "@admin", replacement: "admin_dashboard" }, // Maps alias to federation remote key
          ],
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".css"],
    },

    server: {
      port: 5173,
      strictPort: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/storefront-assets": {
          target: "http://localhost:5175",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/storefront-assets/, "/assets"),
        },
        "/admin-assets": {
          target: "http://localhost:5174",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin-assets/, "/assets"),
        },
      },
    },
    preview: {
      port: 5173,
      strictPort: true,
      cors: true,
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
