<script setup lang="ts">
import { toRef, computed, inject, useAttrs, useId, type InputHTMLAttributes } from "vue";
import { useControlItemSlots } from "../shared/control-item-slots.js";
import { switchElementIdKey } from "./switch.context.js";

defineOptions({ inheritAttrs: false });

const {
  label = "Switch",
  description = "",
  value = "",
  checked = false,
  disabled = false,
  required = false,
  divider = false,
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
  readonly?: boolean;
  invalid?: boolean;
  reverse?: boolean;
  maxWidth?: boolean;
}>();
const attrs = useAttrs();
const id = toRef(() => attrs.id as string | undefined);
const generatedId = useId();
const elementId = inject(switchElementIdKey, undefined);
const hasSlot = useControlItemSlots(elementId !== undefined);
const switchId = toRef(() => {
  // Light DOM shares its ID namespace with the host and other custom-element apps.
  if (elementId) return `${id.value || elementId}-input`;
  return id.value || `ouds-switch-${generatedId}`;
});
const labelId = toRef(() => `${switchId.value}-label`);
const descriptionId = toRef(() => `${switchId.value}-description`);
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
  "switch-item",
  {
    "control-item-divider": divider,
    "control-item-reverse": reverse,
    "component-max-width": maxWidth,
  },
]);
</script>

<template>
  <div :class="itemClasses">
    <div class="control-item-assets-container">
      <input
        v-if="!readonly"
        v-bind="attrs"
        :id="switchId"
        class="control-item-indicator"
        type="checkbox"
        role="switch"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        :aria-describedby="describedBy()"
        :aria-invalid="invalid || (attrs['aria-invalid'] as InputHTMLAttributes['aria-invalid'])"
      />
      <span
        v-else
        v-bind="attrs"
        :id="switchId"
        class="control-item-indicator"
        role="switch"
        aria-readonly="true"
        aria-disabled="true"
        tabindex="0"
        :aria-checked="checked"
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
        :for="readonly ? undefined : switchId"
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
