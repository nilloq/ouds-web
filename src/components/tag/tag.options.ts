export const tagVariants = [
  "neutral",
  "accent",
  "positive",
  "info",
  "warning",
  "negative",
] as const;
export const tagSizes = ["medium", "small"] as const;

export type TagVariant = (typeof tagVariants)[number];
export type TagSize = (typeof tagSizes)[number];
