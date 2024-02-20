/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const vitestConfig = defineVitestConfig({
  test: {
    include: ["**/*.test.tsx"],
    globals: true,
    setupFiles: "./setupTests.ts",
    environment: "jsdom",
  },
});

const viteConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
});

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, vitestConfig);
