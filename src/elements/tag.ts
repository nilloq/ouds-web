import { defineCustomElement } from "vue";
import OudsTagComponent from "../components/tag/Tag.vue";
import type { OudsTagConstructor } from "../components/tag/tag.types.js";

export type {
  OudsTagConstructor,
  OudsTagElement,
  OudsTagVariant,
} from "../components/tag/tag.types.js";

export const OudsTag = defineCustomElement(OudsTagComponent, {
  shadowRoot: false,
}) as unknown as OudsTagConstructor;

export function defineOudsTag(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-tag")) {
    customElements.define("ouds-tag", OudsTag);
  }
}
