<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Select",
  options = [],
  helperText = "",
  value = "",
  outlined = false,
  disabled = false,
  required = false,
} = defineProps<{
  id?: string;
  label?: string;
  options?: { label: string; value: string }[];
  helperText?: string;
  value?: string;
  outlined?: boolean;
  disabled?: boolean;
  required?: boolean;
}>();

const attrs = useAttrs();
const generatedId = useId();
const selectId = computed(() => id || `ouds-select-${generatedId}`);
const helperId = computed(() => `${selectId.value}-helper`);
const describedBy = computed(() =>
  helperText ? helperId.value : (attrs["aria-describedby"] as string),
);
const containerClasses = computed(() => [
  "select-input-container",

  { "select-input-container-outlined": outlined },
]);
const selectClasses = computed(() => ["select-input", { "is-required": required }]);
</script>

<template>
  <div :class="selectClasses">
    <div :class="containerClasses">
      <label :for="selectId"
        ><slot name="label">{{ label }}</slot></label
      >
      <select
        v-bind="attrs"
        :id="selectId"
        :aria-describedby="describedBy"
        class="select-input-field"
        :value="value"
        :disabled="disabled"
        :required="required"
      >
        <option value="" disabled selected></option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="helperText" :id="helperId" class="helper-text">{{ helperText }}</p>
  </div>
</template>
