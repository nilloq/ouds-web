<script setup lang="ts">
import RadioField from "./Radio.vue";

defineOptions({ inheritAttrs: false });

const { value = "" } = defineProps<{ value?: string }>();
const modelValue = defineModel<string>({ default: "" });
const emit = defineEmits<{
  change: [event: Event];
}>();

function updateValue(event: Event): void {
  modelValue.value = (event.target as HTMLInputElement).value;
  emit("change", event);
}
</script>

<template>
  <RadioField v-bind="$attrs" :value="value" :checked="modelValue === value" @change="updateValue">
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots.asset" #asset><slot name="asset" /></template>
    <template v-if="$slots['extra-label']" #extra-label><slot name="extra-label" /></template>
    <template v-if="$slots.description" #description><slot name="description" /></template>
  </RadioField>
</template>
