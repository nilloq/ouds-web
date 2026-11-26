<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  OudsAlert,
  OudsButton,
  OudsCheckbox,
  OudsSelect,
  OudsTextInput,
  alertVariants,
  type AlertVariant,
} from "@nilloq/ouds-web/vue";
import { defineOudsAlert } from "@nilloq/ouds-web/components/alert";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { useStore } from "../../utils/store";

defineOudsAlert();
const { codeDisplayMode } = useStore();
const defaults = () => ({
  variant: "info" as AlertVariant,
  label: "Your request is being processed.",
  description: "We will notify you when it is ready.",
  inline: false,
  dismissible: false,
  closeLabel: "Close alert",
  iconLabel: "",
  action: false,
  icon: false,
  role: "status",
  rounded: false,
});
const state = reactive(defaults());
const previewKey = ref(0);
const dismissed = ref(false);
const restore = () => {
  previewKey.value++;
  dismissed.value = false;
};
const reset = () => {
  Object.assign(state, defaults());
  restore();
};
const functional = computed(() =>
  ["positive", "negative", "info", "warning"].includes(state.variant),
);
const svgSprite = new URL("../../assets/img/solaris-icons-sprite.svg", import.meta.url).href;
const variantOptions = alertVariants.map((value) => ({ label: value, value }));
const roleOptions = ["status", "alert", "none"].map((value) => ({ label: value, value }));
const escaped = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll("{", "&#123;");
const generatedCode = computed(() => {
  const html = codeDisplayMode.value === "html";
  const tag = html ? "ouds-alert" : "OudsAlert";
  const attrs = [
    `variant="${state.variant}"`,
    `label="${escaped(state.label)}"`,
    ...(state.role !== "none" ? [`role="${state.role}"`] : []),
    ...(state.iconLabel ? [`icon-label="${escaped(state.iconLabel)}"`] : []),
    ...(state.inline
      ? ["inline"]
      : [
          ...(state.description ? [`description="${escaped(state.description)}"`] : []),
          ...(state.dismissible
            ? ["dismissible", `close-label="${escaped(state.closeLabel)}"`]
            : []),
        ]),
  ].join(" ");
  const slot = (name: string, content: string) =>
    html
      ? `\n  ${content.replace("<svg ", '<svg slot="icon" ')}`
      : `\n  <template #${name}>${content}</template>`;
  const content = [
    ...(!functional.value && state.icon
      ? [
          slot(
            "icon",
            '<svg width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true"><use href="/assets/img/solaris-icons-sprite.svg#star-favourite-fill" /></svg>',
          ),
        ]
      : []),
    ...(!state.inline && state.action
      ? [
          html
            ? '\n  <a slot="action" class="link link-compact" href="#api">Learn more</a>'
            : '\n  <template #action><a class="link link-compact" href="#api">Learn more</a></template>',
        ]
      : []),
  ].join("");
  const component = `<${tag} ${attrs}>${content}${content ? "\n" : ""}</${tag}>`;
  const example = state.rounded
    ? `<div class="use-rounded-corner-alert">\n${component}\n</div>`
    : component;
  const close = "</scr" + "ipt>";
  return html
    ? `<script type="module">\nimport { defineOudsAlert } from "@nilloq/ouds-web/components/alert";\ndefineOudsAlert();\n${close}\n\n${example}`
    : `<script setup>\nimport { OudsAlert } from "@nilloq/ouds-web/vue";\n${close}\n\n<template>\n${example}\n</template>`;
});
</script>

