import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
        // 🛒 1. MAP @store IN THE SHELL TO POINT TO THE STORE APP'S SRC FOLDER
      {
        find: /^@store\/(.*)$/,
        replacement: path.resolve(__dirname, "../store-client/src/$1"),
      },
      {
        find: /^@\/(.*)$/,
        replacement: "$1",
        customResolver(updatedId, importer) {
          // 🛒 1. If the component requesting this path lives inside store-client, resolve it there!
          if (importer && importer.includes("apps/store-client")) {
            const storePath = path.resolve(
              __dirname,
              "../store-client/src",
              updatedId,
            );

            if (fs.existsSync(`${storePath}.tsx`)) return `${storePath}.tsx`;
            if (fs.existsSync(`${storePath}.ts`)) return `${storePath}.ts`;
            return storePath;
          }

          // 🎛️ 2. If the component requesting this path lives inside admin-dashboard, resolve it there!
          if (importer && importer.includes("apps/admin-dashboard")) {
            const adminPath = path.resolve(
              __dirname,
              "../admin-dashboard/src",
              updatedId,
            );

            if (fs.existsSync(`${adminPath}.tsx`)) return `${adminPath}.tsx`;
            if (fs.existsSync(`${adminPath}.ts`)) return `${adminPath}.ts`;
            return adminPath;
          }

          // 🐚 3. Fallback: Resolve inside the shell-host's local src directory
          return path.resolve(__dirname, "./src", updatedId);
        },
      },
      // 🔌 4. Shared workspace primitives mapping
      {
        find: "@ecom/ui-core",
        replacement: path.resolve(__dirname, "../../packages/ui-core"),
      },
    ],
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
