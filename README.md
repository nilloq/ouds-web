# @nilloq/ouds-web

Vue components and framework-independent custom elements built from the same Vue source and styled with [OUDS Web 1.5](https://web.unified-design-system.orange.com/orange/docs/1.5/).

## Vue components

Import Vue components from `@nilloq/ouds-web/vue`. These are regular Vue components, so Nuxt can render their native markup during SSR and hydrate it as part of the Vue app.

```vue
<script setup lang="ts">
import { OudsButton, OudsTag } from "@nilloq/ouds-web/vue";
</script>

<template>
  <OudsButton variant="brand">Continue</OudsButton>
  <OudsTag variant="positive">Ready</OudsTag>
</template>
```

For individual imports, use `@nilloq/ouds-web/vue/button` or `@nilloq/ouds-web/vue/tag`. Vue is an optional peer dependency, required only when using this Vue API. Load OUDS Web CSS in the consuming app.

## Button

The package provides `<ouds-button>` as a custom element. It is generated from the same Vue single-file component as the Vue API. Vue is bundled into the custom element build, so consumers do not need to use or install Vue. It renders into the light DOM so the page's OUDS stylesheet styles its native button.

### Install and load OUDS styles

```sh
npm install @nilloq/ouds-web
```

Include the OUDS Web Orange stylesheet in the consuming page. The button element does not load global design-system styles automatically.

```html
<link
  href="https://cdn.jsdelivr.net/npm/@ouds/web-orange@1.5.0/dist/css/ouds-web.min.css"
  rel="stylesheet"
  integrity="sha384-pASwsNEkGwpJibll6DpHIhi7kAiLDGTLmBJ5GVL1ZZe1iAGMLtrNQwksOznxX+gV"
  crossorigin="anonymous"
/>
```

### Use in plain HTML

When using a bundler, import the package once to register `<ouds-button>`:

```js
import "@nilloq/ouds-web";
```

Then use it like any HTML element:

```html
<ouds-button>Default</ouds-button>
<ouds-button variant="brand">Continue</ouds-button>
<ouds-button variant="negative" disabled>Delete</ouds-button>
```

Without a bundler, load the published ES module directly:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@nilloq/ouds-web@0.1.0/dist/index.js"
></script>
```

The root import registers all components. You can also import the explicit custom element API from `@nilloq/ouds-web/components`. To import only one component, use its subpath and call its registration helper:

```ts
import { defineOudsButton, OudsButton } from "@nilloq/ouds-web/button";

defineOudsButton();
```

The subpath exports the `OudsButton` custom-element constructor and types without registering it automatically. `@nilloq/ouds-web/components/button` and `@nilloq/ouds-web/button` are equivalent. The tag equivalents are `@nilloq/ouds-web/components/tag` and `@nilloq/ouds-web/tag`.

Supported `variant` values are `default` (the default), `strong`, `brand`, `minimal`, and `negative`. Unknown values fall back to `default`. The `disabled` attribute disables the native button. `type` accepts `button` (the default), `submit`, or `reset`; unknown values fall back to `button`.

OUDS button classes are `.btn` and `.btn-default`, `.btn-strong`, `.btn-brand`, `.btn-minimal`, or `.btn-negative`. See the [OUDS Web button guidance](https://web.unified-design-system.orange.com/orange/docs/1.5/components/buttons/) for design and accessibility details.

## Tag

`<ouds-tag>` is an informational tag. It renders a native `<span>` with OUDS classes and does not add interaction. The `variant` attribute accepts `neutral` (default), `accent`, `positive`, `info`, `warning`, or `negative`. Functional variants include OUDS's status icon. Set `muted` for the muted appearance or `size="small"` for the smaller size.

```html
<ouds-tag>Category</ouds-tag>
<ouds-tag variant="accent" muted>Featured</ouds-tag>
<ouds-tag variant="warning" size="small">Maintenance</ouds-tag>
```

The tag subpath exports the `OudsTag` custom-element constructor and `defineOudsTag()` registration function. For removable tags, use a separate interactive input-tag component rather than this informational tag. See the [OUDS Web tag examples](https://web.unified-design-system.orange.com/orange/docs/1.5/components/table/) for current variant markup.

## Development

```sh
vp install
vp run check
vp test
vp run build
vp run playground
```

`vp run playground` builds the custom element and starts the Vue demo app in `playground/`.
