<script setup lang="ts">
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { computed, ref } from "vue";
import {
  OudsButton,
  OudsSelect,
  OudsCheckbox,
  OudsTextInput,
  buttonVariants,
  buttonSizes,
  buttonTypes,
  buttonNavigations,
  type ButtonType,
  type ButtonVariant,
  type ButtonSize,
  type ButtonNavigation,
} from "@nilloq/ouds-web/vue";
import { defineOudsButton } from "@nilloq/ouds-web/components/button";
import { useStore } from "../../utils/store";
import SvgIcon from "../ui/SvgIcon.vue";
import CodeBlock from "../ui/CodeBlock.vue";

const type = ref<ButtonType>("button");
const variant = ref<ButtonVariant>("brand");
const size = ref<ButtonSize>("medium");
const label = ref("Save changes");
const ariaLabel = ref("");
const navigation = ref<ButtonNavigation | "">("");
const disabled = ref(false);
const loading = ref(false);
const iconOnly = ref(false);
const expand = ref(false);
const expanded = ref(false);
const onColoredBg = ref(false);
const clicks = ref(0);

const { codeDisplayMode } = useStore();
defineOudsButton();

// Avoid a literal closing tag here so it cannot terminate this SFC script block early.
const scriptCloseTag = "</scr" + "ipt>";
const iconMarkup = `\n<svg aria-hidden="true">\n  <use xlink:href="../../assets/img/solaris-icons-sprite.svg#thumb-up" />\n</svg>\n`;

