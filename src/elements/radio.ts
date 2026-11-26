import { defineCustomElement } from "vue";
import { captureControlItemSlots } from "../components/shared/control-item-slots.js";
import OudsRadioComponent from "../components/radio/Radio.vue";
import type { RadioConstructor } from "../components/radio/radio.types.js";
import { radioElementIdKey } from "../components/radio/radio.context.js";

export type { RadioConstructor, RadioElement } from "../components/radio/radio.types.js";

let nextElementId = 0;

const RadioElement = defineCustomElement(OudsRadioComponent, {
  shadowRoot: false,
  configureApp(app) {
    app.provide(radioElementIdKey, `ouds-radio-element-${nextElementId++}`);
  },
});

export const OudsRadio = class extends RadioElement {
  connectedCallback(): void {
    captureControlItemSlots(this);
    super.connectedCallback();
  }
} as unknown as RadioConstructor;

export function defineOudsRadio(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-radio")) {
    customElements.define("ouds-radio", OudsRadio);
  }
}
