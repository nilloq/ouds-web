export const modalTypes = ["dialog", "fullscreen"] as const;
export type ModalType = (typeof modalTypes)[number];
export const modalSizes = ["default", "small"] as const;
export type ModalSize = (typeof modalSizes)[number];
export const modalVariants = ["neutral", "negative", "positive", "info", "warning"] as const;
export type ModalVariant = (typeof modalVariants)[number];
export type ModalHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
