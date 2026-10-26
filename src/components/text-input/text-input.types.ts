export type TextInputElement = HTMLElement & {
  id: string;
  label: string;
  helperText: string;
  errorText: string;
  helperLink: string;
  helperLinkHref: string;
  prefix: string;
  suffix: string;
  value: string;
  type: string;
  outlined: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
};

export type TextInputConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<TextInputElement>): TextInputElement;
};
