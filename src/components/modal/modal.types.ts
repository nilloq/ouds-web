import type { ModalType, ModalSize, ModalVariant, ModalHeadingLevel } from "./modal.options.js";
export type * from "./modal.options.js";

export interface ModalMethods {
  showModal(): void;
  close(returnValue?: string): void;
}
export type ModalElement = HTMLElement &
  ModalMethods & {
    open: boolean;
    label: string;
    description: string;
    subtitle: string;
    headingLevel: ModalHeadingLevel;
    type: ModalType;
    size: ModalSize;
    variant: ModalVariant;
    iconLabel: string;
    fixedHeight: boolean;
    nonBlurred: boolean;
    stickyActions: boolean;
    horizontalActions: boolean;
    dismissible: boolean;
    closeLabel: string;
    closeOnEscape: boolean;
    closeOnBackdrop: boolean;
  };
export type ModalConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<ModalElement>): ModalElement;
};
