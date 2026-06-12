import { defineConfig } from "vitest/config"; // or 'vitest'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",

    // ◄ ADD THIS LINE RIGHT HERE
    setupFiles: "./src/setupTests.ts",
  },
});
