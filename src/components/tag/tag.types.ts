export type OudsTagVariant = "neutral" | "accent" | "positive" | "info" | "warning" | "negative";

export type OudsTagElement = HTMLElement & {
  variant: OudsTagVariant;
  size: "medium" | "small";
  muted: boolean;
};

export type OudsTagConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<OudsTagElement>): OudsTagElement;
};
