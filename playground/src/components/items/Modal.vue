<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  OudsModal,
  OudsButton,
  OudsCheckbox,
  OudsSelect,
  OudsTextInput,
  modalTypes,
  modalSizes,
  modalVariants,
  type ModalType,
  type ModalSize,
  type ModalVariant,
} from "@nilloq/ouds-web/vue";
import { defineOudsModal, type ModalElement } from "@nilloq/ouds-web/components/modal";
import ComponentPlayground from "../ui/ComponentPlayground.vue";
import OudsDocumentationLink from "../ui/OudsDocumentationLink.vue";
import { useStore } from "../../utils/store";

defineOudsModal();
const { codeDisplayMode } = useStore();
const defaults = () => ({
  label: "Account settings",
  description: "Review your preferences before continuing.",
  subtitle: "",
  type: "dialog" as ModalType,
  size: "default" as ModalSize,
  variant: "neutral" as ModalVariant,
  fixedHeight: false,
  nonBlurred: false,
  stickyActions: false,
  horizontalActions: false,
  dismissible: true,
  closeOnEscape: true,
  closeOnBackdrop: false,
  richContent: true,
  previous: false,
  rounded: false,
});
const state = reactive(defaults());
const modalProps = computed(() =>
  Object.fromEntries(
    Object.entries(state).filter(([key]) => !["richContent", "previous", "rounded"].includes(key)),
  ),
);
const open = ref(false);
const element = ref<ModalElement>();
const result = ref("");
const options = (values: readonly string[]) => values.map((value) => ({ label: value, value }));
const reset = () => {
  open.value = false;
  element.value?.close();
  Object.assign(state, defaults());
  result.value = "";
};
const recordClose = (value: string) => {
  result.value = value ? `Closed with result: ${value}` : "Dialog closed.";
};
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll("{", "&#123;");
const generatedCode = computed(() => {
  const html = codeDisplayMode.value === "html";
  const tag = html ? "ouds-modal" : "OudsModal";
  const attributes = [
    html ? 'id="account-modal"' : 'v-model:open="open"',
    `label="${escape(state.label)}"`,
    ...(state.description ? [`description="${escape(state.description)}"`] : []),
    ...(state.subtitle ? [`subtitle="${escape(state.subtitle)}"`] : []),
    ...(state.type !== "dialog" ? [`type="${state.type}"`] : []),
    ...(state.type === "dialog" && state.size === "small" ? ['size="small"'] : []),
    ...(state.variant !== "neutral"
      ? [`variant="${state.variant}"`, `icon-label="${state.variant}"`]
      : []),
    ...(
      [
        "fixedHeight",
        "nonBlurred",
        "stickyActions",
        "horizontalActions",
        "closeOnBackdrop",
      ] as const
    )
      .filter(
        (key) =>
          state[key] && (state.type === "dialog" || !["fixedHeight", "nonBlurred"].includes(key)),
      )
      .map((key) => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)),
    ...(["dismissible", "closeOnEscape"] as const)
      .filter((key) => !html && !state[key])
      .map(
        (key) =>
          `${html ? "" : ":"}${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}="false"`,
      ),
  ].join(" ");
  const previous = state.previous
    ? html
      ? '  <a slot="previous" class="link link-chevron link-previous" href="#api">Previous</a>\n'
      : '  <template #previous><a class="link link-chevron link-previous" href="#api">Previous</a></template>\n'
    : "";
  const content = state.richContent
    ? '  <div class="text-input"><div class="text-input-container"><label for="modal-name">Display name</label><input id="modal-name" class="text-input-field" placeholder=" " autocomplete="nickname" autofocus name="displayName" /></div></div>\n'
    : "";
  const actions = html
    ? '  <button slot="actions" id="save-modal" type="button" class="btn btn-strong">Save</button>\n  <button slot="actions" id="cancel-modal" type="button" class="btn btn-default">Cancel</button>'
    : '  <template #actions="{ close }">\n    <OudsButton variant="strong" @click="close(\'save\')">Save</OudsButton>\n    <OudsButton @click="close(\'cancel\')">Cancel</OudsButton>\n  </template>';
  const component = `<${tag} ${attributes}>\n${previous}${content}${actions}\n</${tag}>`;
  const example = state.rounded
    ? `<div class="use-rounded-corner-modal">\n${component}\n</div>`
    : component;
  const assignments = (["dismissible", "closeOnEscape"] as const)
    .filter((key) => !state[key])
    .map((key) => `modal.${key} = false;\n`)
    .join("");
  const endScript = "</scr" + "ipt>";
  return html
    ? `<script type="module">\nimport { defineOudsModal } from "@nilloq/ouds-web/components/modal";\ndefineOudsModal();\nconst modal = document.querySelector('#account-modal');\n${assignments}document.querySelector('#open-modal').addEventListener('click', () => modal.showModal());\ndocument.querySelector('#save-modal').addEventListener('click', () => modal.close('save'));\ndocument.querySelector('#cancel-modal').addEventListener('click', () => modal.close('cancel'));\n${endScript}\n\n<button id="open-modal" class="btn btn-default">Open dialog</button>\n${example}`
    : `<script setup>\nimport { ref } from "vue";\nimport { OudsModal, OudsButton } from "@nilloq/ouds-web/vue";\nconst open = ref(false);\n${endScript}\n\n<template>\n<OudsButton @click="open = true">Open dialog</OudsButton>\n${example}\n</template>`;
});
</script>

