<script setup lang="ts">
import { toRef, computed, useAttrs, useId, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const {
  label = "Text input",
  placeholder = " ",
  helperText = "",
  errorText = "",
  helperLink = "",
  helperLinkHref = "",
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
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  helperLink?: string;
  helperLinkHref?: string;
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
const prefix = toRef(() => (attrs.prefix as string | undefined) || "");
function inputAttrs() {
  const { prefix: _prefix, ...forwarded } = attrs;
  return forwarded;
}
const id = toRef(() => attrs.id as string | undefined);
const slots = useSlots();
const generatedId = useId();
const inputId = toRef(() => id.value || `ouds-text-input-${generatedId}`);
const helperId = toRef(() => `${inputId.value}-helper`);
const errorId = toRef(() => `${inputId.value}-error`);
const labelId = toRef(() => `${inputId.value}-label`);
const helperLinkId = toRef(() => `${inputId.value}-helper-link`);
const loadingId = toRef(() => `${inputId.value}-loading`);
// Attributes and slot presence can change between renders without invalidating a computed value.
function describedBy() {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if ((helperText || slots["helper-text"]) && !invalid) ids.push(helperId.value);
  if (invalid && (errorText || slots["error-text"])) ids.push(errorId.value);
  if (helperLinkHref && (helperLink || slots["helper-link"])) {
    ids.push(helperLinkId.value);
  }
  if (loading) ids.push(loadingId.value);
  return ids.filter(Boolean).join(" ") || undefined;
}
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
          v-bind="inputAttrs()"
          :id="inputId"
          :type="type"
          :class="textInputFieldClasses"
          :placeholder="placeholder || ' '"
          :value="value"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :aria-describedby="describedBy()"
          :aria-invalid="invalid"
        />
      </div>
      <input
        v-else
        v-bind="inputAttrs()"
        :id="inputId"
        :type="type"
        :class="textInputFieldClasses"
        :placeholder="placeholder || ' '"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-describedby="describedBy()"
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
        <span :id="loadingId" role="status" class="visually-hidden">Loading</span>
      </template>
      <slot v-else name="trailing-action" :disabled="disabled || readonly" />
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
