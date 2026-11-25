export type SwitchElement = HTMLElement & {
  id: string;
  label: string;
  description: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  divider: boolean;
  readonly: boolean;
  invalid: boolean;
  reverse: boolean;
  maxWidth: boolean;
};

export type SwitchConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<SwitchElement>): SwitchElement;
};
