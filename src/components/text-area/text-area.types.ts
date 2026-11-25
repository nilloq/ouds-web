export type TextAreaElement = HTMLElement & {
  id: string;
  label: string;
  placeholder: string;
  helperText: string;
  errorText: string;
  helperLink: string;
  helperLinkHref: string;
  value: string;
  outlined: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
  maxWidth: boolean;
};

export type TextAreaConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<TextAreaElement>): TextAreaElement;
};
