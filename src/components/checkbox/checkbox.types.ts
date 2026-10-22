export type CheckboxElement = HTMLElement & {
  id: string;
  label: string;
  description: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  divider: boolean;
  indeterminate: boolean;
};

export type CheckboxConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<CheckboxElement>): CheckboxElement;
};
