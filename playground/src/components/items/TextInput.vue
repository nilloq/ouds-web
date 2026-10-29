<script setup lang="ts">
import { computed, ref } from "vue";
import { OudsButton, OudsCheckbox, OudsSelect, OudsTextInput } from "@nilloq/ouds-web/vue";
import { defineOudsTextInput } from "@nilloq/ouds-web/components/text-input";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import SvgIcon from "../ui/SvgIcon.vue";
import { useStore } from "../../utils/store";

const { codeDisplayMode } = useStore();
defineOudsTextInput();
const value = ref("");
const label = ref("Email address");
const placeholder = ref("");
const helperText = ref("Please enter a valid email address to receive updates");
const errorText = ref("");
const helperLink = ref("");
const helperLinkHref = ref("");
const prefix = ref("");
const suffix = ref("");
const type = ref("text");
const outlined = ref(false);
const disabled = ref(false);
const readonly = ref(false);
const required = ref(false);
const invalid = ref(false);
const maxWidth = ref(false);
const loading = ref(false);
const showLeadingIcon = ref(false);
const showTrailingAction = ref(false);
// Avoid a literal closing tag here so it cannot terminate this SFC script block early.
const scriptCloseTag = "</scr" + "ipt>";

const typeOptions = ["text", "email", "password", "search", "tel", "url", "number"].map((item) => ({
  label: item,
  value: item,
}));

function reset() {
  value.value = "";
  label.value = "Email address";
  placeholder.value = "";
  helperText.value = "Please enter a valid email address to receive updates";
  errorText.value = "";
  helperLink.value = "";
  helperLinkHref.value = "";
  prefix.value = "";
  suffix.value = "";
  type.value = "text";
  outlined.value = false;
  disabled.value = false;
  readonly.value = false;
  required.value = false;
  invalid.value = false;
  maxWidth.value = false;
  loading.value = false;
  showLeadingIcon.value = false;
  showTrailingAction.value = false;
}

