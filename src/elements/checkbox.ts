import { defineCustomElement } from "vue";
import OudsCheckboxComponent from "../components/checkbox/Checkbox.vue";
import type { CheckboxConstructor } from "../components/checkbox/checkbox.types.js";

export type {
  CheckboxConstructor,
  CheckboxElement,
} from "../components/checkbox/checkbox.types.js";

export const OudsCheckbox = defineCustomElement(OudsCheckboxComponent, {
  shadowRoot: false,
}) as unknown as CheckboxConstructor;

export function defineOudsCheckbox(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-checkbox")) {
    customElements.define("ouds-checkbox", OudsCheckbox);
  }
}
