import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(playgroundRoot, "..");

export default defineConfig({
  root: playgroundRoot,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ouds-"),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@nilloq/ouds-web/vue": resolve(projectRoot, "dist/vue.js"),
      "@nilloq/ouds-web": resolve(projectRoot, "dist/index.js"),
    },
  },
});
