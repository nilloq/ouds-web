import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(playgroundRoot, "..");

export default defineConfig({
  root: playgroundRoot,
  base: process.env.PLAYGROUND_BASE ?? "/",
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
      "@nilloq/ouds-web/components/button": resolve(projectRoot, "src/elements/button.ts"),
      "@nilloq/ouds-web/components/checkbox": resolve(projectRoot, "src/elements/checkbox.ts"),
      "@nilloq/ouds-web/components/select": resolve(projectRoot, "src/elements/select.ts"),
      "@nilloq/ouds-web/components/tag": resolve(projectRoot, "src/elements/tag.ts"),
      "@nilloq/ouds-web/components/text-input": resolve(projectRoot, "src/elements/text-input.ts"),
      "@nilloq/ouds-web": resolve(projectRoot, "dist/index.js"),
    },
  },
});
