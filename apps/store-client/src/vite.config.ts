// apps/store-client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // 🚀 Handles modern React Fast Refresh natively without the old package!
    tailwindcss(), // 🎨 Compiles your modern Tailwind v4 OKLCH theme engine
  ],
});
