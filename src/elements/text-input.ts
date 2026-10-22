import { defineCustomElement } from "vue";
import OudsTextInputComponent from "../components/text-input/TextInput.vue";
import type { TextInputConstructor } from "../components/text-input/text-input.types.js";

export type {
  TextInputConstructor,
  TextInputElement,
} from "../components/text-input/text-input.types.js";

export const OudsTextInput = defineCustomElement(OudsTextInputComponent, {
  shadowRoot: false,
}) as unknown as TextInputConstructor;

export function defineOudsTextInput(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-text-input")) {
    customElements.define("ouds-text-input", OudsTextInput);
  }
}
