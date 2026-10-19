export type OudsButtonVariant = "default" | "strong" | "brand" | "minimal" | "negative";

export type OudsButtonElement = HTMLElement & {
  variant: OudsButtonVariant;
  type: "button" | "submit" | "reset";
  disabled: boolean;
};

export type OudsButtonConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<OudsButtonElement>): OudsButtonElement;
};
