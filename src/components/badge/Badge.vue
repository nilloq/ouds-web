<script setup lang="ts">
import { computed } from "vue";
import type { BadgeVariant, BadgeSize } from "./badge.types.js";

const {
  variant = "negative",
  size = "medium",
  count,
  label = "Notification",
  statusIcon = false,
  disabled = false,
} = defineProps<{
  variant?: BadgeVariant;
  size?: BadgeSize;
  count?: string | number;
  label?: string;
  statusIcon?: boolean;
  disabled?: boolean;
}>();

const hasCount = computed(() => count !== undefined && count !== null);
const functional = computed(() => ["positive", "info", "warning", "negative"].includes(variant));
const badgeClasses = computed(() => [
  "badge",
  variant !== "negative" && `badge-${variant}`,
  size !== "medium" && `badge-${size}`,
  { "badge-count": hasCount.value, disabled },
]);
</script>

<template>
  <span :class="badgeClasses">
    <template v-if="hasCount">{{ count }}</template>
    <slot v-else name="icon">
      <span v-if="statusIcon && functional" class="badge-status-icon" aria-hidden="true"></span>
    </slot>
    <span class="visually-hidden"
      >{{ hasCount ? " " : "" }}<slot>{{ label }}</slot></span
    >
  </span>
</template>
