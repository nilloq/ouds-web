<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import {
  OudsBadge,
  OudsSelect,
  OudsCheckbox,
  OudsTextInput,
  badgeVariants,
  badgeSizes,
  type BadgeVariant,
  type BadgeSize,
} from "@nilloq/ouds-web/vue";
import { defineOudsBadge } from "@nilloq/ouds-web/components/badge";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { useStore } from "../../utils/store";

const svgSprite = new URL("../../assets/img/solaris-icons-sprite.svg", import.meta.url).href;
const { codeDisplayMode } = useStore();
defineOudsBadge();
const defaults = () => ({
  label: "Unread notifications",
  count: "",
  statusIcon: false,
  iconSlot: false,
  variant: "negative" as BadgeVariant,
  size: "medium" as BadgeSize,
  disabled: false,
});
const state = reactive(defaults());
const functional = computed(() =>
  ["positive", "info", "warning", "negative"].includes(state.variant),
);
const count = computed(() => (state.count.trim() === "" ? undefined : state.count));
const showIconSlot = computed(
  () => state.iconSlot && !functional.value && count.value === undefined,
);
const hasContent = computed(
  () => count.value !== undefined || (state.statusIcon && functional.value) || showIconSlot.value,
);
const variantOptions = badgeVariants.map((value) => ({ label: value, value }));
const sizeOptions = computed(() =>
  badgeSizes
    .filter((value) => !hasContent.value || ["medium", "large"].includes(value))
    .map((value) => ({ label: value, value })),
);
watch(hasContent, (filled) => {
  if (filled && ["xsmall", "small"].includes(state.size)) state.size = "medium";
});
const escaped = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const scriptCloseTag = "</scr" + "ipt>";
const generatedCode = computed(() => {
  const html = codeDisplayMode.value === "html";
  const tag = html ? "ouds-badge" : "OudsBadge";
  const attrs = [
    `variant="${state.variant}"`,
    `size="${state.size}"`,
    `label="${escaped(state.label)}"`,
    ...(count.value !== undefined ? [`count="${escaped(count.value)}"`] : []),
    ...(state.statusIcon ? ["status-icon"] : []),
    ...(state.disabled ? ["disabled"] : []),
  ].join(" ");
  const icon = showIconSlot.value
    ? html
      ? '\n  <svg slot="icon" class="badge-icon" aria-hidden="true"><use href="/assets/img/solaris-icons-sprite.svg#star-favourite-fill" /></svg>\n'
      : '\n    <template #icon>\n      <svg class="badge-icon" aria-hidden="true"><use href="/assets/img/solaris-icons-sprite.svg#star-favourite-fill" /></svg>\n    </template>\n  '
    : "";
  const content = `<${tag} ${attrs}>${icon}</${tag}>`;
  if (html) {
    return `<script type="module">\nimport { defineOudsBadge } from "@nilloq/ouds-web/components/badge";\n\ndefineOudsBadge();\n${scriptCloseTag}\n\n${content}`;
  }
  return `<script setup>\nimport { OudsBadge } from "@nilloq/ouds-web/vue";\n${scriptCloseTag}\n\n<template>\n  ${content}\n</template>`;
});
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Badge</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Badge</h1>
        <OudsDocumentationLink component="badges" label="Badge" />
      </div>
      <p>Draw attention to a status or notification with a dot, count, or icon.</p>
    </header>
    <ComponentPlayground
      title="Badge"
      description="Adjust the options to preview the badge and its code."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="Object.assign(state, defaults())"
    >
      <template #preview>
        <p class="mb-none">
          <OudsBadge
            v-if="codeDisplayMode === 'vue'"
            :variant="state.variant"
            :size="state.size"
            :label="state.label"
            :count="count"
            :status-icon="state.statusIcon"
            :disabled="state.disabled"
          >
            <template v-if="showIconSlot" #icon>
              <svg class="badge-icon" aria-hidden="true">
                <use :href="`${svgSprite}#star-favourite-fill`" />
              </svg>
            </template>
          </OudsBadge>
          <ouds-badge
            v-else
            :key="String(showIconSlot)"
            :variant="state.variant"
            :size="state.size"
            :label="state.label"
            :count="count"
            :status-icon="state.statusIcon"
            :disabled="state.disabled"
          >
            <svg v-if="showIconSlot" slot="icon" class="badge-icon" aria-hidden="true">
              <use :href="`${svgSprite}#star-favourite-fill`" />
            </svg>
          </ouds-badge>
        </p>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" outlined label="Accessible description" />
          <OudsTextInput
            v-model="state.count"
            outlined
            label="Count (leave empty for a dot or icon)"
          />
          <p class="mb-none">Count takes precedence over icons.</p>
          <OudsSelect v-model="state.variant" outlined label="Variant" :options="variantOptions" />
          <OudsSelect v-model="state.size" outlined label="Size" :options="sizeOptions" />
          <OudsCheckbox v-model="state.statusIcon" :disabled="!functional" label="status-icon" />
          <OudsCheckbox v-if="!functional" v-model="state.iconSlot" label="Show icon slot" />
          <OudsCheckbox v-model="state.disabled" label="disabled" />
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
            <td>negative</td>
            <td>{{ badgeVariants.join(" | ") }}</td>
          </tr>
          <tr>
            <th scope="row"><code>size</code></th>
            <td>medium</td>
            <td>
              {{ badgeSizes.join(" | ") }}. Count and icon badges support medium and large only.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>count</code></th>
            <td>undefined</td>
            <td>
              A number or string (for example, 0 or 99+). Displays a count badge and takes
              precedence over icons.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>label</code></th>
            <td>Notification</td>
            <td>
              Visually hidden description. Supply meaningful text describing the badge's status or
              count.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>status-icon</code></th>
            <td>false</td>
            <td>
              Boolean. Shows the status icon for positive, info, warning, or negative variants.
            </td>
          </tr>
          <tr>
            <th scope="row"><code>disabled</code></th>
            <td>false</td>
            <td>Boolean. Applies the disabled appearance to this display-only badge.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section id="slots">
      <h2>Slots</h2>
      <p><code>default</code> overrides the hidden description supplied by <code>label</code>.</p>
      <p>
        <code>icon</code> supplies a custom icon with class <code>badge-icon</code> and
        <code>aria-hidden="true"</code>. It overrides the status icon. Use it for neutral and accent
        icon badges.
      </p>
      <p>Use icon badges to distinguish functional statuses when displaying several together.</p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>The badge does not emit custom events.</p>
    </section>
  </main>
</template>
