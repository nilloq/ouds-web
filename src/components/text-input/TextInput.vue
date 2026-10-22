<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Text input",
  placeholder = " ",
  helperText = "",
  value = "",
  type = "text",
  outlined = false,
  disabled = false,
  readonly = false,
  required = false,
} = defineProps<{
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  type?: string;
  outlined?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}>();

const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => id || `ouds-text-input-${generatedId}`);
const helperId = computed(() => `${inputId.value}-helper`);
const describedBy = computed(() => {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if (helperText) ids.push(helperId.value);
  return ids.filter(Boolean).join(" ") || undefined;
});
const containerClasses = computed(() => [
  "text-input-container",
  { "text-input-container-outlined": outlined },
]);
</script>

<template>
  <div class="text-input">
    <div :class="containerClasses">
      <slot name="leading" />
      <label :for="inputId" :class="{ 'is-required': required }">
        <slot name="label">{{ label }}</slot>
      </label>
      <input
        v-bind="attrs"
        :id="inputId"
        :type="type"
        class="text-input-field"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-describedby="describedBy"
      />
      <slot name="trailing" />
    </div>
    <p v-if="helperText" :id="helperId" class="helper-text">
      <slot name="helper">{{ helperText }}</slot>
    </p>
  </div>
</template>
