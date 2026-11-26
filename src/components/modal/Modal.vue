<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useHost,
  useId,
  watch,
} from "vue";
import { modalElementIdKey } from "./modal.context.js";
import { useControlItemSlots } from "../shared/control-item-slots.js";
import type { ModalType, ModalSize, ModalVariant, ModalHeadingLevel } from "./modal.types.js";

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    open?: boolean;
    label?: string;
    description?: string;
    subtitle?: string;
    headingLevel?: ModalHeadingLevel;
    type?: ModalType;
    size?: ModalSize;
    variant?: ModalVariant;
    iconLabel?: string;
    fixedHeight?: boolean;
    nonBlurred?: boolean;
    stickyActions?: boolean;
    horizontalActions?: boolean;
    dismissible?: boolean;
    closeLabel?: string;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
  }>(),
  {
    open: false,
    label: "Dialog",
    description: "",
    subtitle: "",
    headingLevel: "h2",
    type: "dialog",
    size: "default",
    variant: "neutral",
    iconLabel: "",
    fixedHeight: false,
    nonBlurred: false,
    stickyActions: false,
    horizontalActions: false,
    dismissible: true,
    closeLabel: "Close dialog",
    closeOnEscape: true,
    closeOnBackdrop: false,
  },
);
const emit = defineEmits<{
  "update:open": [open: boolean];
  show: [];
  close: [returnValue: string];
  cancel: [event: Event];
}>();
const attrs = useAttrs();
const elementId = inject(modalElementIdKey, undefined);
const host = elementId ? useHost() : undefined;
const hasSlot = useControlItemSlots(Boolean(elementId));
const generatedId = useId();
const dialog = ref<HTMLDialogElement>();
const titleId = computed(() => `${elementId || `ouds-modal-${generatedId}`}-title`);
const descriptionId = computed(() => `${elementId || `ouds-modal-${generatedId}`}-description`);
const statusLabel = computed(
  () =>
    props.iconLabel ||
    {
      neutral: "",
      negative: "Error",
      positive: "Success",
      info: "Information",
      warning: "Warning",
    }[props.variant],
);
function stickyFooter() {
  return (
    props.stickyActions &&
    Boolean(props.description || hasSlot("description") || hasSlot("default"))
  );
}
let active = false;
let backdropPointerDown = false;

function syncOpen(value: boolean) {
  if (host) Reflect.set(host, "open", value);
  emit("update:open", value);
}
function showModal() {
  if (!dialog.value || dialog.value.open) return;
  if (active) finishClose();
  dialog.value.returnValue = "";
  dialog.value.showModal();
  active = true;
  syncOpen(true);
  emit("show");
}
function finishClose() {
  if (!active || !dialog.value || dialog.value.open) return;
  active = false;
  syncOpen(false);
  emit("close", dialog.value.returnValue);
}
function close(returnValue?: string) {
  if (!dialog.value?.open) return;
  dialog.value.close(returnValue);
  finishClose();
}
function cancel(event: Event) {
  if (!props.closeOnEscape) event.preventDefault();
  if (host) {
    // Vue custom-element emits are not cancellable; bridge this native event explicitly.
    const forwarded = new CustomEvent("cancel", { detail: [event], cancelable: true });
    if (!host.dispatchEvent(forwarded)) event.preventDefault();
  } else emit("cancel", event);
}
function outside(event: MouseEvent) {
  const el = dialog.value;
  if (!el || event.target !== el) return false;
  const rect = el.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}
function backdropClick(event: MouseEvent) {
  if (props.closeOnBackdrop && backdropPointerDown && outside(event)) close();
  backdropPointerDown = false;
}
watch(
  () => props.open,
  (value) => {
    if (value) showModal();
    else close();
  },
  { flush: "post" },
);
onMounted(() => {
  if (props.open) showModal();
});
onBeforeUnmount(() => {
  // Release the top layer without emitting application events during teardown.
  active = false;
  if (dialog.value?.open) dialog.value.close();
});
defineExpose({ showModal, close });
</script>

<template>
  <dialog
    ref="dialog"
    v-bind="attrs"
    :id="
      elementId
        ? `${attrs.id || elementId}-dialog`
        : (attrs.id as string | undefined) || `ouds-modal-${generatedId}`
    "
    class="modal-base"
    :class="[
      type === 'fullscreen' ? 'modal-fullscreen-dialog' : 'modal-dialog',
      {
        'modal-small': type === 'dialog' && size === 'small',
        'modal-fixed-height': type === 'dialog' && fixedHeight,
        'modal-non-blurred': type === 'dialog' && nonBlurred,
      },
    ]"
    :aria-labelledby="(attrs['aria-labelledby'] as string) || titleId"
    :aria-describedby="
      (attrs['aria-describedby'] as string) ||
      (description || hasSlot('description') ? descriptionId : undefined)
    "
    @cancel="cancel"
    @close="finishClose"
    @pointerdown="backdropPointerDown = outside($event)"
    @click="backdropClick"
  >
    <div class="modal-header">
      <slot name="previous" />
      <p v-if="subtitle || hasSlot('subtitle')" class="modal-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
      <component :is="headingLevel" :id="titleId" class="modal-title">
        <span
          v-if="variant !== 'neutral' || hasSlot('icon')"
          class="modal-icon"
          :class="variant !== 'neutral' && `modal-icon-${variant}`"
          :aria-hidden="statusLabel ? undefined : true"
        >
          <span v-if="statusLabel" class="visually-hidden">{{ statusLabel }}</span>
          <slot v-if="variant === 'neutral'" name="icon" />
        </span>
        <slot name="title">{{ label }}</slot>
      </component>
      <button
        v-if="dismissible"
        type="button"
        class="btn btn-close"
        :aria-label="closeLabel"
        @click="close()"
      />
    </div>
    <div
      class="modal-body"
      :class="{ 'pt-large': !description && !hasSlot('description') && hasSlot('default') }"
    >
      <p v-if="description || hasSlot('description')" :id="descriptionId">
        <slot name="description">{{ description }}</slot>
      </p>
      <slot />
      <div
        v-if="hasSlot('actions') && !stickyFooter()"
        class="modal-footer"
        :class="{ 'modal-footer-horizontal': horizontalActions }"
      >
        <slot name="actions" :close="close" />
      </div>
    </div>
    <div
      v-if="hasSlot('actions') && stickyFooter()"
      class="modal-footer"
      :class="{ 'modal-footer-horizontal': horizontalActions }"
    >
      <slot name="actions" :close="close" />
    </div>
  </dialog>
</template>
