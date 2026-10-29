<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Text input",
  placeholder = " ",
  helperText = "",
  errorText = "",
  helperLink = "",
  helperLinkHref = "",
  prefix = "",
  suffix = "",
  value = "",
  type = "text",
  outlined = false,
  disabled = false,
  readonly = false,
  required = false,
  invalid = false,
  maxWidth = false,
  loading = false,
} = defineProps<{
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  helperLink?: string;
  helperLinkHref?: string;
  prefix?: string;
  suffix?: string;
  value?: string;
  type?: string;
  outlined?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  maxWidth?: boolean;
  loading?: boolean;
}>();

const attrs = useAttrs();
const slots = useSlots();
const generatedId = useId();
const inputId = computed(() => id || `ouds-text-input-${generatedId}`);
const helperId = computed(() => `${inputId.value}-helper`);
const errorId = computed(() => `${inputId.value}-error`);
const labelId = computed(() => `${inputId.value}-label`);
const helperLinkId = computed(() => `${inputId.value}-helper-link`);
const describedBy = computed(() => {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if (helperText && !invalid) ids.push(helperId.value);
  if (invalid && (errorText || slots["error-text"])) ids.push(errorId.value);
  if (helperLinkHref && (helperLink || slots["helper-link"])) {
    ids.push(helperLinkId.value);
  }
  return ids.filter(Boolean).join(" ") || undefined;
});
const textInputClasses = computed(() => ["text-input", { "component-max-width": maxWidth }]);
const textInputContainerClasses = computed(() => [
  "text-input-container",
  { "text-input-container-outlined": outlined },
]);
const textInputFieldClasses = computed(() => [
  "text-input-field",
  { "loading-indeterminate": loading },
]);
</script>

<template>
  <div :class="textInputClasses">
    <div :class="textInputContainerClasses">
      <slot name="leading-icon" />
      <label :id="labelId" :for="inputId" :class="{ 'is-required': required }">
        <slot name="label">{{ label }}</slot>
      </label>
      <div
        v-if="prefix || suffix"
        class="input-container"
        :data-bs-prefix="prefix || undefined"
        :data-bs-suffix="suffix || undefined"
      >
        <input
          v-bind="attrs"
          :id="inputId"
          :type="type"
          :class="textInputFieldClasses"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :aria-describedby="describedBy"
          :aria-invalid="invalid"
        />
      </div>
      <input
        v-else
        v-bind="attrs"
        :id="inputId"
        :type="type"
        :class="textInputFieldClasses"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-describedby="describedBy"
        :aria-invalid="invalid"
      />
      <template v-if="loading">
        <svg
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          class="loader"
          aria-hidden="true"
        >
          <circle class="loader-inner" cx="20" cy="20" r="17"></circle>
        </svg>
        <span role="status" class="visually-hidden">Loading</span>
      </template>
      <slot v-else name="trailing-action" />
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
