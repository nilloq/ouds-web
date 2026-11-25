# Get started with OUDS Web components

This library provides reusable UI components styled with **OUDS Web 1.6.0**. You can use them in a Vue app or as standard HTML custom elements. Both APIs need the OUDS Web stylesheet.

Each component's playground documents this library's Attributes, Slots, and Events. Refer to the [official OUDS Web 1.6 documentation](https://web.unified-design-system.orange.com/orange/docs/1.6/) for design and usage guidance.

## Why this library?

Writing OUDS markup directly means remembering component structures, CSS classes, and accessibility relationships. A form field with help text, an error message, and a loading indicator already involves several elements and IDs that must stay in sync. Repeating that work across forms adds code and opportunities for mistakes.

This library packages that markup and behavior into configurable Vue components and custom elements. You provide values, labels, messages, and state; the components generate the OUDS structure, connect labels and descriptions to their controls, and render the appropriate feedback and loading indicators.

**Accessibility management is built into the components.** For example, `OudsTextInput` generates the IDs needed to associate its label and control, connects help and error messages with `aria-describedby`, updates `aria-invalid` from the invalid state you provide, and exposes loading status to assistive technologies with `role="status"`. These relationships stay in sync as the component's state changes. You supply meaningful labels and messages, while the component handles the associated accessibility markup.

### Example: an email field in a form

Both examples below use Vue so you can compare the markup with the same reactive form state:

```js
import { ref } from "vue";

const email = ref("");
const emailError = ref("");
const loading = ref(false);
```

**Writing OUDS markup directly:**

```html
<form @submit.prevent>
  <div class="text-input">
    <div class="text-input-container">
      <label for="email" class="is-required">Email address</label>
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        class="text-input-field"
        :class="{ 'loading-indeterminate': loading }"
        placeholder=" "
        required
        :aria-invalid="Boolean(emailError)"
        :aria-describedby="[
          emailError ? 'email-error' : 'email-helper',
          loading && 'email-loading'
        ].filter(Boolean).join(' ')"
      />
      <template v-if="loading">
        <svg viewBox="0 0 40 40" class="loader" aria-hidden="true">
          <circle class="loader-inner" cx="20" cy="20" r="17"></circle>
        </svg>
        <span id="email-loading" role="status" class="visually-hidden">Loading</span>
      </template>
    </div>
    <p v-if="!emailError" id="email-helper" class="helper-text">
      We'll use this address to contact you.
    </p>
    <p v-else id="email-error" class="error-text">{{ emailError }}</p>
  </div>
</form>
```

**Using this library:** import `OudsTextInput` from `@nilloq/ouds-web/vue`, then use:

```html
<form @submit.prevent>
  <OudsTextInput
    v-model="email"
    type="email"
    name="email"
    autocomplete="email"
    label="Email address"
    helper-text="We'll use this address to contact you."
    :error-text="emailError"
    :invalid="Boolean(emailError)"
    :loading="loading"
    required
  />
</form>
```

`OudsTextInput` generates its IDs, associates the label and feedback with the input, switches between help and error text, and renders the loading indicator and status message. Your form still owns validation and submission: it sets `emailError` when validation fails and `loading` while a request is in progress.

## Add the OUDS Web stylesheet

Add this link to the `<head>` of your app's HTML page. It loads the OUDS Web Orange 1.6.0 styles used by the examples below. The component package does not load this stylesheet for you.

```html
<link
  href="https://cdn.jsdelivr.net/npm/@ouds/web-orange@1.6.0/dist/css/ouds-web.min.css"
  rel="stylesheet"
  integrity="sha384-/CYsyb9K6r8k5oSHG3szNxLYPR1OclHp84CIR093c9+junu5Wt5IWbhIweVxLGUZ"
  crossorigin="anonymous"
/>
```

This playground uses the Orange Compact theme. For theme selection and package-based stylesheet installation, follow the [OUDS Web installation guide](https://web.unified-design-system.orange.com/orange/docs/1.6/getting-started/introduction/).

## Use the components in a Vue app

Install the package in your Vue project:

```sh
npm install @nilloq/ouds-web
```

Vue 3.5 or later is a peer dependency for the Vue component API. Most Vue projects already have it installed. If yours does not, install both packages:

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
import { defineOudsButton } from "@nilloq/ouds-web/components/button";

defineOudsButton();
```

### Use without a bundler

For a plain HTML page, load the published module with a module script. The module registers all five elements; then use their HTML tags as shown above.

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@nilloq/ouds-web@{{libraryVersion}}/dist/index.js"
></script>
```

Custom elements render in the page's light DOM, allowing the stylesheet linked above to style their HTML content. Vue is included in the custom-element build, so you do not need to install Vue to use this approach.