function escaped(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

const generatedCode = computed(() => {
  const slotSvg = (name: string) =>
    `<svg aria-hidden="true" focusable="false"><use xlink:href="/assets/img/solaris-icons-sprite.svg#${name}" /></svg>`;
  const leadingSlot = showLeadingIcon.value
    ? codeDisplayMode.value === "html"
      ? `\n  <svg slot="leading-icon" aria-hidden="true" focusable="false"><use xlink:href="/assets/img/solaris-icons-sprite.svg#search" /></svg>`
      : `\n    <template #leading-icon>\n      ${slotSvg("search")}\n    </template>`
    : "";
  const trailingSlot = showTrailingAction.value
    ? codeDisplayMode.value === "html"
      ? `\n  <button slot="trailing-action" type="button" class="btn btn-minimal btn-icon" aria-label="Clear input">${slotSvg("delete-cross-round")}</button>`
      : `\n    <template #trailing-action>\n      <OudsButton type="button" variant="minimal" icon-only aria-label="Clear input" @click="value = ''">\n        ${slotSvg("delete-cross-round")}\n      </OudsButton>\n    </template>`
    : "";
  const attrs = [
    `label="${escaped(label.value)}"`,
    ...(placeholder.value ? [`placeholder="${escaped(placeholder.value)}"`] : []),
    ...(helperText.value ? [`helper-text="${escaped(helperText.value)}"`] : []),
    ...(errorText.value ? [`error-text="${escaped(errorText.value)}"`] : []),
    ...(helperLink.value ? [`helper-link="${escaped(helperLink.value)}"`] : []),
    ...(helperLinkHref.value ? [`helper-link-href="${escaped(helperLinkHref.value)}"`] : []),
    ...(prefix.value ? [`prefix="${escaped(prefix.value)}"`] : []),
    ...(suffix.value ? [`suffix="${escaped(suffix.value)}"`] : []),
    ...(type.value !== "text" ? [`type="${type.value}"`] : []),
    ...(outlined.value ? ["outlined"] : []),
    ...(disabled.value ? ["disabled"] : []),
    ...(readonly.value ? ["readonly"] : []),
    ...(required.value ? ["required"] : []),
    ...(invalid.value ? ["invalid"] : []),
    ...(maxWidth.value ? ["max-width"] : []),
    ...(loading.value ? ["loading"] : []),
  ];

  if (codeDisplayMode.value === "html") {
    return `<script type="module">\nimport { defineOudsTextInput } from "@nilloq/ouds-web/components/text-input";\n\ndefineOudsTextInput();\n${scriptCloseTag}\n\n<ouds-text-input\n  ${attrs.join("\n  ")}\n>${leadingSlot}${trailingSlot}\n</ouds-text-input>`;
  }

  return `<script setup>\nimport { ref } from "vue";\nimport { OudsButton, OudsTextInput } from "@nilloq/ouds-web/vue";\n\nconst value = ref("");\n${scriptCloseTag}\n\n<template>\n  <OudsTextInput\n    v-model="value"\n    ${attrs.join("\n    ")}\n  >${leadingSlot}${trailingSlot}\n  </OudsTextInput>\n</template>`;
});

function updateCustomElementValue(event: Event) {
  value.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Text Input</span>
    </nav>

    <header class="mb-large">
      <h1>Text Input</h1>
      <p>
        An OUDS text input for entering and editing text. It uses the OUDS floating-label structure
        and forwards native input attributes such as <code>autocomplete</code> and
        <code>aria-describedby</code> to the input.
      </p>
    </header>

    <ComponentPlayground
      title="Text Input"
      description="Adjust the options to preview the text input and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="reset"
    >
      <template #preview>
        <OudsTextInput
          v-if="codeDisplayMode === 'vue'"
          v-model="value"
          :label="label"
          :placeholder="placeholder ? placeholder : undefined"
          :helper-text="helperText"
          :error-text="errorText"
          :helper-link="helperLink"
          :helper-link-href="helperLinkHref"
          :prefix="prefix"
          :suffix="suffix"
          :type="type"
          :outlined="outlined"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :invalid="invalid"
          :max-width="maxWidth"
          :loading="loading"
        >
          <template v-if="showLeadingIcon" #leading-icon><SvgIcon name="search" /></template>
          <template v-if="showTrailingAction" #trailing-action>
            <OudsButton
              type="button"
              variant="minimal"
              icon-only
              aria-label="Clear input"
              @click="value = ''"
            >
              <SvgIcon name="delete-cross-round" />
            </OudsButton>
          </template>
        </OudsTextInput>
        <ouds-text-input
          v-else
          :key="`${showLeadingIcon}-${showTrailingAction}`"
          :label="label"
          :placeholder="placeholder || undefined"
          :helper-text="helperText"
          :error-text="errorText"
          :helper-link="helperLink"
          :helper-link-href="helperLinkHref"
          :prefix="prefix"
          :suffix="suffix"
          :type="type"
          :outlined="outlined"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :invalid="invalid"
          :max-width="maxWidth"
          :loading="loading"
          :value="value"
          @input="updateCustomElementValue"
        >
          <svg
            v-if="showLeadingIcon"
            slot="leading-icon"
            width="24"
            height="24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use xlink:href="../../assets/img/solaris-icons-sprite.svg#search" />
          </svg>
          <button
            v-if="showTrailingAction"
            slot="trailing-action"
            type="button"
            class="btn btn-minimal btn-icon"
            aria-label="Clear input"
            @click="value = ''"
          >
            <svg width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false">
              <use xlink:href="../../assets/img/solaris-icons-sprite.svg#delete-cross-round" />
            </svg>
          </button>
        </ouds-text-input>
      </template>

      <template #controls>
        <div class="d-flex flex-column gap-small mb-small">
          <OudsSelect v-model="type" outlined label="Type" :options="typeOptions" />
          <OudsTextInput v-model="label" outlined label="Label" placeholder="Text input" />
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
          <OudsTextInput v-model="prefix" outlined label="Prefix" />
          <OudsTextInput v-model="suffix" outlined label="Suffix" />
        </div>
        <div class="d-flex flex-column">
          <OudsCheckbox v-model="outlined" label="outlined" />
          <OudsCheckbox v-model="required" label="required" />
          <OudsCheckbox v-model="disabled" label="disabled" />
          <OudsCheckbox v-model="readonly" label="readonly" />
          <OudsCheckbox v-model="maxWidth" label="max-width" />
          <OudsCheckbox v-model="loading" label="loading" />
          <OudsCheckbox v-model="invalid" label="invalid" />
          <OudsTextInput
            v-model="errorText"
            outlined
            label="Error text"
            placeholder="Shown when invalid"
          />
        </div>
        <fieldset class="d-flex flex-column border-top border-default mt-large pt-large">
          <legend class="mb-xsmall">Slots (samples)</legend>
          <p>
            Enable or disable the respective slots for the text input component. Sample leading icon
            and trailing action will be shown accordingly, but you should customize the slots
            content as needed.
          </p>
          <OudsCheckbox v-model="showLeadingIcon" label="Show leading icon" />
          <OudsCheckbox v-model="showTrailingAction" label="Show clear action" />
        </fieldset>
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
              <td>Input identifier. Generated automatically when omitted.</td>
            </tr>
            <tr>
              <th scope="row"><code>label</code></th>
              <td><code>string</code></td>
              <td><code>Text input</code></td>
              <td>Visible label associated with the input.</td>
            </tr>
            <tr>
              <th scope="row"><code>placeholder</code></th>
              <td><code>string</code></td>
              <td><code> </code></td>
              <td>Placeholder shown while the input is empty.</td>
            </tr>
            <tr>
              <th scope="row"><code>value</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>Current input value. In Vue, use <code>v-model</code> to bind it.</td>
            </tr>
            <tr>
              <th scope="row"><code>type</code></th>
              <td><code>string</code></td>
              <td><code>text</code></td>
              <td>
                Native input type, such as <code>email</code>, <code>password</code>, or
                <code>number</code>.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>helper-text</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Supporting text displayed below the input and associated with the input through
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
              <th scope="row"><code>prefix</code> / <code>suffix</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>Text displayed before or after the input value.</td>
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
              <td>Disables the input.</td>
            </tr>
            <tr>
              <th scope="row"><code>readonly</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Makes the input value read-only.</td>
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
              <td>Constrains the text input to the OUDS component maximum width.</td>
            </tr>
            <tr>
              <th scope="row"><code>loading</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Shows a loading indicator and status announcement in place of trailing content.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>invalid</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Sets the input's invalid state and displays its error text or slot.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="slots">
      <h2>Slots</h2>
      <p><code>label</code> — replaces the visible label text.</p>
      <p>
        <code>leading-icon</code> / <code>trailing-action</code> — content placed before or after
        the input.
      </p>
      <p><code>helper-text</code> — replaces the helper text content.</p>
      <p><code>error-text</code> — replaces the error message when <code>invalid</code> is true.</p>
      <p><code>helper-link</code> — replaces the helper link text.</p>
    </section>

    <section id="events">
      <h2>Events</h2>
      <p>
        The Vue component emits <code>input</code> and <code>change</code> events with the native
        input event. Both update <code>v-model</code> with the current value. The custom element
        exposes the native input's bubbling <code>input</code> and <code>change</code> events.
      </p>
      <pre><code>&lt;OudsTextInput v-model="email" @input="onInput" @change="onChange" /&gt;</code></pre>
    </section>
  </main>
</template>
