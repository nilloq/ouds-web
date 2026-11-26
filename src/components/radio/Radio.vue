<script setup lang="ts">
import { toRef, computed, inject, useAttrs, useId, type InputHTMLAttributes } from "vue";
import { useControlItemSlots } from "../shared/control-item-slots.js";
import { radioElementIdKey } from "./radio.context.js";

defineOptions({ inheritAttrs: false });

const {
  label = "Radio",
  description = "",
  value = "",
  checked = false,
  disabled = false,
  required = false,
  divider = false,
  outlined = false,
  extraLabel = "",
  name = "",
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
  outlined?: boolean;
  extraLabel?: string;
  name?: string;
  readonly?: boolean;
  invalid?: boolean;
  reverse?: boolean;
  maxWidth?: boolean;
}>();
const attrs = useAttrs();
const id = toRef(() => attrs.id as string | undefined);
const generatedId = useId();
const elementId = inject(radioElementIdKey, undefined);
const hasSlot = useControlItemSlots(elementId !== undefined);
const radioId = toRef(() => {
  // Light DOM shares its ID namespace with the host and other custom-element apps.
  if (elementId) return `${id.value || elementId}-input`;
  return id.value || `ouds-radio-${generatedId}`;
});
const labelId = toRef(() => `${radioId.value}-label`);
const extraLabelId = toRef(() => `${radioId.value}-extra-label`);
const descriptionId = toRef(() => `${radioId.value}-description`);
// Read parent attributes and slot presence on each render.
function describedBy() {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if (extraLabel || hasSlot("extra-label")) ids.push(extraLabelId.value);
  if (description || hasSlot("description")) ids.push(descriptionId.value);
  return ids.filter(Boolean).join(" ") || undefined;
}
function labelledBy() {
  return [attrs["aria-labelledby"], labelId.value].filter(Boolean).join(" ");
}
const itemClasses = computed(() => [
  "radio-button-item",
  {
    "control-item-divider": divider,
    "radio-button-item-outlined": outlined,
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
        :id="radioId"
        class="control-item-indicator"
        type="radio"
        :name="name"
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
        :id="radioId"
        class="control-item-indicator"
        role="radio"
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
        :for="readonly ? undefined : radioId"
        ><slot name="label">{{ label }}</slot></component
      >
      <p
        v-if="extraLabel || hasSlot('extra-label')"
        :id="extraLabelId"
        class="radio-button-extra-label"
      >
        <slot name="extra-label">{{ extraLabel }}</slot>
      </p>
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
