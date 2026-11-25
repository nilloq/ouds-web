import { defineCustomElement } from "vue";
import { captureControlItemSlots } from "../components/shared/control-item-slots.js";
import OudsSwitchComponent from "../components/switch/Switch.vue";
import type { SwitchConstructor } from "../components/switch/switch.types.js";
import { switchElementIdKey } from "../components/switch/switch.context.js";

export type { SwitchConstructor, SwitchElement } from "../components/switch/switch.types.js";

let nextElementId = 0;

const SwitchElement = defineCustomElement(OudsSwitchComponent, {
  shadowRoot: false,
  configureApp(app) {
    app.provide(switchElementIdKey, `ouds-switch-element-${nextElementId++}`);
  },
});

export const OudsSwitch = class extends SwitchElement {
  connectedCallback(): void {
    captureControlItemSlots(this);
    super.connectedCallback();
  }
} as unknown as SwitchConstructor;

export function defineOudsSwitch(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-switch")) {
    customElements.define("ouds-switch", OudsSwitch);
  }
}
