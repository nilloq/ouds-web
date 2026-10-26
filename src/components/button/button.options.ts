export const buttonVariants = ["default", "strong", "brand", "minimal", "negative"] as const;
export const buttonSizes = ["medium", "small"] as const;
export const buttonTypes = ["button", "submit", "reset"] as const;
export const buttonNavigations = ["previous", "next"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];
export type ButtonType = (typeof buttonTypes)[number];
export type ButtonNavigation = (typeof buttonNavigations)[number];
