import { defineCustomElement } from "vue";
import { captureControlItemSlots } from "../components/shared/control-item-slots.js";
import { alertElementKey } from "../components/alert/alert.context.js";
import OudsAlertComponent from "../components/alert/Alert.vue";
import type { AlertConstructor } from "../components/alert/alert.types.js";

export type {
  AlertConstructor,
  AlertElement,
  AlertVariant,
} from "../components/alert/alert.types.js";
export * from "../components/alert/alert.options.js";

const AlertElement = defineCustomElement(OudsAlertComponent, {
  shadowRoot: false,
  configureApp(app) {
    app.provide(alertElementKey, true);
  },
});

export const OudsAlert = class extends AlertElement {
  connectedCallback(): void {
    captureControlItemSlots(this);
    super.connectedCallback();
  }
} as unknown as AlertConstructor;

export function defineOudsAlert(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-alert")) {
    customElements.define("ouds-alert", OudsAlert);
  }
}
