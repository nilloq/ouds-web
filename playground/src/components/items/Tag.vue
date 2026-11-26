<script setup lang="ts">
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { computed, reactive } from "vue";
import {
  OudsTag,
  OudsSelect,
  OudsCheckbox,
  OudsTextInput,
  tagVariants,
  tagSizes,
  type TagVariant,
  type TagSize,
} from "@nilloq/ouds-web/vue";
import { defineOudsTag } from "@nilloq/ouds-web/components/tag";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import { useStore } from "../../utils/store";

const { codeDisplayMode } = useStore();
defineOudsTag();
const defaults = () => ({
  label: "Eco-friendly",
  variant: "categorical-1" as TagVariant,
  size: "medium" as TagSize,
  muted: false,
  statusIcon: false,
  bullet: false,
  disabled: false,
  loading: false,
  squared: false,
});
const state = reactive(defaults());
const categorical = computed(() => state.variant.startsWith("categorical-"));
const functional = computed(() =>
  ["positive", "info", "warning", "negative"].includes(state.variant),
);
const variantOptions = tagVariants.map((value) => ({ label: value, value }));
const sizeOptions = tagSizes.map((value) => ({ label: value, value }));
const escaped = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const scriptCloseTag = "</scr" + "ipt>";
const generatedCode = computed(() => {
  const attrs = [
    `variant="${state.variant}"`,
    `size="${state.size}"`,
    ...(state.muted && !categorical.value ? ["muted"] : []),
    ...(state.statusIcon && functional.value ? ["status-icon"] : []),
    ...(state.bullet ? ["bullet"] : []),
    ...(state.disabled ? ["disabled"] : []),
    ...(state.loading ? ["loading"] : []),
    ...(state.squared ? ['class="rounded-none"'] : []),
  ].join(" ");
  const label = escaped(state.label);
  if (codeDisplayMode.value === "html") {
    return `<script type="module">\nimport { defineOudsTag } from "@nilloq/ouds-web/components/tag";\n\ndefineOudsTag();\n${scriptCloseTag}\n\n<p><ouds-tag ${attrs}>${label}</ouds-tag></p>`;
  }
  return `<script setup>\nimport { OudsTag } from "@nilloq/ouds-web/vue";\n${scriptCloseTag}\n\n<template>\n  <p><OudsTag ${attrs}>${label}</OudsTag></p>\n</template>`;
});
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Tag</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Tag</h1>
        <OudsDocumentationLink component="tags" label="Tag" />
      </div>
      <p>Display a status or category with a non-interactive tag.</p>
    </header>
    <ComponentPlayground
      title="Tag"
      description="Adjust the options to preview the tag and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="Object.assign(state, defaults())"
    >
      <template #preview>
        <p class="d-flex justify-content-center mb-none">
          <OudsTag
            v-if="codeDisplayMode === 'vue'"
            :variant="state.variant"
            :size="state.size"
            :muted="state.muted"
            :status-icon="state.statusIcon"
            :bullet="state.bullet"
            :disabled="state.disabled"
            :loading="state.loading"
            :class="{ 'rounded-none': state.squared }"
            >{{ state.label }}</OudsTag
          >
          <ouds-tag
            v-else
            :variant="state.variant"
            :size="state.size"
            :muted="state.muted"
            :status-icon="state.statusIcon"
            :bullet="state.bullet"
            :disabled="state.disabled"
            :loading="state.loading"
            :class="{ 'rounded-none': state.squared }"
            >{{ state.label }}</ouds-tag
          >
        </p>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" outlined label="Label" />
          <OudsSelect v-model="state.variant" outlined label="Variant" :options="variantOptions" />
          <OudsSelect v-model="state.size" outlined label="Size" :options="sizeOptions" />
          <OudsCheckbox v-model="state.muted" :disabled="categorical" label="muted" />
          <OudsCheckbox v-model="state.statusIcon" :disabled="!functional" label="status-icon" />
          <OudsCheckbox v-model="state.bullet" label="bullet" />
          <OudsCheckbox v-model="state.disabled" label="disabled" />
          <OudsCheckbox v-model="state.loading" label="loading" />
          <OudsCheckbox v-model="state.squared" label="Squared corners (rounded-none)" />
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
            <th scope="row"><code>variant</code></th>
            <td>neutral</td>
            <td>{{ tagVariants.join(" | ") }}</td>
          </tr>
          <tr>
            <th scope="row"><code>size</code></th>
            <td>medium</td>
            <td>{{ tagSizes.join(" | ") }}</td>
          </tr>
          <tr>
            <th scope="row"><code>muted</code></th>
            <td>false</td>
            <td>Boolean. Secondary appearance. Ignored for categorical tags.</td>
          </tr>
          <tr>
            <th scope="row"><code>status-icon</code></th>
            <td>false</td>
            <td>
              Boolean. Dedicated icon for positive, info, warning, and negative variants. Ignored
              for neutral, accent, and categorical tags.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>bullet</code></th>
            <td>false</td>
            <td>Boolean. Shows a decorative bullet unless a functional status icon is shown.</td>
          </tr>
          <tr>
            <th scope="row"><code>disabled</code></th>
            <td>false</td>
            <td>Boolean. Applies the OUDS disabled appearance to this display-only tag.</td>
          </tr>
          <tr>
            <th scope="row"><code>loading</code></th>
            <td>false</td>
            <td>
              Boolean. Replaces the status icon or bullet with an animated loader and an accessible
              loading status.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section id="slots">
      <h2>Slots</h2>
      <p><code>default</code> supplies the tag content and defaults to “Tag”.</p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>The tag does not emit custom events.</p>
    </section>
  </main>
</template>
