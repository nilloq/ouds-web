import type { AlertVariant } from "./alert.options.js";
export type { AlertVariant } from "./alert.options.js";

export type AlertElement = HTMLElement & {
  variant: AlertVariant;
  label: string;
  description: string;
  inline: boolean;
  dismissible: boolean;
  closeLabel: string;
  iconLabel: string;
};

export type AlertConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<AlertElement>): AlertElement;
};
