<script setup lang="ts">
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { computed, ref } from "vue";
import { OudsCheckbox, OudsTextInput, OudsTextArea } from "@nilloq/ouds-web/vue";
import { defineOudsTextArea } from "@nilloq/ouds-web/components/text-area";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import { useStore } from "../../utils/store";

const { codeDisplayMode } = useStore();
defineOudsTextArea();
const value = ref("");
const maxlength = ref("");
const label = ref("Comments");
const placeholder = ref("");
const helperText = ref("Share any additional details");
const errorText = ref("");
const helperLink = ref("");
const helperLinkHref = ref("");
const outlined = ref(false);
const disabled = ref(false);
const readonly = ref(false);
const required = ref(false);
const invalid = ref(false);
const maxWidth = ref(false);
// Avoid a literal closing tag here so it cannot terminate this SFC script block early.
const scriptCloseTag = "</scr" + "ipt>";

function reset() {
  value.value = "";
  maxlength.value = "";
  label.value = "Comments";
  placeholder.value = "";
  helperText.value = "Share any additional details";
  errorText.value = "";
  helperLink.value = "";
  helperLinkHref.value = "";
  outlined.value = false;
  disabled.value = false;
  readonly.value = false;
  required.value = false;
  invalid.value = false;
  maxWidth.value = false;
}

