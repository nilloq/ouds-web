<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { alertElementKey } from "./alert.context.js";
import { useControlItemSlots } from "../shared/control-item-slots.js";
import type { AlertVariant } from "./alert.types.js";

const {
  variant = "info",
  label = "Alert",
  description = "",
  inline = false,
  dismissible = false,
  closeLabel = "Close alert",
  iconLabel = "",
} = defineProps<{
  variant?: AlertVariant;
  label?: string;
  description?: string;
  inline?: boolean;
  dismissible?: boolean;
  closeLabel?: string;
  iconLabel?: string;
}>();

const emit = defineEmits<{ dismiss: [] }>();
const hasSlot = useControlItemSlots(inject(alertElementKey, false));
const dismissed = ref(false);
const functional = computed(() => ["positive", "info", "warning", "negative"].includes(variant));
function dismiss() {
  dismissed.value = true;
  emit("dismiss");
}
</script>

<template>
  <div
    v-show="!dismissed"
    :class="['alert', { 'alert-message': !inline }, variant !== 'neutral' && `alert-${variant}`]"
  >
    <div v-if="functional || hasSlot('icon')" class="alert-icon">
      <span v-if="iconLabel" class="visually-hidden">{{ iconLabel }}</span>
      <slot v-if="!functional" name="icon" />
    </div>
    <p v-if="inline" class="alert-label">
      <span v-if="!functional && !hasSlot('icon') && iconLabel" class="visually-hidden">{{
        iconLabel + " "
      }}</span
      ><slot v-if="hasSlot('default')">{{ label }}</slot
      ><template v-else>{{ label }}</template>
    </p>
    <div v-else class="alert-container">
      <div class="alert-text-container">
        <p class="alert-label">
          <span v-if="!functional && !hasSlot('icon') && iconLabel" class="visually-hidden">{{
            iconLabel + " "
          }}</span
          ><slot v-if="hasSlot('default')">{{ label }}</slot
          ><template v-else>{{ label }}</template>
        </p>
        <p v-if="description || hasSlot('description')">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
      <slot name="action" />
    </div>
    <div v-if="!inline && dismissible" class="alert-action-container">
      <div class="alert-close-container">
        <button type="button" class="btn-close" :aria-label="closeLabel" @click="dismiss" />
      </div>
    </div>
  </div>
</template>
