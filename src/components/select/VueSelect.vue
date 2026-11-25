<script setup lang="ts">
import SelectField from "./Select.vue";

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string>({ default: "" });
const emit = defineEmits<{
  change: [event: Event];
}>();

function updateValue(event: Event): void {
  modelValue.value = (event.target as HTMLSelectElement).value;
  emit("change", event);
}
</script>

<template>
  <SelectField v-bind="$attrs" :value="modelValue" @change="updateValue">
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots['leading-icon']" #leading-icon><slot name="leading-icon" /></template>
    <template v-if="$slots['helper-text']" #helper-text><slot name="helper-text" /></template>
    <template v-if="$slots['error-text']" #error-text><slot name="error-text" /></template>
    <template v-if="$slots['helper-link']" #helper-link><slot name="helper-link" /></template>
    <template v-if="$slots.default" #default><slot /></template>
  </SelectField>
</template>
