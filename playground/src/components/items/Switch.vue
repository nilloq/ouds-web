<script setup lang="ts">
import { computed, reactive } from "vue";
import { OudsCheckbox, OudsSwitch, OudsTextInput } from "@nilloq/ouds-web/vue";
import { defineOudsSwitch } from "@nilloq/ouds-web/components/switch";
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import SvgIcon from "../ui/SvgIcon.vue";
import { useStore } from "../../utils/store";

const svgSprite = new URL("../../assets/img/solaris-icons-sprite.svg", import.meta.url).href;

const { codeDisplayMode } = useStore();
defineOudsSwitch();
const defaults = () => ({
  checked: false,
  label: "Enable notifications",
  description: "Receive notifications about my services.",
  value: "updates",
  errorText: "Enable this setting to continue.",
  disabled: false,
  readonly: false,
  required: false,
  divider: false,
  invalid: false,
  reverse: false,
  maxWidth: false,
  asset: false,
  descriptionSlot: false,
});
const state = reactive(defaults());
const booleanControls = [
  "disabled",
  "readonly",
  "required",
  "divider",
  "invalid",
  "reverse",
  "maxWidth",
] as const;
const attributeName = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const escaped = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const scriptCloseTag = "</scr" + "ipt>";
const generatedCode = computed(() => {
  const html = codeDisplayMode.value === "html";
  const attrs = [
    'id="switchItemExample"',
    `label="${escaped(state.label)}"`,
    `value="${escaped(state.value)}"`,
    ...(state.description && !state.descriptionSlot
      ? [`description="${escaped(state.description)}"`]
      : []),
    ...(html ? (state.checked ? ["checked"] : []) : ['v-model="checked"']),
    ...booleanControls.filter((name) => state[name]).map(attributeName),
    ...(state.invalid ? ['aria-describedby="switchItemExample-error"'] : []),
  ];
  const asset = state.asset
    ? html
      ? '\n  <svg slot="asset" aria-hidden="true"><use xlink:href="/assets/img/solaris-icons-sprite.svg#search" /></svg>'
      : '\n  <template #asset>\n    <svg aria-hidden="true"><use xlink:href="/assets/img/solaris-icons-sprite.svg#search" /></svg>\n  </template>'
    : "";
  const description = state.descriptionSlot
    ? html
      ? `\n  <span slot="description">${escaped(state.description)}</span>`
      : `\n  <template #description>${escaped(state.description)}</template>`
    : "";
  const tag = html ? "ouds-switch" : "OudsSwitch";
  const switchItem = `<${tag}\n  ${attrs.join("\n  ")}\n>${asset}${description}\n</${tag}>`;
  const content = state.invalid
    ? `<div class="switch-item-container">\n${switchItem
        .split("\n")
        .map((line) => `  ${line}`)
        .join(
          "\n",
        )}\n  <p id="switchItemExample-error" class="control-item-error-message">${escaped(state.errorText)}</p>\n</div>`
    : switchItem;
  if (html) {
    return `<script type="module">\nimport { defineOudsSwitch } from "@nilloq/ouds-web/components/switch";\n\ndefineOudsSwitch();\n${scriptCloseTag}\n\n${content}`;
  }
  return `<script setup>\nimport { ref } from "vue";\nimport { OudsSwitch } from "@nilloq/ouds-web/vue";\n\nconst checked = ref(${state.checked});\n${scriptCloseTag}\n\n<template>\n${content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}\n</template>`;
});
function updateChecked(event: Event) {
  state.checked = (event.target as HTMLInputElement).checked;
}
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Switch</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Switch</h1>
        <OudsDocumentationLink component="switches" label="Switch" />
      </div>
    </header>
    <ComponentPlayground
      title="Switch"
      description="Adjust the options to preview the switch and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="Object.assign(state, defaults())"
    >
      <template #preview>
        <div class="switch-item-container">
          <OudsSwitch
            v-if="codeDisplayMode === 'vue'"
            id="switchItemPreview"
            v-model="state.checked"
            :label="state.label"
            :description="state.description"
            :value="state.value"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :required="state.required"
            :divider="state.divider"
            :invalid="state.invalid"
            :reverse="state.reverse"
            :max-width="state.maxWidth"
            :aria-describedby="state.invalid ? 'switchItemPreview-error' : undefined"
          >
            <template v-if="state.asset" #asset><SvgIcon name="search" /></template>
            <template v-if="state.descriptionSlot" #description>{{ state.description }}</template>
          </OudsSwitch>
          <ouds-switch
            v-else
            :key="`${state.asset}-${state.descriptionSlot}`"
            id="switchItemPreview"
            :checked="state.checked"
            :label="state.label"
            :description="state.description"
            :value="state.value"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :required="state.required"
            :divider="state.divider"
            :invalid="state.invalid"
            :reverse="state.reverse"
            :max-width="state.maxWidth"
            :aria-describedby="state.invalid ? 'switchItemPreview-error' : undefined"
            @change="updateChecked"
          >
            <svg v-if="state.asset" slot="asset" aria-hidden="true">
              <use :xlink:href="`${svgSprite}#search`" />
            </svg>
            <span v-if="state.descriptionSlot" slot="description">{{ state.description }}</span>
          </ouds-switch>
          <p v-if="state.invalid" id="switchItemPreview-error" class="control-item-error-message">
            {{ state.errorText }}
          </p>
        </div>
        <p class="mt-small mb-none">Checked value: {{ state.checked }}</p>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" outlined label="Label" />
          <OudsTextInput v-model="state.description" outlined label="Description" />
          <OudsTextInput v-model="state.value" outlined label="Form value" />
          <OudsTextInput v-model="state.errorText" outlined label="Example error message" />
          <OudsCheckbox v-model="state.checked" label="checked" />
          <OudsCheckbox
            v-for="name in booleanControls"
            :key="name"
            v-model="state[name]"
            :label="attributeName(name)"
          />
          <OudsCheckbox v-model="state.asset" label="Show asset slot" />
          <OudsCheckbox v-model="state.descriptionSlot" label="Use description slot" />
        </div>
      </template>
    </ComponentPlayground>
    <section id="api" class="pt-large">
      <h2>Attributes</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><code>id</code></th>
            <td>string</td>
            <td>generated</td>
            <td>
              In Vue, the indicator ID. For custom elements, the host ID; the indicator uses this ID
              with an -input suffix. Label and description associations are generated automatically.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>label</code></th>
            <td>string</td>
            <td>Switch</td>
            <td>Visible label; replaced by the label slot when supplied.</td>
          </tr>
          <tr>
            <th scope="row"><code>description</code></th>
            <td>string</td>
            <td>empty string</td>
            <td>Supporting text, included in aria-describedby alongside external IDs.</td>
          </tr>
          <tr>
            <th scope="row"><code>value</code></th>
            <td>string</td>
            <td>empty string</td>
            <td>Native form value. Independent of the boolean checked state.</td>
          </tr>
          <tr>
            <th scope="row"><code>checked</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Checked state for custom elements. In Vue, use v-model to bind a boolean.</td>
          </tr>
          <tr>
            <th scope="row"><code>disabled</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Disables the native input.</td>
          </tr>
          <tr>
            <th scope="row"><code>readonly</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>
              Replaces the input with a focusable ARIA switch. It cannot be toggled and does not
              submit a form value.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>required</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Sets required on the native input and marks the label.</td>
          </tr>
          <tr>
            <th scope="row"><code>divider</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Applies control-item-divider to the item.</td>
          </tr>
          <tr>
            <th scope="row"><code>invalid</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>
              Sets aria-invalid on the indicator. Associate external error text using
              aria-describedby, as shown in the generated example.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>reverse</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Applies control-item-reverse to the item.</td>
          </tr>
          <tr>
            <th scope="row"><code>max-width</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Applies component-max-width to the item.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Native attributes such as name, form, and aria-describedby are forwarded to the indicator.
      </p>
    </section>
    <section id="slots">
      <h2>Slots</h2>
      <p><code>label</code> replaces the label text.</p>
      <p>
        <code>description</code> replaces description text and is associated with the indicator
        through aria-describedby.
      </p>
      <p><code>asset</code> supplies optional content in the item's asset container.</p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>
        The Vue component emits change with the native event and updates its boolean v-model. Custom
        elements expose the input's bubbling change event; read event.target.checked. Read-only mode
        does not produce native change events.
      </p>
      <pre><code>&lt;OudsSwitch v-model="checked" @change="onChange" /&gt;</code></pre>
    </section>
  </main>
</template>
