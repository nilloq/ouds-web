<script setup lang="ts">
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { computed, reactive } from "vue";
import { OudsSelect, OudsCheckbox, OudsTextInput } from "@nilloq/ouds-web/vue";
import { defineOudsSelect } from "@nilloq/ouds-web/components/select";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import SvgIcon from "../ui/SvgIcon.vue";
import { useStore } from "../../utils/store";

const { codeDisplayMode } = useStore();
defineOudsSelect();
const defaults = () => ({
  value: "",
  label: "Choose a service",
  helperText: "Select the service you want to manage.",
  errorText: "Choose a service to continue.",
  helperLink: "",
  helperLinkHref: "",
  outlined: false,
  disabled: false,
  required: false,
  invalid: false,
  maxWidth: false,
  loading: false,
  leadingIcon: false,
  grouped: false,
});
const state = reactive(defaults());
const options = [
  { label: "Mobile", value: "mobile" },
  { label: "Internet", value: "internet" },
];
const booleanControls = [
  "outlined",
  "disabled",
  "required",
  "invalid",
  "maxWidth",
  "loading",
] as const;
const textControls = ["label", "helperText", "errorText", "helperLink", "helperLinkHref"] as const;
const labels = {
  label: "Label",
  helperText: "Helper text",
  errorText: "Error text",
  helperLink: "Helper link text",
  helperLinkHref: "Helper link URL",
};
const attributeName = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const escaped = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const scriptCloseTag = "</scr" + "ipt>";
const generatedCode = computed(() => {
  const html = codeDisplayMode.value === "html";
  const attrs = [
    'id="select-example"',
    ...textControls
      .filter((name) => state[name])
      .map((name) => `${attributeName(name)}="${escaped(state[name])}"`),
    ...booleanControls.filter((name) => state[name]).map(attributeName),
    html ? `value="${escaped(state.value)}"` : 'v-model="value"',
    ...(!state.grouped && !html ? [':options="options"'] : []),
  ];
  const icon =
    '<svg aria-hidden="true"><use xlink:href="/assets/img/solaris-icons-sprite.svg#search" /></svg>';
  const leading = state.leadingIcon
    ? html
      ? `\n  ${icon.replace("<svg ", '<svg slot="leading-icon" ')}`
      : `\n  <template #leading-icon>${icon}</template>`
    : "";
  const grouped = state.grouped
    ? `\n  <optgroup label="Services">\n${options.map((option) => `    <option value="${option.value}"${html && state.value === option.value ? " selected" : ""}>${option.label}</option>`).join("\n")}\n  </optgroup>`
    : "";
  if (html) {
    return `<script type="module">\nimport { defineOudsSelect } from "@nilloq/ouds-web/components/select";\n\ndefineOudsSelect();${state.grouped ? "" : `\ndocument.querySelector("#select-example").options = ${JSON.stringify(options, null, 2)};`}\n${scriptCloseTag}\n\n<ouds-select\n  ${attrs.join("\n  ")}\n>${leading}${grouped}\n</ouds-select>`;
  }
  return `<script setup>\nimport { ref } from "vue";\nimport { OudsSelect } from "@nilloq/ouds-web/vue";\n\nconst value = ref(${JSON.stringify(state.value)});${state.grouped ? "" : `\nconst options = ${JSON.stringify(options, null, 2)};`}\n${scriptCloseTag}\n\n<template>\n  <OudsSelect\n    ${attrs.join("\n    ")}\n  >${leading}${grouped}\n  </OudsSelect>\n</template>`;
});
function updateValue(event: Event) {
  state.value = (event.target as HTMLSelectElement).value;
}
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Select</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Select</h1>
        <OudsDocumentationLink component="select-input" label="Select" />
      </div>
      <p>A native select with OUDS floating labels, feedback, and loading states.</p>
    </header>
    <ComponentPlayground
      title="Select"
      description="Adjust the options to preview the select and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="Object.assign(state, defaults())"
    >
      <template #preview>
        <OudsSelect
          v-if="codeDisplayMode === 'vue'"
          v-model="state.value"
          :label="state.label"
          :options="options"
          :helper-text="state.helperText"
          :error-text="state.errorText"
          :helper-link="state.helperLink"
          :helper-link-href="state.helperLinkHref"
          :outlined="state.outlined"
          :disabled="state.disabled"
          :required="state.required"
          :invalid="state.invalid"
          :max-width="state.maxWidth"
          :loading="state.loading"
        >
          <template v-if="state.leadingIcon" #leading-icon><SvgIcon name="search" /></template>
          <template v-if="state.grouped" #default>
            <optgroup label="Services">
              <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :selected="state.value === option.value"
              >
                {{ option.label }}
              </option>
            </optgroup>
          </template>
        </OudsSelect>
        <ouds-select
          v-else
          :key="`${state.leadingIcon}-${state.grouped}`"
          :value="state.value"
          :label="state.label"
          :options="options"
          :helper-text="state.helperText"
          :error-text="state.errorText"
          :helper-link="state.helperLink"
          :helper-link-href="state.helperLinkHref"
          :outlined="state.outlined"
          :disabled="state.disabled"
          :required="state.required"
          :invalid="state.invalid"
          :max-width="state.maxWidth"
          :loading="state.loading"
          @change="updateValue"
        >
          <svg v-if="state.leadingIcon" slot="leading-icon" aria-hidden="true">
            <use xlink:href="../../assets/img/solaris-icons-sprite.svg#search" />
          </svg>
          <optgroup v-if="state.grouped" label="Services">
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :selected="state.value === option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </ouds-select>
        <p class="mt-small mb-none">Selected value: {{ state.value || "None" }}</p>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput
            v-for="name in textControls"
            :key="name"
            v-model="state[name]"
            outlined
            :label="labels[name]"
          />
          <OudsCheckbox
            v-for="name in booleanControls"
            :key="name"
            v-model="state[name]"
            :label="attributeName(name)"
          />
          <OudsCheckbox v-model="state.leadingIcon" label="Show leading icon" />
          <OudsCheckbox v-model="state.grouped" label="Group options" />
        </div>
      </template>
    </ComponentPlayground>
    <section class="pt-large" id="api">
      <h2>Attributes</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><code>id</code></th>
            <td>generated</td>
            <td>String used to associate the label and feedback with the select.</td>
          </tr>
          <tr>
            <th scope="row"><code>label</code></th>
            <td>Select</td>
            <td>Visible label, before the control.</td>
          </tr>
          <tr>
            <th scope="row"><code>options</code></th>
            <td>[]</td>
            <td>
              Array of objects with string label and value properties. Set this as a JavaScript
              property on custom elements.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>value</code></th>
            <td>empty string</td>
            <td>
              Selected string value. Use v-model in Vue. An empty disabled placeholder is included
              automatically.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>helper-text</code></th>
            <td>empty string</td>
            <td>
              Supporting text linked through aria-describedby, alongside external descriptions.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>error-text</code></th>
            <td>empty string</td>
            <td>Replaces helper text when invalid is true.</td>
          </tr>
          <tr>
            <th scope="row"><code>helper-link</code> / <code>helper-link-href</code></th>
            <td>empty string</td>
            <td>Text and URL of a link named with the select label.</td>
          </tr>
          <tr>
            <th scope="row"><code>outlined</code></th>
            <td>false</td>
            <td>Boolean. Applies the outlined container style.</td>
          </tr>
          <tr>
            <th scope="row"><code>disabled</code></th>
            <td>false</td>
            <td>Boolean. Disables the native select.</td>
          </tr>
          <tr>
            <th scope="row"><code>required</code></th>
            <td>false</td>
            <td>Boolean. Requires a selection and marks the label.</td>
          </tr>
          <tr>
            <th scope="row"><code>invalid</code></th>
            <td>false</td>
            <td>Boolean. Sets aria-invalid and displays error feedback.</td>
          </tr>
          <tr>
            <th scope="row"><code>max-width</code></th>
            <td>false</td>
            <td>
              Boolean. Keeps the control and its label close together using the OUDS component
              maximum width.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>loading</code></th>
            <td>false</td>
            <td>Boolean. Shows an indeterminate loader and an associated status message.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Native attributes such as name, autocomplete, and aria-describedby are forwarded to the
        select.
      </p>
    </section>
    <section id="slots">
      <h2>Slots</h2>
      <p>
        <code>default</code> replaces generated options with native option or optgroup elements. The
        empty placeholder is still included.
      </p>
      <p>
        <code>label</code>, <code>helper-text</code>, <code>error-text</code>, and
        <code>helper-link</code> replace the corresponding text. A helper link also needs
        helper-link-href.
      </p>
      <p>
        <code>leading-icon</code> places an icon before the label. Mark decorative SVGs
        aria-hidden="true".
      </p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>
        Vue emits change with the native event and updates v-model. Custom elements expose the
        native select's bubbling change event; read event.target.value.
      </p>
    </section>
  </main>
</template>
