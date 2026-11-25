<script setup lang="ts">
import SwitchField from "./Switch.vue";

defineOptions({ inheritAttrs: false });

const modelValue = defineModel<boolean>({ default: false });
const emit = defineEmits<{
  change: [event: Event];
}>();

function updateValue(event: Event): void {
  modelValue.value = (event.target as HTMLInputElement).checked;
  emit("change", event);
}
</script>

<template>
  <SwitchField v-bind="$attrs" :checked="modelValue" @change="updateValue">
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots.asset" #asset><slot name="asset" /></template>
    <template v-if="$slots.description" #description><slot name="description" /></template>
  </SwitchField>
</template>
