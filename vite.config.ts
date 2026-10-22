import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite-plus";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Completely remove Options API support and Vue devtools from the final bundle
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [vue()],
  build: {
    minify: true,
    lib: {
      entry: {
        index: "src/index.ts",
        button: "src/button.ts",
        tag: "src/tag.ts",
        select: "src/select.ts",
        checkbox: "src/checkbox.ts",
        "text-input": "src/text-input.ts",
        elements: "src/elements/index.ts",
        "elements-button": "src/elements/button.ts",
        "elements-tag": "src/elements/tag.ts",
        "elements-select": "src/elements/select.ts",
        "elements-checkbox": "src/elements/checkbox.ts",
        "elements-text-input": "src/elements/text-input.ts",
      },
      name: "Ouds Web Components",
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
