<script setup lang="ts">
import { computed, ref } from "vue";
import { OudsButton, OudsSelect, OudsCheckbox, OudsTextInput } from "@nilloq/ouds-web/vue";
import { useStore } from "../../utils/store";

import type {
  ButtonType,
  ButtonVariant,
  ButtonSize,
} from "../../../../src/components/button/button.types.js";

const type = ref<ButtonType>("button");
const variant = ref<ButtonVariant>("brand");
const size = ref<ButtonSize>("medium");
const label = ref("Save changes");
const disabled = ref(false);
const loading = ref(false);
const iconOnly = ref(false);
const clicks = ref(0);

const { codeDisplayMode } = useStore();
const copied = ref(false);

// Avoid a literal closing tag here so it cannot terminate this SFC script block early.
const scriptCloseTag = "</scr" + "ipt>";

const customElementCode = computed(() => {
  const attrs = [
    `type="${type.value}"`,
    `variant="${variant.value}"`,
    `size="${size.value}"`,
    ...(iconOnly.value ? ["icon-only"] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(loading.value ? ["loading"] : []),
  ];
  return `<script type="module">
import { defineOudsButton } from "@nilloq/ouds-web/components/button";

defineOudsButton();
${scriptCloseTag}

<ouds-button ${attrs.join(" ")}>${label.value || "Button"}</ouds-button>`;
});

const vueCode = computed(() => {
  const props = [
    `type="${type.value}"`,
    `variant="${variant.value}"`,
    `size="${size.value}"`,
    ...(iconOnly.value ? [':icon-only="true"'] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(loading.value ? [':loading="true"'] : []),
  ];
  return `<script setup>
import { OudsButton } from "@nilloq/ouds-web/vue";
${scriptCloseTag}

<template>
  <OudsButton ${props.join(" ")}>${label.value || "Button"}</OudsButton>
</template>`;
});

const displayedCode = computed(() =>
  codeDisplayMode.value === "html" ? customElementCode.value : vueCode.value,
);

async function copyCode() {
  try {
    await navigator.clipboard.writeText(displayedCode.value);
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 1500);
  } catch {
    copied.value = false;
  }
}

function resetButton() {
  variant.value = "brand";
  size.value = "medium";
  type.value = "button";
  label.value = "Save changes";
  disabled.value = false;
  iconOnly.value = false;
  loading.value = false;
  clicks.value = 0;
}

const variantSelectOptions = computed(() => [
  { label: "Default", value: "default" },
  { label: "Strong", value: "strong" },
  { label: "Brand", value: "brand" },
  { label: "Minimal", value: "minimal" },
  { label: "Negative", value: "negative" },
]);

const sizeSelectOptions = computed(() => [
  { label: "Medium", value: "medium" },
  { label: "Small", value: "small" },
]);

const typeSelectOptions = computed(() => [
  { label: "Button", value: "button" },
  { label: "Submit", value: "submit" },
  { label: "Reset", value: "reset" },
]);
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Button</span>
    </nav>

    <div>
      <h1>Button</h1>
      <p>Buttons let people trigger an action, such as submitting a form or opening a dialog.</p>
    </div>

    <!-- Playground -->
    <section
      class="border border-default rounded-large overflow-hidden"
      aria-labelledby="playground-title"
    >
      <div
        class="border-bottom border-default p-medium d-flex justify-content-between align-items-center"
      >
        <div>
          <h2 id="playground-title">Interactive playground</h2>
          <p class="mb-none">Adjust the options to preview the button and its code.</p>
        </div>
        <OudsButton size="small" type="button" @click="resetButton">Reset</OudsButton>
      </div>

      <div class="row">
        <div class="col-12 md:col-6">
          <div
            class="d-flex flex-column justify-content-center align-items-center bg-secondary p-medium gap-small h-100 preview"
            aria-label="Button preview"
          >
            <OudsButton
              :variant="variant"
              :size="size"
              :type="type"
              :icon-only="iconOnly"
              :disabled="disabled"
              :loading="loading"
              @click="clicks++"
              >{{ label || "Button" }}</OudsButton
            >
            <p class="text-muted mb-none" aria-live="polite">Activated {{ clicks }} times</p>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <form class="p-medium" @submit.prevent>
            <div class="d-flex flex-column gap-small mb-small">
              <OudsSelect v-model="type" outlined label="Type" :options="typeSelectOptions" />
              <OudsTextInput v-model="label" outlined label="Label" placeholder="Button label" />
              <OudsSelect
                v-model="variant"
                outlined
                label="Variant"
                :options="variantSelectOptions"
              />
              <OudsSelect v-model="size" outlined label="Size" :options="sizeSelectOptions" />
            </div>
            <div class="d-flex flex-column">
              <OudsCheckbox v-model="disabled" label="Disabled" />
              <OudsCheckbox v-model="iconOnly" label="Icon only styling" />
              <OudsCheckbox v-model="loading" label="Loading" />
            </div>
          </form>
        </div>
      </div>

      <div class="border-top border-default">
        <div class="d-flex justify-content-end p-medium">
          <OudsButton type="button" class="copy-button" size="small" @click="copyCode">
            {{ copied ? "Copied" : "Copy code" }}
          </OudsButton>
        </div>
        <pre
          class="bg-inverse-low p-medium mb-none"
          :aria-label="codeDisplayMode === 'html' ? 'Custom element code' : 'Vue code'"
        ><code data-bs-theme="dark">{{ displayedCode }}</code></pre>
      </div>
    </section>

    <section id="api" class="pt-large">
      <h2>Attributes</h2>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Properties</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>variant</code></th>
              <td><code>default | strong | brand | minimal | negative</code></td>
              <td><code>default</code></td>
              <td>Visual style.</td>
            </tr>
            <tr>
              <th scope="row"><code>size</code></th>
              <td><code>medium | small</code></td>
              <td><code>medium</code></td>
              <td>Button size.</td>
            </tr>
            <tr>
              <th scope="row"><code>type</code></th>
              <td><code>button | submit | reset</code></td>
              <td><code>button</code></td>
              <td>Native button behavior when used in a form.</td>
            </tr>
            <tr>
              <th scope="row"><code>icon-only</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Applies icon button styling. Provide an accessible name for icon-only content.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>disabled</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables interaction and applies the native disabled state.</td>
            </tr>
            <tr>
              <th scope="row"><code>loading</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Shows the indeterminate loading state and disables the button while active.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="slots">
      <h2>Slots</h2>
      <p>
        <code>default</code> — button content. Provide visible text, or ensure icon-only content has
        an accessible name.
      </p>
    </section>

    <section id="events">
      <h2>Events</h2>
      <p>
        The component does not emit custom events. Its internal native
        <code>&lt;button&gt;</code> fires the standard <code>click</code> event, which can be
        listened to on the custom element or Vue component.
      </p>
      <pre><code>&lt;ouds-button @click="save"&gt;Save&lt;/ouds-button&gt;</code></pre>
    </section>
  </main>
</template>

<style scoped>
.preview {
  min-height: 15rem;
}

pre code {
  font: ui-monospace, SFMono-Regular, Consolas, monospace;
}

p code,
li code {
  font-size: 0.9em;
}
</style>
