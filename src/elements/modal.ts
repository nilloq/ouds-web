import { defineCustomElement } from "vue";
import ModalComponent from "../components/modal/Modal.vue";
import { modalElementIdKey } from "../components/modal/modal.context.js";
import { captureControlItemSlots } from "../components/shared/control-item-slots.js";
import type { ModalConstructor } from "../components/modal/modal.types.js";
export type * from "../components/modal/modal.types.js";
export * from "../components/modal/modal.options.js";
let nextElementId = 0;
const ModalElement = defineCustomElement(ModalComponent, {
  shadowRoot: false,
  configureApp(app) {
    app.provide(modalElementIdKey, `ouds-modal-element-${nextElementId++}`);
  },
});
export const OudsModal = class extends ModalElement {
  connectedCallback(): void {
    captureControlItemSlots(this);
    super.connectedCallback();
  }
} as unknown as ModalConstructor;
export function defineOudsModal(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-modal")) customElements.define("ouds-modal", OudsModal);
}
