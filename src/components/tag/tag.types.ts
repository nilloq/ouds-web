export type TagVariant = "neutral" | "accent" | "positive" | "info" | "warning" | "negative";

export type TagElement = HTMLElement & {
  variant: TagVariant;
  size: "medium" | "small";
  muted: boolean;
};

export type TagConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<TagElement>): TagElement;
};
