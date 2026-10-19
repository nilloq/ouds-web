<script setup lang="ts">
import { computed } from "vue";
import type { OudsButtonVariant } from "./button.types.js";

const {
  type = "button",
  variant = "default",
  iconOnly = false,
  disabled = false,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: OudsButtonVariant;
  iconOnly?: boolean;
  disabled?: boolean;
}>();

const validVariants: OudsButtonVariant[] = ["default", "strong", "brand", "minimal", "negative"];
const variantClass = computed(() =>
  validVariants.includes(variant) ? `btn-${variant}` : "btn-default",
);
const iconOnlyClass = computed(() => (iconOnly ? "btn-icon" : ""));
const buttonType = computed(() => (type === "submit" || type === "reset" ? type : "button"));
</script>

<template>
  <button :class="['btn', variantClass, iconOnlyClass]" :type="buttonType" :disabled="disabled">
    <slot>Button</slot>
  </button>
</template>
