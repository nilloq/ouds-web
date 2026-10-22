<script setup lang="ts">
import TextInputField from "./TextInput.vue";

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<string>({ default: "" });
const emit = defineEmits<{
  input: [event: Event];
  change: [event: Event];
}>();

function updateInput(event: Event): void {
  modelValue.value = (event.target as HTMLInputElement).value;
  emit("input", event);
}

function updateChange(event: Event): void {
  modelValue.value = (event.target as HTMLInputElement).value;
  emit("change", event);
}
</script>

<template>
  <TextInputField v-bind="$attrs" :value="modelValue" @input="updateInput" @change="updateChange">
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots.leading" #leading><slot name="leading" /></template>
    <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
    <template v-if="$slots.helper" #helper><slot name="helper" /></template>
  </TextInputField>
</template>
