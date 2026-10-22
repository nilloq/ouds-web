<script setup lang="ts">
import { computed } from "vue";
import type { TagVariant } from "./tag.types.js";

const {
  variant = "neutral",
  size = "medium",
  muted = false,
  statusIcon = false,
} = defineProps<{
  variant?: TagVariant;
  statusIcon?: boolean;
  size?: "medium" | "small";
  muted?: boolean;
}>();

const tagClasses = computed(() => [
  "tag",
  variant !== "neutral" && `tag-${variant}`,
  {
    "tag-muted": muted,
    "tag-small": size === "small",
  },
]);
</script>

<template>
  <span :class="tagClasses">
    <span v-if="statusIcon" class="tag-status-icon" aria-hidden="true"></span>
    <slot>Tag</slot>
  </span>
</template>
