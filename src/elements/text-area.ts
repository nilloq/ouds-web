import { defineCustomElement } from "vue";
import OudsTextAreaComponent from "../components/text-area/TextArea.vue";
import type { TextAreaConstructor } from "../components/text-area/text-area.types.js";

export type {
  TextAreaConstructor,
  TextAreaElement,
} from "../components/text-area/text-area.types.js";

export const OudsTextArea = defineCustomElement(OudsTextAreaComponent, {
  shadowRoot: false,
}) as unknown as TextAreaConstructor;

export function defineOudsTextArea(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-text-area")) {
    customElements.define("ouds-text-area", OudsTextArea);
  }
}
