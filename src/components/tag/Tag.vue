<script setup lang="ts">
import { computed } from "vue";
import type { OudsTagVariant } from "./tag.types.js";

const {
  variant = "neutral",
  size = "medium",
  muted = false,
} = defineProps<{
  variant?: OudsTagVariant;
  size?: "medium" | "small";
  muted?: boolean;
}>();

const functionalVariants: OudsTagVariant[] = ["positive", "info", "warning", "negative"];
const tagClasses = computed(() => [
  "tag",
  variant !== "neutral" && `tag-${variant}`,
  muted && "tag-muted",
  size === "small" && "tag-small",
]);
</script>

<template>
  <span :class="tagClasses">
    <span
      v-if="functionalVariants.includes(variant)"
      class="tag-status-icon"
      aria-hidden="true"
    ></span>
    <slot>Tag</slot>
  </span>
</template>
