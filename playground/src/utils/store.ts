import { createGlobalState, useStorage } from "@vueuse/core";

export type CodeDisplayMode = "html" | "vue";

export const useStore = createGlobalState(() => ({
  codeDisplayMode: useStorage<CodeDisplayMode>("ouds-playground-code-display-mode", "html"),
}));
