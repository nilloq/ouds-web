export type SelectElement = HTMLElement & {
  id: string;
  label: string;
  helperText: string;
  errorText: string;
  helperLink: string;
  helperLinkHref: string;
  options: { label: string; value: string }[];
  value: string;
  outlined: boolean;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  maxWidth: boolean;
  loading: boolean;
};

export type SelectConstructor = CustomElementConstructor & {
  new (initialProps?: Partial<SelectElement>): SelectElement;
};
