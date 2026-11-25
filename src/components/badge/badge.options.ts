export const badgeVariants = [
  "negative",
  "neutral",
  "accent",
  "positive",
  "info",
  "warning",
] as const;
export const badgeSizes = ["xsmall", "small", "medium", "large"] as const;

export type BadgeVariant = (typeof badgeVariants)[number];
export type BadgeSize = (typeof badgeSizes)[number];