function escaped(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

const generatedCode = computed(() => {
  const attrs = [
    ...(maxlength.value ? [`maxlength="${escaped(maxlength.value)}"`] : []),
    `label="${escaped(label.value)}"`,
    ...(placeholder.value ? [`placeholder="${escaped(placeholder.value)}"`] : []),
    ...(helperText.value ? [`helper-text="${escaped(helperText.value)}"`] : []),
    ...(errorText.value ? [`error-text="${escaped(errorText.value)}"`] : []),
    ...(helperLink.value ? [`helper-link="${escaped(helperLink.value)}"`] : []),
    ...(helperLinkHref.value ? [`helper-link-href="${escaped(helperLinkHref.value)}"`] : []),
    ...(outlined.value ? ["outlined"] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(readonly.value ? ["readonly"] : []),
    ...(required.value ? ["required"] : []),
    ...(invalid.value ? ["invalid"] : []),
    ...(maxWidth.value ? ["max-width"] : []),
  ];

  if (codeDisplayMode.value === "html") {
    return `<script type="module">\nimport { defineOudsTextArea } from "@nilloq/ouds-web/components/text-area";\n\ndefineOudsTextArea();\n${scriptCloseTag}\n\n<ouds-text-area\n  ${attrs.join("\n  ")}\n>\n</ouds-text-area>`;
  }

  return `<script setup>\nimport { ref } from "vue";\nimport { OudsTextArea } from "@nilloq/ouds-web/vue";\n\nconst value = ref("");\n${scriptCloseTag}\n\n<template>\n  <OudsTextArea\n    v-model="value"\n    ${attrs.join("\n    ")}\n  >\n  </OudsTextArea>\n</template>`;
});

function updateCustomElementValue(event: Event) {
  value.value = (event.target as HTMLTextAreaElement).value;
}
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Text Area</span>
    </nav>

    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Text Area</h1>
        <OudsDocumentationLink component="text-area" label="Text Area" />
      </div>
      <p>
        An OUDS text area for entering and editing multiple lines of text. It uses the OUDS
        floating-label structure and forwards native textarea attributes such as
        <code>maxlength</code>, <code>name</code> and <code>aria-describedby</code> to the textarea.
      </p>
    </header>

    <ComponentPlayground
      title="Text Area"
      description="Adjust the options to preview the text area and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="reset"
    >
      <template #preview>
        <OudsTextArea
          v-if="codeDisplayMode === 'vue'"
          v-model="value"
          :maxlength="maxlength || undefined"
          :label="label"
          :placeholder="placeholder ? placeholder : undefined"
          :helper-text="helperText"
          :error-text="errorText"
          :helper-link="helperLink"
          :helper-link-href="helperLinkHref"
          :outlined="outlined"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :invalid="invalid"
          :max-width="maxWidth"
        >
        </OudsTextArea>
        <ouds-text-area
          v-else
          :maxlength="maxlength || undefined"
          :label="label"
          :placeholder="placeholder || undefined"
          :helper-text="helperText"
          :error-text="errorText"
          :helper-link="helperLink"
          :helper-link-href="helperLinkHref"
          :outlined="outlined"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :invalid="invalid"
          :max-width="maxWidth"
          :value="value"
          @input="updateCustomElementValue"
        >
        </ouds-text-area>
      </template>

      <template #controls>
        <div class="d-flex flex-column gap-small mb-small">
          <OudsTextInput v-model="label" outlined label="Label" placeholder="Text area" />
          <OudsTextInput
            v-model="maxlength"
            outlined
            label="Maximum length"
            type="number"
            min="0"
          />
          <OudsTextInput v-model="placeholder" outlined label="Placeholder" />
          <OudsTextInput
            v-model="helperText"
            outlined
            label="Helper text"
            placeholder="Optional helper text"
          />
          <OudsTextInput
            v-model="helperLink"
            outlined
            label="Helper link text"
            placeholder="More information"
          />
          <OudsTextInput
            v-model="helperLinkHref"
            outlined
            label="Helper link URL"
            placeholder="https://example.com/help"
          />
        </div>
        <div class="d-flex flex-column">
          <OudsCheckbox v-model="outlined" label="outlined" />
          <OudsCheckbox v-model="required" label="required" />
          <OudsCheckbox v-model="disabled" label="disabled" />
          <OudsCheckbox v-model="readonly" label="readonly" />
          <OudsCheckbox v-model="maxWidth" label="max-width" />
          <OudsCheckbox v-model="invalid" label="invalid" />
          <OudsTextInput
            v-model="errorText"
            outlined
            label="Error text"
            placeholder="Shown when invalid"
          />
        </div>
      </template>
    </ComponentPlayground>

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
              <th scope="row"><code>id</code></th>
              <td><code>string</code></td>
              <td><code>generated</code></td>
              <td>Textarea identifier. Generated automatically when omitted.</td>
            </tr>
            <tr>
              <th scope="row"><code>label</code></th>
              <td><code>string</code></td>
              <td><code>Text area</code></td>
              <td>Visible label associated with the textarea.</td>
            </tr>
            <tr>
              <th scope="row"><code>placeholder</code></th>
              <td><code>string</code></td>
              <td><code> </code></td>
              <td>Placeholder text. An empty value uses a single space for floating labels.</td>
            </tr>
            <tr>
              <th scope="row"><code>value</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>Current textarea value. In Vue, use <code>v-model</code> to bind it.</td>
            </tr>
            <tr>
              <th scope="row"><code>helper-text</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Supporting text displayed below the input and associated with the textarea through
                <code>aria-describedby</code>.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>error-text</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Error message displayed when <code>invalid</code> is true and associated with the
                input through <code>aria-describedby</code>.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>helper-link</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>Text for the optional link displayed below the input.</td>
            </tr>
            <tr>
              <th scope="row"><code>helper-link-href</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                URL for the helper link. The link is shown when both its URL and text are provided.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>outlined</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Applies the outlined visual style.</td>
            </tr>
            <tr>
              <th scope="row"><code>disabled</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables the textarea.</td>
            </tr>
            <tr>
              <th scope="row"><code>readonly</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Makes the textarea value read-only.</td>
            </tr>
            <tr>
              <th scope="row"><code>required</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Sets the native <code>required</code> attribute and applies the required indicator
                to the label.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>max-width</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Constrains the text area width to keep the field and its label close together.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>invalid</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Sets the textarea's invalid state and displays its error text or slot.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="native-attributes">
      <h2>Native attributes</h2>
      <p>
        Additional attributes, including <code>rows</code>, <code>cols</code>,
        <code>maxlength</code>, <code>minlength</code>, <code>name</code>, and <code>wrap</code>,
        are forwarded to the native textarea.
      </p>
      <p>
        OUDS Web controls the textarea height and lets it grow with its content in browsers that
        support <code>field-sizing: content</code>. In these browsers, <code>rows</code> and
        <code>cols</code> do not determine its size.
      </p>
    </section>

    <section id="slots">
      <h2>Slots</h2>
      <p><code>label</code> — replaces the visible label text.</p>
      <p><code>helper-text</code> — replaces the helper text content.</p>
      <p><code>error-text</code> — replaces the error message when <code>invalid</code> is true.</p>
      <p><code>helper-link</code> — replaces the helper link text.</p>
    </section>

    <section id="events">
      <h2>Events</h2>
      <p>
        The Vue component emits <code>input</code> and <code>change</code> events with the native
        textarea event. Both update <code>v-model</code> with the current value. The custom element
        exposes the native textarea's bubbling <code>input</code> and <code>change</code> events.
      </p>
      <pre><code>&lt;OudsTextArea v-model="comments" @input="onInput" @change="onChange" /&gt;</code></pre>
    </section>
  </main>
</template>
