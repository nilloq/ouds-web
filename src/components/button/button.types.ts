export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "default" | "strong" | "brand" | "minimal" | "negative";
export type ButtonSize = "medium" | "small";

export type ButtonElement = HTMLElement & {
  type: ButtonType;
  variant: ButtonVariant;
  size: ButtonSize;
  iconOnly: boolean;
  disabled: boolean;
  loading: boolean;
};

export type ButtonConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<ButtonElement>): ButtonElement;
};
