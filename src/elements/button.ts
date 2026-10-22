import { defineCustomElement } from "vue";
import OudsButtonComponent from "../components/button/Button.vue";
import type { ButtonConstructor } from "../components/button/button.types.js";

export type {
  ButtonConstructor,
  ButtonElement,
  ButtonVariant,
} from "../components/button/button.types.js";

export const OudsButton = defineCustomElement(OudsButtonComponent, {
  shadowRoot: false,
}) as unknown as ButtonConstructor;

export function defineOudsButton(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-button")) {
    customElements.define("ouds-button", OudsButton);
  }
}
