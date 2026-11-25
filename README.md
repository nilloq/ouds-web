# @nilloq/ouds-web

OUDS Web 1.6.0 components available as Vue components and framework-independent Web Components (custom elements). Both APIs provide **Badge**, **Button**, **Tag**, **Checkbox**, **Switch**, **Select**, **Text Input**, and **Text Area**. The playground demonstrates the components.

## Vue components

Import components from `@nilloq/ouds-web/vue` and use them in your Vue templates. These are regular Vue components and support server-side rendering. For example:

```vue
<script setup lang="ts">
import { OudsButton } from "@nilloq/ouds-web/vue";
</script>

<template>
  <OudsButton>Continue</OudsButton>
</template>
```

Use the same pattern for the other components by importing their `Ouds…` component from the Vue entry point. For individual imports, use the matching subpath, such as `@nilloq/ouds-web/vue/button` or `@nilloq/ouds-web/vue/select`. Vue is an optional peer dependency, required only when using this API. Load OUDS Web CSS in the consuming app.

## Web components (custom elements)

Custom elements can be used without a framework. They render in the light DOM so the page's OUDS stylesheet can style their native HTML. Vue is bundled into the custom element build, so consumers do not need to install or use Vue.

Install the package:

```sh
npm install @nilloq/ouds-web
```

Include the OUDS Web Orange stylesheet in the consuming page. The components do not load global design-system styles automatically.

```html
<link
  href="https://cdn.jsdelivr.net/npm/@ouds/web-orange@1.6.0/dist/css/ouds-web.min.css"
  rel="stylesheet"
  integrity="sha384-/CYsyb9K6r8k5oSHG3szNxLYPR1OclHp84CIR093c9+junu5Wt5IWbhIweVxLGUZ"
  crossorigin="anonymous"
/>
```

When using a bundler, import the package once to register all custom elements. Then use the matching HTML tag. For example:

```js
import "@nilloq/ouds-web";
```

```html
<ouds-button>Continue</ouds-button>
```

The same pattern applies to the other elements: `<ouds-badge>`, `<ouds-tag>`, `<ouds-checkbox>`, `<ouds-switch>`, `<ouds-select>`, `<ouds-text-input>`, and `<ouds-text-area>`. Without a bundler, load the published ES module directly:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@nilloq/ouds-web@{{libraryVersion}}/dist/index.js"
></script>
```

To register only one custom element, import its subpath and call its `defineOuds…()` helper. For example:

```ts
import { defineOudsButton } from "@nilloq/ouds-web/button";

defineOudsButton();
```

The subpath exports the component constructor and types without registering it automatically. The same subpath pattern is available for `badge`, `tag`, `checkbox`, `switch`, `select`, `text-input`, and `text-area`; the corresponding `components/…` subpaths are equivalent.

## Development

```sh
vp install
vp run check
vp test
vp run build
vp run playground
```

`vp run playground` builds the custom element and starts the Vue demo app in `playground/`.
