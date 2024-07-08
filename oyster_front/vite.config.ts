/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dns from "node:dns";

dns.setDefaultResultOrder("verbatim"); // https://vitejs.dev/config/server-options.html#server-host

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./__tests__/testSetup.ts",
  },
});