<template>
  <main>
    <nav class="breadcrumbs mb-medium" aria-label="Breadcrumb">
      <a href="/components">Components</a><span aria-hidden="true"> / </span><span>Alert</span>
    </nav>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Alert</h1>
        <OudsDocumentationLink component="alerts" label="Alert" />
      </div>
      <p>Provide feedback with a message or an inline alert.</p>
    </header>
    <ComponentPlayground
      title="Alert"
      description="Try alert variants, content, and dismissal."
      :code="generatedCode"
      :language="codeDisplayMode"
      :output="dismissed ? 'dismiss → true' : ''"
      @reset="reset"
    >
      <template #preview>
        <div :class="{ 'use-rounded-corner-alert': state.rounded }">
          <OudsAlert
            v-if="codeDisplayMode === 'vue'"
            :key="previewKey"
            :variant="state.variant"
            :label="state.label"
            :description="state.description"
            :inline="state.inline"
            :dismissible="state.dismissible"
            :close-label="state.closeLabel"
            :icon-label="state.iconLabel"
            :role="state.role === 'none' ? undefined : state.role"
            @dismiss="dismissed = true"
          >
            <template v-if="!functional && state.icon" #icon
              ><svg width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true">
                <use :href="`${svgSprite}#star-favourite-fill`" /></svg
            ></template>
            <template v-if="state.action" #action
              ><a class="link link-compact" href="#api">Learn more</a></template
            >
          </OudsAlert>
          <ouds-alert
            v-else
            :key="`${previewKey}-${state.variant}-${state.icon}-${state.action}`"
            :variant="state.variant"
            :label="state.label"
            :description="state.description"
            :inline="state.inline"
            :dismissible="state.dismissible"
            :close-label="state.closeLabel"
            :icon-label="state.iconLabel"
            :role="state.role === 'none' ? undefined : state.role"
            @dismiss="dismissed = true"
          >
            <svg
              v-if="!functional && state.icon"
              slot="icon"
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
              aria-hidden="true"
            >
              <use :href="`${svgSprite}#star-favourite-fill`" />
            </svg>
            <a v-if="state.action" slot="action" class="link link-compact" href="#api"
              >Learn more</a
            >
          </ouds-alert>
        </div>
      </template>
      <template #output-actions>
        <OudsButton type="button" size="small" :disabled="!dismissed" @click="restore"
          >Show alert again</OudsButton
        >
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" outlined label="Label" />
          <OudsSelect v-model="state.variant" outlined label="Variant" :options="variantOptions" />
          <OudsCheckbox v-model="state.inline" label="Inline alert" />
          <OudsTextInput
            v-if="!state.inline"
            v-model="state.description"
            outlined
            label="Description"
          />
          <OudsCheckbox v-if="!state.inline" v-model="state.dismissible" label="Dismissible" />
          <OudsTextInput
            v-if="!state.inline && state.dismissible"
            v-model="state.closeLabel"
            outlined
            label="Close button label"
          />
          <OudsCheckbox v-if="!state.inline" v-model="state.action" label="Action slot" />
          <OudsCheckbox v-if="!functional" v-model="state.icon" label="Custom icon slot" />
          <p v-if="!functional && state.inline && !state.icon">
            Non-functional inline alerts require a custom icon.
          </p>
          <OudsTextInput
            v-model="state.iconLabel"
            outlined
            label="Hidden status context (optional)"
          />
          <OudsSelect
            v-model="state.role"
            outlined
            label="Announcement role"
            :options="roleOptions"
          />
          <OudsCheckbox v-model="state.rounded" label="Rounded corners (Orange)" />
        </div>
      </template>
    </ComponentPlayground>
    <section id="api" class="pt-large">
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
            <th scope="row">variant</th>
            <td>info</td>
            <td>{{ alertVariants.join(" | ") }}</td>
          </tr>
          <tr>
            <th scope="row">label</th>
            <td>Alert</td>
            <td>Required message title, overridden by the default slot.</td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>empty</td>
            <td>Additional message text.</td>
          </tr>
          <tr>
            <th scope="row">inline</th>
            <td>false</td>
            <td>Compact alert; omits description, action, and close button.</td>
          </tr>
          <tr>
            <th scope="row">dismissible</th>
            <td>false</td>
            <td>Shows a close button on message alerts.</td>
          </tr>
          <tr>
            <th scope="row">close-label</th>
            <td>Close alert</td>
            <td>Accessible close button label. Can be localized.</td>
          </tr>
          <tr>
            <th scope="row">icon-label</th>
            <td>empty</td>
            <td>Hidden status context when the title is not self-explanatory.</td>
          </tr>
        </tbody>
      </table>
      <p>
        For dynamically inserted messages, pass <code>role="status"</code> for information or
        <code>role="alert"</code> for urgent feedback. Static alerts have no announcement role by
        default.
      </p>
    </section>
    <section id="slots">
      <h2>Slots</h2>
      <p>
        <code>default</code> supplies the title. <code>description</code> supplies description
        content. <code>action</code> places an action below the text. Use classes
        <code>link link-compact</code>. <code>icon</code> accepts a decorative custom icon for
        neutral and accent variants; functional icons are automatic. Non-functional inline alerts
        require a custom icon. Message alerts can omit it when their label provides enough context.
      </p>
    </section>
    <section id="events">
      <h2>Events</h2>
      <p>
        <code>dismiss</code> fires when the close button hides the alert. Listen with
        <code>@dismiss</code> in Vue or <code>addEventListener('dismiss', handler)</code> on the
        custom element. Remount the component to show it again. Dismissal is handled by the
        component and needs no OUDS JavaScript.
      </p>
    </section>
  </main>
</template>
