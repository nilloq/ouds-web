<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Text area",
  placeholder = " ",
  helperText = "",
  errorText = "",
  helperLink = "",
  helperLinkHref = "",
  value = "",
  outlined = false,
  disabled = false,
  readonly = false,
  required = false,
  invalid = false,
  maxWidth = false,
} = defineProps<{
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  helperLink?: string;
  helperLinkHref?: string;
  value?: string;
  outlined?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  maxWidth?: boolean;
}>();

const attrs = useAttrs();
const slots = useSlots();
const generatedId = useId();
const inputId = computed(() => id || `ouds-text-area-${generatedId}`);
const helperId = computed(() => `${inputId.value}-helper`);
const errorId = computed(() => `${inputId.value}-error`);
const labelId = computed(() => `${inputId.value}-label`);
const helperLinkId = computed(() => `${inputId.value}-helper-link`);
// Attributes and slot presence can change between renders without invalidating a computed value.
function describedBy() {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if ((helperText || slots["helper-text"]) && !invalid) ids.push(helperId.value);
  if (invalid && (errorText || slots["error-text"])) ids.push(errorId.value);
  if (helperLinkHref && (helperLink || slots["helper-link"])) {
    ids.push(helperLinkId.value);
  }
  return ids.filter(Boolean).join(" ") || undefined;
}
const textAreaClasses = computed(() => ["text-area", { "component-max-width": maxWidth }]);
const textAreaContainerClasses = computed(() => [
  "text-area-container",
  { "text-area-container-outlined": outlined },
]);
</script>

<template>
  <div :class="textAreaClasses">
    <div :class="textAreaContainerClasses">
      <label :id="labelId" :for="inputId" :class="{ 'is-required': required }">
        <slot name="label">{{ label }}</slot>
      </label>
      <textarea
        v-bind="attrs"
        :id="inputId"
        class="text-area-field"
        :placeholder="placeholder || ' '"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-describedby="describedBy()"
        :aria-invalid="invalid"
      ></textarea>
    </div>
    <p v-if="(helperText || $slots['helper-text']) && !invalid" :id="helperId" class="helper-text">
      <slot name="helper-text">{{ helperText }}</slot>
    </p>
    <p v-if="invalid && (errorText || $slots['error-text'])" :id="errorId" class="error-text">
      <slot name="error-text">{{ errorText }}</slot>
    </p>
    <a
      v-if="helperLinkHref && (helperLink || $slots['helper-link'])"
      :id="helperLinkId"
      :href="helperLinkHref"
      :aria-labelledby="`${helperLinkId} ${labelId}`"
      class="link link-small"
    >
      <slot name="helper-link">{{ helperLink }}</slot>
      <span class="visually-hidden">on</span>
    </a>
  </div>
</template>