const customElementCode = computed(() => {
  const attrs = [
    `type="${type.value}"`,
    `variant="${variant.value}"`,
    `size="${size.value}"`,
    ...(expand.value ? ["expand", `aria-expanded="${expanded.value}"`] : []),
    ...(onColoredBg.value ? ["on-colored-bg"] : []),
    ...(iconOnly.value ? ["icon-only"] : []),
    ...(ariaLabel.value ? [`aria-label="${ariaLabel.value}"`] : []),
    ...(navigation.value ? [`navigation="${navigation.value}"`] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(loading.value ? ["loading"] : []),
  ];
  const content = iconOnly.value
    ? variant.value === "assistant" || navigation.value || expand.value
      ? ""
      : iconMarkup
    : label.value || "Button";
  return `<script type="module">
import { defineOudsButton } from "@nilloq/ouds-web/components/button";

defineOudsButton();
${scriptCloseTag}

<ouds-button ${attrs.join(" ")}>${content}</ouds-button>`;
});

const vueCode = computed(() => {
  const props = [
    `type="${type.value}"`,
    `variant="${variant.value}"`,
    `size="${size.value}"`,
    ...(expand.value ? ["expand", `aria-expanded="${expanded.value}"`] : []),
    ...(onColoredBg.value ? ["on-colored-bg"] : []),
    ...(iconOnly.value ? [':icon-only="true"'] : []),
    ...(ariaLabel.value ? [`aria-label="${ariaLabel.value}"`] : []),
    ...(navigation.value ? [`navigation="${navigation.value}"`] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(loading.value ? [':loading="true"'] : []),
  ];
  const content = iconOnly.value
    ? variant.value === "assistant" || navigation.value || expand.value
      ? ""
      : iconMarkup
    : label.value || "Button";
  return `<script setup>
import { OudsButton } from "@nilloq/ouds-web/vue";
${scriptCloseTag}

<template>
  <OudsButton ${props.join(" ")}>${content}</OudsButton>
</template>`;
});

const displayedCode = computed(() =>
  codeDisplayMode.value === "html" ? customElementCode.value : vueCode.value,
);

function resetButton() {
  variant.value = "brand";
  size.value = "medium";
  type.value = "button";
  label.value = "Save changes";
  ariaLabel.value = "";
  navigation.value = "";
  disabled.value = false;
  iconOnly.value = false;
  loading.value = false;
  expand.value = false;
  expanded.value = false;
  onColoredBg.value = false;
  clicks.value = 0;
}

const variantSelectOptions = buttonVariants.map((value) => ({ label: value, value }));

const sizeSelectOptions = buttonSizes.map((value) => ({ label: value, value }));
const typeSelectOptions = buttonTypes.map((value) => ({ label: value, value }));
const navigationSelectOptions = [
  { label: "None", value: "" },
  ...buttonNavigations.map((value) => ({ label: value, value })),
];
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Button</span>
    </nav>

    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Button</h1>
        <OudsDocumentationLink component="buttons" label="Button" />
      </div>
      <p>Buttons let people trigger an action, such as submitting a form or opening a dialog.</p>
    </header>

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
            class="d-flex flex-column justify-content-center align-items-center p-medium gap-small h-100 preview"
            :class="onColoredBg ? 'bg-surface-brand-primary' : 'bg-secondary'"
            :data-bs-theme="onColoredBg ? 'light' : undefined"
            aria-label="Button preview"
          >
            <OudsButton
              v-if="codeDisplayMode === 'vue'"
              :variant="variant"
              :size="size"
              :type="type"
              :expand="expand"
              :aria-expanded="expand ? expanded : undefined"
              :on-colored-bg="onColoredBg"
              :icon-only="iconOnly"
              :disabled="disabled"
              :loading="loading"
              :aria-label="ariaLabel || undefined"
              :navigation="navigation || undefined"
              @click="
                clicks++;
                expanded = !expanded;
              "
            >
              <SvgIcon
                v-if="iconOnly && variant !== 'assistant' && !navigation && !expand"
                name="thumb-up"
              />
              <template v-if="!iconOnly">{{ label }}</template>
            </OudsButton>
            <ouds-button
              v-else
              :variant="variant"
              :size="size"
              :type="type"
              :expand="expand"
              :aria-expanded="expand ? expanded : undefined"
              :on-colored-bg="onColoredBg"
              :icon-only="iconOnly"
              :disabled="disabled"
              :loading="loading"
              :aria-label="ariaLabel || undefined"
              :navigation="navigation || undefined"
              @click="
                clicks++;
                expanded = !expanded;
              "
            >
              <SvgIcon
                v-if="iconOnly && variant !== 'assistant' && !navigation && !expand"
                name="thumb-up"
              />
              <template v-if="!iconOnly">{{ label }}</template>
            </ouds-button>
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
              <OudsSelect
                v-model="navigation"
                outlined
                label="Navigation"
                :options="navigationSelectOptions"
              />
            </div>
            <div class="d-flex flex-column">
              <OudsCheckbox v-model="disabled" label="disabled" />
              <OudsCheckbox v-model="iconOnly" label="icon-only" />
              <OudsTextInput
                v-model="ariaLabel"
                outlined
                label="aria-label"
                placeholder="For icon-only buttons"
              />
              <OudsCheckbox v-model="loading" label="loading" />
              <OudsCheckbox v-model="expand" label="expand" />
              <OudsCheckbox v-if="expand" v-model="expanded" label="aria-expanded" />
              <OudsCheckbox v-model="onColoredBg" label="on-colored-bg" />
            </div>
          </form>
        </div>
      </div>

      <div class="border-top border-default">
        <CodeBlock
          :code="displayedCode"
          :language="codeDisplayMode"
          :aria-label="codeDisplayMode === 'html' ? 'Custom element code' : 'Vue code'"
        />
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
              <td>
                <code>{{ buttonVariants.join(" | ") }}</code>
              </td>
              <td><code>default</code></td>
              <td>Visual style.</td>
            </tr>
            <tr>
              <th scope="row"><code>size</code></th>
              <td>
                <code>{{ buttonSizes.join(" | ") }}</code>
              </td>
              <td><code>medium</code></td>
              <td>Button size.</td>
            </tr>
            <tr>
              <th scope="row"><code>type</code></th>
              <td>
                <code>{{ buttonTypes.join(" | ") }}</code>
              </td>
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
              <th scope="row"><code>aria-label</code></th>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Accessible name for the button, especially useful when its content is an icon.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>navigation</code></th>
              <td>
                <code>{{ buttonNavigations.join(" | ") }}</code>
              </td>
              <td><code>—</code></td>
              <td>Adds the matching previous or next navigation styling.</td>
            </tr>
            <tr>
              <th scope="row"><code>expand</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Adds the OUDS 1.6 expand chevron. Control its state with aria-expanded.</td>
            </tr>
            <tr>
              <th scope="row"><code>aria-expanded</code></th>
              <td><code>true | false</code></td>
              <td><code>false</code> when expand is enabled</td>
              <td>
                Set the expanded state from your application. Handle click to toggle content and add
                aria-controls with the controlled element's ID for a disclosure.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>on-colored-bg</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Adapts default, strong, and minimal buttons for colored backgrounds. Set the
                appropriate data-bs-theme on the parent.
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
</style>
