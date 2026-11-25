import { defineCustomElement } from "vue";
import OudsSelectComponent from "../components/select/Select.vue";
import type { SelectConstructor } from "../components/select/select.types.js";

export type { SelectConstructor, SelectElement } from "../components/select/select.types.js";

const SelectElement = defineCustomElement(OudsSelectComponent, {
  shadowRoot: false,
});

export const OudsSelect = class extends SelectElement {
  connectedCallback(): void {
    // Vue's light-DOM slots treat comments and whitespace as supplied content,
    // suppressing the options fallback even when no options were slotted.
    for (const node of Array.from(this.childNodes)) {
      if (node.nodeType === 8 || (node.nodeType === 3 && !node.textContent?.trim())) {
        node.remove();
      }
    }
    super.connectedCallback();
  }
} as unknown as SelectConstructor;

export function defineOudsSelect(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-select")) {
    customElements.define("ouds-select", OudsSelect);
  }
}
