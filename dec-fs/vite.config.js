import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfill from "vite-plugin-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    polyfill({
      polyfills: ["buffer/polyfill"],
    }),
  ],
});