<template>
  <main>
    <header class="mb-large">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-small mb-small">
        <h1 class="mb-none">Modal</h1>
        <OudsDocumentationLink component="modals" label="Modal" />
      </div>
      <p>Native modal and fullscreen dialogs for focused tasks.</p>
    </header>
    <ComponentPlayground
      title="Modal"
      description="Open the dialog to try its content, variants, and dismissal behavior."
      :code="generatedCode"
      :language="codeDisplayMode"
      @reset="reset"
    >
      <template #preview>
        <div :class="{ 'use-rounded-corner-modal': state.rounded }">
          <OudsButton @click="codeDisplayMode === 'vue' ? (open = true) : element?.showModal()"
            >Open dialog</OudsButton
          >
          <p v-if="result" role="status">{{ result }}</p>
          <OudsModal
            v-if="codeDisplayMode === 'vue'"
            v-model:open="open"
            v-bind="modalProps"
            :icon-label="state.variant === 'neutral' ? '' : state.variant"
            @close="recordClose"
          >
            <template v-if="state.previous" #previous
              ><a class="link link-chevron link-previous" href="#api" @click="open = false"
                >Previous</a
              ></template
            >
            <div v-if="state.richContent" class="text-input">
              <div class="text-input-container">
                <label for="modal-name">Display name</label
                ><input
                  id="modal-name"
                  class="text-input-field"
                  placeholder=" "
                  autocomplete="nickname"
                  autofocus
                  name="displayName"
                />
              </div>
            </div>
            <template #actions="{ close }">
              <OudsButton variant="strong" @click="close('save')">Save</OudsButton>
              <OudsButton @click="close('cancel')">Cancel</OudsButton>
            </template>
          </OudsModal>
          <ouds-modal
            v-else
            :key="`${state.richContent}-${state.previous}`"
            ref="element"
            v-bind="modalProps"
            :icon-label="state.variant === 'neutral' ? '' : state.variant"
            @close="recordClose($event.detail[0])"
          >
            <a
              v-if="state.previous"
              slot="previous"
              class="link link-chevron link-previous"
              href="#api"
              @click="element?.close()"
              >Previous</a
            >
            <div v-if="state.richContent" class="text-input">
              <div class="text-input-container">
                <label for="modal-name">Display name</label
                ><input
                  id="modal-name"
                  class="text-input-field"
                  placeholder=" "
                  autocomplete="nickname"
                  autofocus
                  name="displayName"
                />
              </div>
            </div>
            <button
              slot="actions"
              type="button"
              class="btn btn-strong"
              @click="element?.close('save')"
            >
              Save
            </button>
            <button
              slot="actions"
              type="button"
              class="btn btn-default"
              @click="element?.close('cancel')"
            >
              Cancel
            </button>
          </ouds-modal>
        </div>
      </template>
      <template #controls>
        <div class="d-flex flex-column gap-small">
          <OudsTextInput v-model="state.label" label="Title" outlined />
          <OudsTextInput v-model="state.description" label="Description" outlined />
          <OudsTextInput v-model="state.subtitle" label="Subtitle" outlined />
          <OudsSelect v-model="state.type" label="Type" :options="options(modalTypes)" outlined />
          <OudsSelect
            v-if="state.type === 'dialog'"
            v-model="state.size"
            label="Size"
            :options="options(modalSizes)"
            outlined
          />
          <OudsSelect
            v-model="state.variant"
            label="Status"
            :options="options(modalVariants)"
            outlined
          />
          <OudsCheckbox
            v-if="state.type === 'dialog'"
            v-model="state.fixedHeight"
            label="Fixed height"
          />
          <OudsCheckbox
            v-if="state.type === 'dialog'"
            v-model="state.nonBlurred"
            label="Non-blurred backdrop"
          />
          <OudsCheckbox v-model="state.stickyActions" label="Sticky actions" />
          <OudsCheckbox v-model="state.horizontalActions" label="Horizontal actions" />
          <OudsCheckbox v-model="state.dismissible" label="Show close button" />
          <OudsCheckbox v-model="state.closeOnEscape" label="Close on Escape" />
          <OudsCheckbox v-model="state.closeOnBackdrop" label="Close on backdrop" />
          <OudsCheckbox v-model="state.richContent" label="Rich content" />
          <OudsCheckbox v-model="state.previous" label="Previous link" />
          <OudsCheckbox v-model="state.rounded" label="Rounded corners (Orange)" />
        </div>
      </template>
    </ComponentPlayground>
    <section id="api" class="pt-large">
      <h2>Attributes</h2>
      <p>
        Vue props use camelCase in JavaScript and can use kebab-case in templates. Custom element
        attributes use kebab-case; JavaScript properties use camelCase, such as
        <code>element.closeOnEscape = false</code>.
      </p>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Property / attribute</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>open</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Opens the native modal dialog. Bind with <code>v-model:open</code> in Vue, or set
                the custom element’s <code>open</code> property or attribute.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>label</code></th>
              <td><code>string</code></td>
              <td><code>Dialog</code></td>
              <td>
                Visible dialog title and accessible name. Overridden by the <code>title</code> slot.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>description</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Supporting text in the body, linked with <code>aria-describedby</code>. Overridden
                by the <code>description</code> slot.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>subtitle</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Context displayed above the title. Overridden by the <code>subtitle</code> slot.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>heading-level</code></th>
              <td><code>h1 | h2 | h3 | h4 | h5 | h6</code></td>
              <td><code>h2</code></td>
              <td>
                Title heading element. Choose a level appropriate to the surrounding page hierarchy.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>type</code></th>
              <td><code>dialog | fullscreen</code></td>
              <td><code>dialog</code></td>
              <td>
                Standard modal dialog or fullscreen dialog. Both open in the native modal top layer.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>size</code></th>
              <td><code>default | small</code></td>
              <td><code>default</code></td>
              <td>Width variant for standard dialogs. Ignored for fullscreen dialogs.</td>
            </tr>
            <tr>
              <th scope="row"><code>variant</code></th>
              <td><code>neutral | negative | positive | info | warning</code></td>
              <td><code>neutral</code></td>
              <td>
                Functional status icon. Neutral dialogs can supply a custom <code>icon</code> slot.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>icon-label</code></th>
              <td><code>string</code></td>
              <td><code>empty string</code></td>
              <td>
                Accessible icon text. When empty, functional variants use Error, Success,
                Information, or Warning. Set this property to localize the status.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>fixed-height</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Uses the maximum available height for the dialog size. Ignored for fullscreen
                dialogs.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>non-blurred</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables backdrop blur on standard dialogs. Ignored for fullscreen dialogs.</td>
            </tr>
            <tr>
              <th scope="row"><code>sticky-actions</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Places the actions footer outside the scrollable body. Requires description or rich
                body content; otherwise actions stay inside the body.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>horizontal-actions</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Keeps footer actions in a horizontal row on small screens instead of stacking
                vertically.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>dismissible</code></th>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                Shows the header close button. This property does not disable Escape or backdrop
                dismissal.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>close-label</code></th>
              <td><code>string</code></td>
              <td><code>Close dialog</code></td>
              <td>Accessible close button label. Set this property to localize the button.</td>
            </tr>
            <tr>
              <th scope="row"><code>close-on-escape</code></th>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                Allows native Escape dismissal. A <code>cancel</code> listener can prevent
                dismissal.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>close-on-backdrop</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Allows dismissal when both the pointer press and click occur outside the dialog
                bounds. Clicking dialog padding does not dismiss it.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Set boolean properties to <code>false</code> to disable options that default to true. An
        HTML attribute such as <code>dismissible="false"</code> is still present and does not
        disable the option. In Vue, use <code>:dismissible="false"</code>.
      </p>
      <p>
        Native attributes such as <code>id</code>, <code>aria-labelledby</code>, and
        <code>aria-describedby</code> are forwarded to the dialog. IDs are generated when omitted;
        for custom elements, the inner dialog ID appends <code>-dialog</code> to the host ID. Use
        <code>label</code> or the <code>title</code> slot for the visible title, since
        <code>title</code> is already a native HTML attribute.
      </p>
      <p>
        Rounded corners use the OUDS parent class <code>use-rounded-corner-modal</code> and are a
        project-wide styling option, rather than a modal prop.
      </p>
    </section>
    <section id="methods" class="pt-large">
      <h2>Methods</h2>
      <p>
        Call these methods on a Vue component ref or the custom element after mounting. Use the
        component methods for triggers so open state stays synchronized. No invoker or closedby
        polyfill is required.
      </p>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>showModal(): void</code></th>
              <td>
                Opens the dialog, moves focus inside, makes the rest of the page inert, synchronizes
                open state, and emits <code>show</code>. Does nothing if already open.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>close(returnValue?: string): void</code></th>
              <td>
                Closes the dialog and synchronizes open state. The optional string is returned in
                the <code>close</code> event. Does nothing if already closed.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section id="slots" class="pt-large">
      <h2>Slots</h2>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Slot</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>default</code></th>
              <td>
                Rich body content, including forms and interactive controls. Use native
                <code>autofocus</code> on the element that should receive initial focus.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>title</code></th>
              <td>
                Replaces the <code>label</code> text inside the generated heading. The accessible
                title association is preserved.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>subtitle</code></th>
              <td>Replaces the subtitle text above the title.</td>
            </tr>
            <tr>
              <th scope="row"><code>description</code></th>
              <td>
                Replaces the supporting description text and retains its accessible description
                association.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>icon</code></th>
              <td>
                Custom icon for the neutral variant. Functional variants render their OUDS status
                icon automatically. Decorative SVG content should use
                <code>aria-hidden="true"</code>.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>previous</code></th>
              <td>
                Previous-step navigation in the header. Use a link with
                <code>link link-chevron link-previous</code> and manage step navigation in your
                application.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>actions</code></th>
              <td>
                Footer actions, in primary, secondary, tertiary DOM order. Vue exposes
                <code>{ close }</code> as slot props. Custom elements can call the host’s
                <code>close()</code> method or use a native <code>form method="dialog"</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Vue uses named templates such as <code>&lt;template #actions="{ close }"&gt;</code>. Custom
        elements use the <code>slot</code> attribute, such as
        <code>&lt;button slot="actions"&gt;</code>. Provide up to three footer actions.
      </p>
    </section>
    <section id="events" class="pt-large">
      <h2>Events</h2>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Vue payload</th>
              <th scope="col">Custom element payload</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>update:open</code></th>
              <td><code>boolean</code></td>
              <td><code>event.detail[0]: boolean</code></td>
              <td>Reports open state changes. Vue’s <code>v-model:open</code> uses this event.</td>
            </tr>
            <tr>
              <th scope="row"><code>show</code></th>
              <td>none</td>
              <td>none</td>
              <td>Emitted after the dialog opens through the component API.</td>
            </tr>
            <tr>
              <th scope="row"><code>close</code></th>
              <td><code>returnValue: string</code></td>
              <td><code>event.detail[0]: string</code></td>
              <td>
                Emitted after dismissal, including native dialog form submission. The result is
                empty when no return value was supplied.
              </td>
            </tr>
            <tr>
              <th scope="row"><code>cancel</code></th>
              <td>Native <code>Event</code></td>
              <td>
                Cancellable <code>CustomEvent</code>; native event in <code>event.detail[0]</code>
              </td>
              <td>
                Emitted for a native cancellation request such as Escape. Call
                <code>event.preventDefault()</code> on the Vue payload or the custom element event
                to keep the dialog open.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Listen with Vue’s <code>@close="handler"</code> or the custom element’s
        <code>addEventListener('close', handler)</code>. Closing through the component’s close
        button, Escape, backdrop dismissal, or a <code>form method="dialog"</code> keeps the bound
        open state synchronized.
      </p>
    </section>
  </main>
</template>
