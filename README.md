# @nilloq/ouds-web

OUDS Web 1.6.0 components available as Vue components and framework-independent Web Components (custom elements). Both APIs provide **Alert**, **Badge**, **Button**, **Modal**, **Tag**, **Checkbox**, **Radio**, **Switch**, **Select**, **Text Input**, and **Text Area**. The playground demonstrates the components.

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

The same pattern applies to the other elements: `<ouds-modal>`, `<ouds-alert>`, `<ouds-badge>`, `<ouds-tag>`, `<ouds-checkbox>`, `<ouds-radio>`, `<ouds-switch>`, `<ouds-select>`, `<ouds-text-input>`, and `<ouds-text-area>`. Without a bundler, load the published ES module directly:

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

The subpath exports the component constructor and types without registering it automatically. The same subpath pattern is available for `modal`, `alert`, `badge`, `tag`, `checkbox`, `radio`, `switch`, `select`, `text-input`, and `text-area`; the corresponding `components/…` subpaths are equivalent.

## Modal dialogs

`OudsModal` uses a native `<dialog>` for focus handling and background inertness. It needs OUDS CSS and no OUDS JavaScript or invoker/closedby polyfills.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { OudsModal, OudsButton } from "@nilloq/ouds-web/vue";
const open = ref(false);
</script>

<template>
  <OudsButton @click="open = true">Edit preferences</OudsButton>
  <OudsModal v-model:open="open" label="Preferences" description="Review your settings.">
    <template #actions="{ close }">
      <OudsButton variant="strong" @click="close('saved')">Save</OudsButton>
      <OudsButton @click="close()">Cancel</OudsButton>
    </template>
  </OudsModal>
</template>
```

For custom elements, register with `defineOudsModal` from `@nilloq/ouds-web/modal`. After the element mounts, call `element.showModal()` / `element.close(returnValue?)`, or set its boolean `open` property. The `open` attribute also opens it. A `form method="dialog"` inside a slot closes it with the submit button's value. Set Boolean properties to `false` to disable defaults; an attribute such as `dismissible="false"` is still present and does not disable the option.

| Property                             | Default                | Purpose                                                                                                                                |
| ------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `label`, `description`, `subtitle`   | `Dialog`, empty, empty | Dialog text; the title, description, and subtitle slots override these.                                                                |
| `headingLevel`                       | `h2`                   | Heading tag, `h1` through `h6`.                                                                                                        |
| `type`                               | `dialog`               | `dialog` or `fullscreen`.                                                                                                              |
| `size`                               | `default`              | `default` or `small`; standard dialogs only.                                                                                           |
| `fixedHeight`, `nonBlurred`          | `false`                | Standard dialog height and backdrop variants.                                                                                          |
| `variant`                            | `neutral`              | `neutral`, `negative`, `positive`, `info`, or `warning`.                                                                               |
| `iconLabel`                          | Status name            | Localized accessible status label for functional icons.                                                                                |
| `stickyActions`, `horizontalActions` | `false`                | Footer placement and mobile action layout. Sticky actions require description or body content; otherwise the footer stays in the body. |
| `dismissible`                        | `true`                 | Show the close button.                                                                                                                 |
| `closeLabel`                         | `Close dialog`         | Localized close button label.                                                                                                          |
| `closeOnEscape`                      | `true`                 | Allow Escape dismissal.                                                                                                                |
| `closeOnBackdrop`                    | `false`                | Allow clicks outside the dialog to dismiss it.                                                                                         |

Slots: `title`, `subtitle`, `description`, `icon` (neutral variant), `previous`, `actions`, and the default rich body slot. Vue's `actions` slot receives `close(returnValue?)`. Supply actions in primary, secondary, tertiary order. Use `autofocus` on content that should receive initial focus. Rounded corners use the global OUDS parent class `use-rounded-corner-modal`.

Events: `show` after opening; `close` with the return value; `cancel` for Escape. Vue receives the return value directly and the native cancel event. Custom elements expose the return value as `event.detail[0]` and a cancellable `cancel` event. Calling `preventDefault()` in a cancel listener keeps the dialog open. Vue also emits `update:open` for model synchronization. Use the component methods for opening so state stays synchronized. Separate Vue applications sharing a document should configure unique `app.config.idPrefix` values for generated IDs.

## Development

```sh
vp install
vp run check
vp test
vp run build
vp run playground
```

`vp run playground` builds the custom element and starts the Vue demo app in `playground/`.
