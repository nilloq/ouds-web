<script setup lang="ts">
import TextAreaField from "./TextArea.vue";

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string>({ default: "" });
const emit = defineEmits<{
  input: [event: Event];
  change: [event: Event];
}>();

function updateInput(event: Event): void {
  modelValue.value = (event.target as HTMLTextAreaElement).value;
  emit("input", event);
}

function updateChange(event: Event): void {
  modelValue.value = (event.target as HTMLTextAreaElement).value;
  emit("change", event);
}
</script>

<template>
  <TextAreaField v-bind="$attrs" :value="modelValue" @input="updateInput" @change="updateChange">
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots['helper-text']" #helper-text><slot name="helper-text" /></template>
    <template v-if="$slots['error-text']" #error-text><slot name="error-text" /></template>
    <template v-if="$slots['helper-link']" #helper-link><slot name="helper-link" /></template>
  </TextAreaField>
</template>
