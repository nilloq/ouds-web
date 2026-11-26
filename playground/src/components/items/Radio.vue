<script setup lang="ts">
import { computed, reactive } from "vue";
import { OudsCheckbox, OudsRadio, OudsTextInput } from "@nilloq/ouds-web/vue";
import { defineOudsRadio } from "@nilloq/ouds-web/components/radio";
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import SvgIcon from "../ui/SvgIcon.vue";
import { useStore } from "../../utils/store";

const svgSprite = new URL("../../assets/img/solaris-icons-sprite.svg", import.meta.url).href;

const { codeDisplayMode } = useStore();
defineOudsRadio();
const defaults = () => ({
  selected: "",
  label: "Email",
  description: "Receive notifications by email.",
  value: "email",
  extraLabel: "Recommended",
  errorText: "Select this option to continue.",
  disabled: false,
  readonly: false,
  required: false,
  divider: false,
  outlined: false,
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
  "outlined",
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
    'id="radioItemExample"',
    `label="${escaped(state.label)}"`,
    'name="notification-channel"',
    `value="${escaped(state.value)}"`,
    ...(state.extraLabel ? [`extra-label="${escaped(state.extraLabel)}"`] : []),
    ...(state.description && !state.descriptionSlot
      ? [`description="${escaped(state.description)}"`]
      : []),
    ...(html ? (state.selected === state.value ? ["checked"] : []) : ['v-model="selected"']),
    ...booleanControls.filter((name) => state[name]).map(attributeName),
    ...(state.invalid ? ['aria-describedby="radioItemExample-error"'] : []),
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
  const tag = html ? "ouds-radio" : "OudsRadio";
  const radio = `<${tag}\n  ${attrs.join("\n  ")}\n>${asset}${description}\n</${tag}>`;
  const alternateAttrs = [
    'name="notification-channel"',
    'label="SMS"',
    'value="sms"',
    ...(html ? (state.selected === "sms" ? ["checked"] : []) : ['v-model="selected"']),
    ...booleanControls.filter((name) => state[name]).map(attributeName),
    ...(state.invalid ? ['aria-describedby="radioItemExample-error"'] : []),
  ];
  const alternate = `<${tag}\n  ${alternateAttrs.join("\n  ")}\n></${tag}>`;
  const groupAttrs = state.readonly
    ? ' role="radiogroup" aria-readonly="true" aria-labelledby="radioGroupLabel"'
    : "";
  const legend = `<legend id="radioGroupLabel"${state.required ? ' class="is-required"' : ""}>Notification channel</legend>`;
  const error = state.invalid
    ? `\n  <p id="radioItemExample-error" class="control-item-error-message">${escaped(state.errorText)}</p>`
    : "";
  const content = `<fieldset class="control-items-list"${groupAttrs}>\n  ${legend}\n  <div class="d-flex flex-column">\n${[
    radio,
    alternate,
  ]
    .join("\n")
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n")}\n  </div>${error}\n</fieldset>`;
  if (html) {
    return `<script type="module">\nimport { defineOudsRadio } from "@nilloq/ouds-web/components/radio";\n\ndefineOudsRadio();\n${scriptCloseTag}\n\n${content}`;
  }
  return `<script setup>\nimport { ref } from "vue";\nimport { OudsRadio } from "@nilloq/ouds-web/vue";\n\nconst selected = ref(${JSON.stringify(state.selected)});\n${scriptCloseTag}\n\n<template>\n${content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}\n</template>`;
});
function updateSelected(event: Event) {
  state.selected = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Radio</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Radio</h1>
        <OudsDocumentationLink component="radio-buttons" label="Radio" />
      </div>
    </header>
    <ComponentPlayground
      title="Radio"
      description="Adjust the options to preview the radio and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="Object.assign(state, defaults())"
    >
      <template #preview>
        <fieldset
          class="control-items-list"
          :role="state.readonly ? 'radiogroup' : undefined"
          :aria-readonly="state.readonly || undefined"
          :aria-labelledby="state.readonly ? 'radioGroupPreviewLabel' : undefined"
        >
          <legend id="radioGroupPreviewLabel" :class="{ 'is-required': state.required }">
            Notification channel
          </legend>
          <div class="d-flex flex-column">
            <OudsRadio
              v-if="codeDisplayMode === 'vue'"
              id="radioItemPreview"
              v-model="state.selected"
              :label="state.label"
              :description="state.description"
              name="notification-channel-preview"
              :value="state.value"
              :extra-label="state.extraLabel"
              :disabled="state.disabled"
              :readonly="state.readonly"
              :required="state.required"
              :divider="state.divider"
              :outlined="state.outlined"
              :invalid="state.invalid"
              :reverse="state.reverse"
              :max-width="state.maxWidth"
              :aria-describedby="state.invalid ? 'radioItemPreview-error' : undefined"
            >
              <template v-if="state.asset" #asset><SvgIcon name="search" /></template>
              <template v-if="state.descriptionSlot" #description>{{ state.description }}</template>
            </OudsRadio>
            <ouds-radio
              v-else
              :key="`${state.asset}-${state.descriptionSlot}`"
              id="radioItemPreview"
              :checked="state.selected === state.value"
              :label="state.label"
              :description="state.description"
              name="notification-channel-preview"
              :value="state.value"
              :extra-label="state.extraLabel"
              :disabled="state.disabled"
              :readonly="state.readonly"
              :required="state.required"
              :divider="state.divider"
              :outlined="state.outlined"
              :invalid="state.invalid"
              :reverse="state.reverse"
              :max-width="state.maxWidth"
              :aria-describedby="state.invalid ? 'radioItemPreview-error' : undefined"
              @change="updateSelected"
            >
              <svg v-if="state.asset" slot="asset" aria-hidden="true">
                <use :xlink:href="`${svgSprite}#search`" />
              </svg>
              <span v-if="state.descriptionSlot" slot="description">{{ state.description }}</span>
            </ouds-radio>
            <OudsRadio
              v-if="codeDisplayMode === 'vue'"
              v-model="state.selected"
              name="notification-channel-preview"
              value="sms"
              label="SMS"
              :disabled="state.disabled"
              :readonly="state.readonly"
              :required="state.required"
              :divider="state.divider"
              :outlined="state.outlined"
              :invalid="state.invalid"
              :reverse="state.reverse"
              :max-width="state.maxWidth"
              :aria-describedby="state.invalid ? 'radioItemPreview-error' : undefined"
            />
            <ouds-radio
              v-else
              name="notification-channel-preview"
              value="sms"
              label="SMS"
              :checked="state.selected === 'sms'"
              :disabled="state.disabled"
              :readonly="state.readonly"
              :required="state.required"
              :divider="state.divider"
              :outlined="state.outlined"
              :invalid="state.invalid"
              :reverse="state.reverse"
              :max-width="state.maxWidth"
              :aria-describedby="state.invalid ? 'radioItemPreview-error' : undefined"
              @change="updateSelected"
            />
          </div>
          <p v-if="state.invalid" id="radioItemPreview-error" class="control-item-error-message">
            {{ state.errorText }}
          </p>
        </fieldset>
        <p class="mt-small mb-none">Selected value: {{ state.selected || "None" }}</p>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" outlined label="Label" />
          <OudsTextInput v-model="state.description" outlined label="Description" />
          <OudsTextInput v-model="state.value" outlined label="Form value" />
          <OudsTextInput v-model="state.errorText" outlined label="Example error message" />
          <OudsTextInput v-model="state.extraLabel" outlined label="Extra label" />
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
            <td>Radio</td>
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
            <td>Native form value. The Vue model contains the selected option’s value.</td>
          </tr>
          <tr>
            <th scope="row"><code>checked</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>
              Checked state for custom elements. In Vue, share a string v-model across the group.
            </td>
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
              Replaces the input with a focusable ARIA radio. Wrap the group in a named radiogroup
              with aria-readonly="true". It cannot be toggled and does not submit a form value.
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
            <th scope="row"><code>outlined</code></th>
            <td>boolean</td>
            <td>false</td>
            <td>Applies radio-button-item-outlined. Use on all options in the group.</td>
          </tr>
          <tr>
            <th scope="row"><code>extra-label</code></th>
            <td>string</td>
            <td>empty string</td>
            <td>Extra supporting label, associated through aria-describedby.</td>
          </tr>
          <tr>
            <th scope="row"><code>name</code></th>
            <td>string</td>
            <td>empty string</td>
            <td>Shared native group name. Give each option in the group the same name.</td>
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
      <p><code>extra-label</code> replaces the extra supporting label.</p>
      <p><code>asset</code> supplies optional content in the item's asset container.</p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>
        The Vue component emits change with the native event and updates its string v-model. Custom
        elements expose the input's bubbling change event; read event.target.value. Read-only mode
        does not produce native change events.
      </p>
      <pre><code>&lt;OudsRadio v-model="selected" name="channel" value="email" @change="onChange" /&gt;</code></pre>
    </section>
  </main>
</template>
