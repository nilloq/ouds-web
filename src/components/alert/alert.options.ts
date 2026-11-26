export const alertVariants = [
  "neutral",
  "accent",
  "positive",
  "info",
  "warning",
  "negative",
] as const;
export type AlertVariant = (typeof alertVariants)[number];
