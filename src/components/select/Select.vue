<script setup lang="ts">
import { computed, useAttrs, useId, useSlots, type SelectHTMLAttributes } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Select",
  options = [],
  helperText = "",
  errorText = "",
  helperLink = "",
  helperLinkHref = "",
  value = "",
  outlined = false,
  disabled = false,
  required = false,
  invalid = false,
  maxWidth = false,
  loading = false,
} = defineProps<{
  id?: string;
  label?: string;
  options?: { label: string; value: string }[];
  helperText?: string;
  errorText?: string;
  helperLink?: string;
  helperLinkHref?: string;
  value?: string;
  outlined?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  maxWidth?: boolean;
  loading?: boolean;
}>();

const attrs = useAttrs();
const slots = useSlots();
const generatedId = useId();
const selectId = computed(() => id || `ouds-select-${generatedId}`);
const labelId = computed(() => `${selectId.value}-label`);
const helperId = computed(() => `${selectId.value}-helper`);
const errorId = computed(() => `${selectId.value}-error`);
const helperLinkId = computed(() => `${selectId.value}-helper-link`);
const loadingId = computed(() => `${selectId.value}-loading`);

// Read attributes and slot presence on each render, including parent updates.
function describedBy() {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if ((helperText || slots["helper-text"]) && !invalid) ids.push(helperId.value);
  if (invalid && (errorText || slots["error-text"])) ids.push(errorId.value);
  if (helperLinkHref && (helperLink || slots["helper-link"])) ids.push(helperLinkId.value);
  if (loading) ids.push(loadingId.value);
  return ids.filter(Boolean).join(" ") || undefined;
}
const containerClasses = computed(() => [
  "select-input-container",
  { "select-input-container-outlined": outlined },
]);
const selectClasses = computed(() => ["select-input", { "component-max-width": maxWidth }]);
const fieldClasses = computed(() => ["select-input-field", { "loading-indeterminate": loading }]);
</script>

<template>
  <div :class="selectClasses">
    <div :class="containerClasses">
      <slot name="leading-icon" />
      <label :id="labelId" :for="selectId" :class="{ 'is-required': required }">
        <slot name="label">{{ label }}</slot>
      </label>
      <select
        v-bind="attrs"
        :id="selectId"
        :aria-describedby="describedBy()"
        :aria-invalid="invalid || (attrs['aria-invalid'] as SelectHTMLAttributes['aria-invalid'])"
        :class="fieldClasses"
        :value="value"
        :disabled="disabled"
        :required="required"
      >
        <option value="" disabled :selected="value === ''"></option>
        <slot>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :selected="option.value === value"
          >
            {{ option.label }}
          </option>
        </slot>
      </select>
      <template v-if="loading">
        <svg viewBox="0 0 40 40" class="loader" aria-hidden="true">
          <circle class="loader-inner" cx="20" cy="20" r="17"></circle>
        </svg>
        <span :id="loadingId" role="status" class="visually-hidden">Loading</span>
      </template>
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
