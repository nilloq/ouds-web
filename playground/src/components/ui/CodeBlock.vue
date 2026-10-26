<script setup lang="ts">
import { ref, watch } from "vue";
import { codeToHtml } from "shiki";
import { addCopyButton } from "shiki-transformer-copy-button";

const { code, language } = defineProps<{
  code: string;
  language: "html" | "vue";
}>();

const highlightedCode = ref("");
let requestId = 0;

watch(
  () => [code, language] as const,
  async ([code, language]) => {
    const currentRequestId = ++requestId;
    try {
      const html = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
        transformers: [
          addCopyButton({
            button: { title: "Copy code", "aria-label": "Copy code" },
          }),
        ],
      });
      if (currentRequestId === requestId) highlightedCode.value = html;
    } catch {
      if (currentRequestId === requestId) highlightedCode.value = "";
    }
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="highlightedCode" class="code-block" v-html="highlightedCode" />
  <pre v-else class="code-block"><code>{{ code }}</code></pre>
</template>

<style lang="css" scoped>
.code-block :deep(pre) {
  position: relative;
  margin: 0;
  overflow-x: auto;
  padding: 1rem;
}

.code-block :deep(pre button.copy) {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  width: 1.75rem;
  height: 1.75rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 0.25rem;
  background: rgb(255 255 255 / 8%);
  color: #fff;
  cursor: pointer;
}

.code-block :deep(pre button.copy:hover) {
  background: rgb(255 255 255 / 16%);
}

.code-block :deep(pre button.copy span) {
  width: 1rem;
  aspect-ratio: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.code-block :deep(pre button.copy .ready) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='8' y='8' width='12' height='12' rx='2'/%3E%3Cpath d='M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3'/%3E%3C/svg%3E");
}

.code-block :deep(pre button.copy .success) {
  display: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 12 4 4L19 6'/%3E%3C/svg%3E");
}

.code-block :deep(pre button.copy.copied .success) {
  display: block;
}

.code-block :deep(pre button.copy.copied .ready) {
  display: none;
}
</style>
