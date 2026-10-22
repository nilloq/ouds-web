export type SelectElement = HTMLElement & {
  id: string;
  label: string;
  helperText: string;
  value: string;
  outlined: boolean;
  disabled: boolean;
  required: boolean;
};

export type SelectConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<SelectElement>): SelectElement;
};
