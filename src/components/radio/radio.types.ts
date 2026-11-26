export type RadioElement = HTMLElement & {
  id: string;
  label: string;
  description: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  divider: boolean;
  name: string;
  outlined: boolean;
  extraLabel: string;
  readonly: boolean;
  invalid: boolean;
  reverse: boolean;
  maxWidth: boolean;
};

export type RadioConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<RadioElement>): RadioElement;
};
