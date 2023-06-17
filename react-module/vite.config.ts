import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components/"),
      store: path.resolve(__dirname, "./src/store/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      models: path.resolve(__dirname, "./src/models/"),
      consts: path.resolve(__dirname, "./src/consts/"),
      services: path.resolve(__dirname, "./src/services/"),
    },
  },
});