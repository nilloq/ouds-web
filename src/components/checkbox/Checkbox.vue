<script setup lang="ts">
import {
  toRef,
  computed,
  inject,
  ref,
  useAttrs,
  useId,
  watchEffect,
  type InputHTMLAttributes,
} from "vue";
import { useControlItemSlots } from "../shared/control-item-slots.js";
import { checkboxElementIdKey } from "./checkbox.context.js";

defineOptions({ inheritAttrs: false });

const {
  label = "Checkbox",
  description = "",
  value = "",
  checked = false,
  disabled = false,
  required = false,
  divider = false,
  indeterminate = false,
  readonly = false,
  invalid = false,
  reverse = false,
  maxWidth = false,
} = defineProps<{
  label?: string;
  description?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  divider?: boolean;
  indeterminate?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  reverse?: boolean;
  maxWidth?: boolean;
}>();
const attrs = useAttrs();
const id = toRef(() => attrs.id as string | undefined);
const input = ref<HTMLInputElement | HTMLSpanElement>();
const generatedId = useId();
const elementId = inject(checkboxElementIdKey, undefined);
const hasSlot = useControlItemSlots(elementId !== undefined);
const checkboxId = toRef(() => {
  // Light DOM shares its ID namespace with the host and other custom-element apps.
  if (elementId) return `${id.value || elementId}-input`;
  return id.value || `ouds-checkbox-${generatedId}`;
});
const labelId = toRef(() => `${checkboxId.value}-label`);
const descriptionId = toRef(() => `${checkboxId.value}-description`);
// Read parent attributes and slot presence on each render.
function describedBy() {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if (description || hasSlot("description")) ids.push(descriptionId.value);
  return ids.filter(Boolean).join(" ") || undefined;
}
function labelledBy() {
  return [attrs["aria-labelledby"], labelId.value].filter(Boolean).join(" ");
}
const itemClasses = computed(() => [
  "checkbox-item",
  {
    "control-item-divider": divider,
    "control-item-reverse": reverse,
    "component-max-width": maxWidth,
  },
]);
watchEffect(() => {
  if (input.value && "indeterminate" in input.value) input.value.indeterminate = indeterminate;
});
</script>

<template>
  <div :class="itemClasses">
    <div class="control-item-assets-container">
      <input
        v-if="!readonly"
        ref="input"
        v-bind="attrs"
        :id="checkboxId"
        class="control-item-indicator"
        type="checkbox"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        :aria-describedby="describedBy()"
        :aria-invalid="invalid || (attrs['aria-invalid'] as InputHTMLAttributes['aria-invalid'])"
      />
      <span
        v-else
        ref="input"
        v-bind="attrs"
        :id="checkboxId"
        class="control-item-indicator"
        role="checkbox"
        aria-readonly="true"
        aria-disabled="true"
        tabindex="0"
        :aria-checked="indeterminate ? 'mixed' : checked"
        :aria-labelledby="labelledBy()"
        :aria-describedby="describedBy()"
        :aria-invalid="invalid || (attrs['aria-invalid'] as InputHTMLAttributes['aria-invalid'])"
      />
    </div>
    <div class="control-item-text-container">
      <component
        :is="readonly ? 'span' : 'label'"
        :id="labelId"
        class="control-item-label"
        :class="{ 'is-required': required }"
        :for="readonly ? undefined : checkboxId"
        ><slot name="label">{{ label }}</slot></component
      >
      <p
        v-if="description || hasSlot('description')"
        :id="descriptionId"
        class="control-item-description"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div v-if="hasSlot('asset')" class="control-item-assets-container">
      <slot name="asset" />
    </div>
  </div>
</template>
