import { defineCustomElement } from "vue";
import OudsCheckboxComponent from "../components/checkbox/Checkbox.vue";
import type { CheckboxConstructor } from "../components/checkbox/checkbox.types.js";
import { checkboxElementIdKey } from "../components/checkbox/checkbox.context.js";

export type {
  CheckboxConstructor,
  CheckboxElement,
} from "../components/checkbox/checkbox.types.js";

let nextElementId = 0;

export const OudsCheckbox = defineCustomElement(OudsCheckboxComponent, {
  shadowRoot: false,
  configureApp(app) {
    app.provide(checkboxElementIdKey, `ouds-checkbox-element-${nextElementId++}`);
  },
}) as unknown as CheckboxConstructor;

export function defineOudsCheckbox(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-checkbox")) {
    customElements.define("ouds-checkbox", OudsCheckbox);
  }
}
