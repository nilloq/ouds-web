import { defineCustomElement } from "vue";
import OudsBadgeComponent from "../components/badge/Badge.vue";
import type { BadgeConstructor } from "../components/badge/badge.types.js";

export type {
  BadgeConstructor,
  BadgeElement,
  BadgeVariant,
  BadgeSize,
} from "../components/badge/badge.types.js";

export const OudsBadge = defineCustomElement(OudsBadgeComponent, {
  shadowRoot: false,
}) as unknown as BadgeConstructor;

export function defineOudsBadge(): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("ouds-badge")) {
    customElements.define("ouds-badge", OudsBadge);
  }
}

export * from "../components/badge/badge.options.js";
