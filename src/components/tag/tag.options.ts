export const tagVariants = [
  "neutral",
  "accent",
  "positive",
  "info",
  "warning",
  "negative",
  "categorical-1",
  "categorical-2",
  "categorical-3",
  "categorical-4",
  "categorical-5",
] as const;
export const tagSizes = ["medium", "small"] as const;

export type TagVariant = (typeof tagVariants)[number];
export type TagSize = (typeof tagSizes)[number];
