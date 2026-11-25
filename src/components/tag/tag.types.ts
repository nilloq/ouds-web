import type { TagVariant, TagSize } from "./tag.options.js";

export type { TagVariant, TagSize } from "./tag.options.js";

export type TagElement = HTMLElement & {
  variant: TagVariant;
  size: TagSize;
  muted: boolean;
  statusIcon: boolean;
  bullet: boolean;
  disabled: boolean;
  loading: boolean;
};

export type TagConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<TagElement>): TagElement;
};
