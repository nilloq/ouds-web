<script setup lang="ts">
import { computed } from "vue";
import type { OudsButtonVariant } from "./button.types.js";

const {
  type = "button",
  variant = "default",
  size = "medium",
  iconOnly = false,
  disabled = false,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: OudsButtonVariant;
  size?: "medium" | "small";
  iconOnly?: boolean;
  disabled?: boolean;
}>();

const buttonClasses = computed(() => {
  return [
    "btn",
    `btn-${variant}`,
    {
      "btn-icon": iconOnly,
      "btn-small": size === "small",
    },
  ];
});
const buttonType = computed(() => (type === "submit" || type === "reset" ? type : "button"));
</script>

<template>
  <button :class="buttonClasses" :type="buttonType" :disabled="disabled">
    <slot>Button</slot>
  </button>
</template>
