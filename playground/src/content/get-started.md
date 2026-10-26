# Get started with OUDS Web components

OUDS Web provides **Button**, **Tag**, **Checkbox**, **Select**, and **Text Input** components. You can use them in a Vue app or as standard HTML custom elements. Choose the approach that fits your app; both need the OUDS Web stylesheet for their design-system styles.

## Add the OUDS Web stylesheet

Add this link to the `<head>` of your app's HTML page. It loads the OUDS Web Orange styles used by the examples below. The component package does not load this stylesheet for you.

```html
<link
  href="https://cdn.jsdelivr.net/npm/@ouds/web-orange@1.5.0/dist/css/ouds-web.min.css"
  rel="stylesheet"
  integrity="sha384-pASwsNEkGwpJibll6DpHIhi7kAiLDGTLmBJ5GVL1ZZe1iAGMLtrNQwksOznxX+gV"
  crossorigin="anonymous"
/>
```

## Use the components in a Vue app

Install the package in your Vue project:

```sh
npm install @nilloq/ouds-web
```

Vue is a peer dependency for the Vue component API. Most Vue projects already have it installed. If yours does not, install both packages:

```sh
npm install vue @nilloq/ouds-web
```

Import a component in a Vue single-file component, then use it in the template. Imported Vue components are ready to use; you do not need to register them globally.

```vue
<script setup lang="ts">
import { OudsButton } from "@nilloq/ouds-web/vue";
</script>

<template>
  <OudsButton>Continue</OudsButton>
</template>
```

The package also exports `OudsTag`, `OudsCheckbox`, `OudsSelect`, and `OudsTextInput` from `@nilloq/ouds-web/vue`. To import just one component, use its subpath, such as `@nilloq/ouds-web/vue/button`.

## Use the components as standalone web components

Web components are custom HTML elements, so you can use them without Vue or another UI framework. Install the package in your project:

```sh
npm install @nilloq/ouds-web
```

In a project with a JavaScript bundler, import the package once to register all five custom elements:

```js
import "@nilloq/ouds-web";
```

After registration, use the elements in your HTML:

```html
<ouds-button>Continue</ouds-button>
<ouds-tag>New</ouds-tag>
<ouds-checkbox label="I agree"></ouds-checkbox>
<ouds-select label="Country"></ouds-select>
<ouds-text-input label="Email"></ouds-text-input>
```

`ouds-select` takes its choices through an `options` property. Set it from JavaScript after the element is registered:

```js
const countrySelect = document.querySelector("ouds-select");
countrySelect.options = [
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
];
```

You can also register a single element when you only need one. Import its `defineOuds…()` helper and call it once:

```js
import { defineOudsButton } from "@nilloq/ouds-web/button";

defineOudsButton();
```

### Use without a bundler

For a plain HTML page, load the published module with a module script. The module registers all five elements; then use their HTML tags as shown above.

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@nilloq/ouds-web@0.1.3/dist/index.js"
></script>
```

Custom elements render in the page's light DOM, allowing the stylesheet linked above to style their HTML content. Vue is included in the custom-element build, so you do not need to install Vue to use this approach.
