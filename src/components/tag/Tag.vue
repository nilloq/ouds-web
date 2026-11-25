<script setup lang="ts">
import { computed } from "vue";
import type { TagVariant, TagSize } from "./tag.types.js";

const {
  variant = "neutral",
  size = "medium",
  muted = false,
  statusIcon = false,
  bullet = false,
  disabled = false,
  loading = false,
} = defineProps<{
  variant?: TagVariant;
  statusIcon?: boolean;
  size?: TagSize;
  muted?: boolean;
  bullet?: boolean;
  disabled?: boolean;
  loading?: boolean;
}>();

const categorical = computed(() => variant.startsWith("categorical-"));
const functional = computed(() => ["positive", "info", "warning", "negative"].includes(variant));
const tagClasses = computed(() => [
  "tag",
  variant !== "neutral" && `tag-${variant}`,
  {
    "tag-muted": muted && !categorical.value,
    "tag-small": size === "small",
    disabled,
    loading,
  },
]);
</script>

<template>
  <span :class="tagClasses">
    <template v-if="loading">
      <svg viewBox="0 0 40 40" class="tag-loader" aria-hidden="true">
        <circle class="tag-loader-inner" cx="20" cy="20" r="15"></circle>
      </svg>
      <span role="status" class="visually-hidden">Loading</span>
    </template>
    <span v-else-if="statusIcon && functional" class="tag-status-icon" aria-hidden="true"></span>
    <span v-else-if="bullet" class="tag-bullet" aria-hidden="true"></span>
    <slot>Tag</slot>
  </span>
</template>
