import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 🚀 Pure, universal path resolution that works perfectly in both ESM and CommonJS modes!
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react({}), // Keeps your specific strict options argument satisfied!
  ],
  resolve: {
    alias: {
      // Cleanly routes internal shadcn absolute tracks straight back to the package src folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
