import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "");

  // 🛡️ Explicit Cloud Container Flags
  const isCloudCI = process.env.VERCEL === "1" || process.env.CI === "true";

  const plugins: any[] = [react(), tailwindcss()];

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
    // 🌐 FIXED COMPILATION: Natively mapped parameters for @originjs/vite-plugin-federation
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
        shared: ["react", "react-dom", "react-router-dom", "@clerk/react"],
      }),
    );
  }

  return {
    root: __dirname,
    plugins,
    resolve: {
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
      rollupOptions: {
        external: [
          "storefront/StorefrontApp",
          "admin_dashboard/AdminApp",
          "storefront/features/auth/useBootstrapAuth",
        ],
      },
    },
  };
});
