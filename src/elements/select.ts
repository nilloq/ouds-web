import { defineCustomElement } from "vue";
import OudsSelectComponent from "../components/select/Select.vue";
import type { SelectConstructor } from "../components/select/select.types.js";

export type { SelectConstructor, SelectElement } from "../components/select/select.types.js";

export const OudsSelect = defineCustomElement(OudsSelectComponent, {
  shadowRoot: false,
}) as unknown as SelectConstructor;

export function defineOudsSelect(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-select")) {
    customElements.define("ouds-select", OudsSelect);
  }
}
