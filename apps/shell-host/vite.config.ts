import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "");

  // 🛡️ Explicit Cloud Environment Identification Flag
  const isCloudCI = process.env.VERCEL === "1" || process.env.CI === "true";

  const plugins: any[] = [react(), tailwindcss()];

  // Only attach the custom local filesystem resolver if we are running standard local dev server
  if (isDev && !isCloudCI) {
    plugins.push({
      name: "monorepo-alias-resolver",
      enforce: "pre",
      resolveId(source: any, importer: any) {
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

        if (source.startsWith("@/")) {
          const subPath = source.slice(2);
          let targetDir = path.resolve(__dirname, "./src");

          if (importer && importer.includes("/store-client/")) {
            targetDir = path.resolve(__dirname, "../store-client/src");
          } else if (importer && importer.includes("/admin-dashboard/")) {
            targetDir = path.resolve(__dirname, "../admin-dashboard/src");
          }

          const targetPath = path.resolve(targetDir, subPath);
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
          ];

          for (const ext of extensions) {
            if (fs.existsSync(targetPath + ext)) {
              return targetPath + ext;
            }
          }
          return null;
        }
      },
    });
  } else {
    // 🌐 STRICT PRODUCTION BUILD MODE: Defer entirely to Module Federation URL paths
    plugins.push(
      federation({
        name: "shell_host",
        remotes: {
          storefront:
            env.VITE_STORE_CLIENT_REMOTE_URL ||
            "http://localhost:5175/assets/remoteEntry.js",
          admin_dashboard:
            env.VITE_ADMIN_DASHBOARD_REMOTE_URL ||
            "http://localhost:5174/assets/remoteEntry.js",
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
      // 🚀 THE MAGIC MATRIX: If building on Vercel, rewrite all sibling folder mappings
      // straight into external Federated keys so Rollup never tries to read local disk files!
      alias:
        isDev && !isCloudCI
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
              { find: "@store", replacement: "storefront" },
              { find: "@admin", replacement: "admin_dashboard" },
            ],
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".css"],
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      // 🛡️ Bypass Rollup strict validation for remote federated assets during cloud production compilation
      rollupOptions: {
        external: ["storefront/StorefrontApp", "admin_dashboard/AdminApp"],
      },
    },
  };
});
