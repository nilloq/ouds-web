import type { BadgeVariant, BadgeSize } from "./badge.options.js";

export type { BadgeVariant, BadgeSize } from "./badge.options.js";

export type BadgeElement = HTMLElement & {
  variant: BadgeVariant;
  size: BadgeSize;
  count?: string | number;
  label: string;
  statusIcon: boolean;
  disabled: boolean;
};

export type BadgeConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<BadgeElement>): BadgeElement;
};
