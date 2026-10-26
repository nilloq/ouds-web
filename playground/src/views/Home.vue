<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import markdown from "../content/get-started.md?raw";

const renderedMarkdown = computed(() => marked.parse(markdown));
</script>

<template>
  <article class="markdown-body" v-html="renderedMarkdown" />
</template>

<style scoped>
.markdown-body :deep(h1) {
  margin-bottom: var(--ouds-spacing-medium, 1rem);
}

.markdown-body :deep(h2) {
  margin-top: var(--ouds-spacing-large, 2rem);
}

.markdown-body :deep(pre) {
  overflow-x: auto;
  padding: var(--ouds-spacing-medium, 1rem);
  background: var(--bs-color-surface-secondary);
}

.markdown-body :deep(code) {
  overflow-wrap: anywhere;
}
</style>
