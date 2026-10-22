export type TextInputElement = HTMLElement & {
  id: string;
  label: string;
  helperText: string;
  value: string;
  type: string;
  outlined: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
};

export type TextInputConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<TextInputElement>): TextInputElement;
};
