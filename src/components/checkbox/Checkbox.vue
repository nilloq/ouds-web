<script setup lang="ts">
import { computed, ref, useAttrs, useId, watchEffect } from "vue";

defineOptions({ inheritAttrs: false });

const {
  id,
  label = "Checkbox",
  description = "",
  value = "",
  checked = false,
  disabled = false,
  required = false,
  divider = false,
  indeterminate = false,
} = defineProps<{
  id?: string;
  label?: string;
  description?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  divider?: boolean;
  indeterminate?: boolean;
}>();
const attrs = useAttrs();
const input = ref<HTMLInputElement>();
const generatedId = useId();
const checkboxId = computed(() => id || `ouds-checkbox-${generatedId}`);
const descriptionId = computed(() => `${checkboxId.value}-description`);
const describedBy = computed(() => {
  const ids = [attrs["aria-describedby"] as string | undefined];
  if (description) ids.push(descriptionId.value);
  return ids.filter(Boolean).join(" ") || undefined;
});
const itemClasses = computed(() => ["checkbox-item", { "control-item-divider": divider }]);
watchEffect(() => {
  if (input.value) input.value.indeterminate = indeterminate;
});
</script>

<template>
  <div :class="itemClasses">
    <div class="control-item-assets-container">
      <input
        ref="input"
        v-bind="attrs"
        :id="checkboxId"
        class="control-item-indicator"
        type="checkbox"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        :aria-describedby="describedBy"
      />
    </div>
    <div class="control-item-text-container">
      <label class="control-item-label" :for="checkboxId"
        ><slot name="label">{{ label }}</slot></label
      >
      <p v-if="description" :id="descriptionId" class="control-item-description">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.asset" class="control-item-assets-container">
      <slot name="asset" />
    </div>
  </div>
</template>
