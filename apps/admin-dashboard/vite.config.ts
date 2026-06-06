import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 🚀 Make sure "export default" is explicitly stated here!
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174, // 🔌 Pins the admin panel to port 5174 so it doesn't conflict with the shell host
  },
});
