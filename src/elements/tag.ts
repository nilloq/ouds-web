import { defineCustomElement } from "vue";
import OudsTagComponent from "../components/tag/Tag.vue";
import type { TagConstructor } from "../components/tag/tag.types.js";

export type { TagConstructor, TagElement, TagVariant } from "../components/tag/tag.types.js";

export const OudsTag = defineCustomElement(OudsTagComponent, {
  shadowRoot: false,
}) as unknown as TagConstructor;

export function defineOudsTag(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-tag")) {
    customElements.define("ouds-tag", OudsTag);
  }
}

export * from "../components/tag/tag.options.js";
