import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite-plus";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    minify: true,
    rolldownOptions: {
      external: ["vue"],
    },
    lib: {
      entry: {
        vue: "src/vue/index.ts",
        "vue-button": "src/vue/button.ts",
        "vue-tag": "src/vue/tag.ts",
        "vue-select": "src/vue/select.ts",
        "vue-checkbox": "src/vue/checkbox.ts",
        "vue-text-input": "src/vue/text-input.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
  },
});
