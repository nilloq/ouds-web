<script setup lang="ts">
import { computed } from "vue";
import type { ButtonType, ButtonVariant, ButtonSize, ButtonNavigation } from "./button.types.js";

const {
  type = "button",
  variant = "default",
  size = "medium",
  iconOnly = false,
  ariaLabel,
  navigation,
  disabled = false,
  loading = false,
} = defineProps<{
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  ariaLabel?: string;
  navigation?: ButtonNavigation;
  disabled?: boolean;
  loading?: boolean;
}>();

const buttonClasses = computed(() => {
  return [
    "btn",
    `btn-${variant}`,
    {
      "btn-icon": iconOnly,
      "btn-small": size === "small",
      "loading-indeterminate": loading,
    },
    ...(navigation ? [`btn-${navigation}`] : []),
  ];
});
const buttonType = computed(() => (type === "submit" || type === "reset" ? type : "button"));
</script>

<template>
  <button :class="buttonClasses" :type="buttonType" :disabled="disabled || loading">
    <slot />
    <span v-if="ariaLabel" class="visually-hidden">{{ ariaLabel }}</span>
    <svg
      v-if="loading"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      class="loader"
      aria-hidden="true"
    >
      <circle class="loader-inner" cx="20" cy="20" r="17"></circle>
    </svg>
    <span v-if="loading" role="status" class="visually-hidden">Loading</span>
  </button>
</template>
