import type { ButtonType, ButtonVariant, ButtonSize, ButtonNavigation } from "./button.options.js";

export type { ButtonType, ButtonVariant, ButtonSize, ButtonNavigation } from "./button.options.js";

export type ButtonElement = HTMLElement & {
  type: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  iconOnly: boolean;
  disabled: boolean;
  loading: boolean;
  navigation?: ButtonNavigation;
};

export type ButtonConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<ButtonElement>): ButtonElement;
};
