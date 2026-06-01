import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs"; // 🚀 Native Node file system reader to check if files exist

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: "$1",
        customResolver(updatedId, importer) {
          // 1. If the file importing this code lives inside store-client, resolve it inside store-client/src
          if (importer && importer.includes("apps/store-client")) {
            return path.resolve(__dirname, "./src", updatedId);
          }

          // 2. If it walks from ui-core, build the raw absolute target track
          const baseUIPath = path.resolve(
            __dirname,
            "../../packages/ui-core/src",
            updatedId,
          );

          // 3. 🛡️ Try structural extensions on the fly so Vite finds the true files!
          if (fs.existsSync(`${baseUIPath}.tsx`)) return `${baseUIPath}.tsx`;
          if (fs.existsSync(`${baseUIPath}.ts`)) return `${baseUIPath}.ts`;
          if (fs.existsSync(`${baseUIPath}.jsx`)) return `${baseUIPath}.jsx`;
          if (fs.existsSync(`${baseUIPath}.js`)) return `${baseUIPath}.js`;

          return baseUIPath;
        },
      },
    ],
  },
});
