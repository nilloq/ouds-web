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
    <slot />
  </SelectField>
</template>
