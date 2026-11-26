// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { createApp, h, nextTick, ref } from "vue";
import { OudsModal as Modal } from "../src/vue/modal.ts";
import { defineOudsModal } from "../src/elements/modal.ts";
import type { ModalElement, ModalMethods } from "../src/components/modal/modal.types.ts";

let appId = 0;
const dispose: (() => void)[] = [];
afterEach(() => {
  dispose.splice(0).forEach((fn) => fn());
  document.body.innerHTML = "";
});
function mount(props: Record<string, unknown> = {}, slots = {}) {
  const root = document.createElement("div");
  document.body.append(root);
  const api = ref<ModalMethods>();
  const app = createApp({ render: () => h(Modal, { ...props, ref: api }, slots) });
  app.config.idPrefix = `test-${appId++}`;
  app.mount(root);
  dispose.push(() => app.unmount());
  return { root, api, dialog: root.querySelector("dialog")! };
}

test("synchronizes Vue models, exposed methods, native closure, and return values", async () => {
  const open = ref(false);
  const changes: boolean[] = [];
  const results: string[] = [];
  const root = document.createElement("div");
  document.body.append(root);
  const api = ref<ModalMethods>();
  const app = createApp({
    render: () =>
      h(Modal, {
        ref: api,
        open: open.value,
        "onUpdate:open": (value: boolean) => {
          open.value = value;
          changes.push(value);
        },
        onClose: (value: string) => results.push(value),
      }),
  });
  app.mount(root);
  dispose.push(() => app.unmount());
  const dialog = root.querySelector("dialog")!;
  expect(dialog.open).toBe(false);
  open.value = true;
  await nextTick();
  expect(dialog.open).toBe(true);
  api.value!.close("saved");
  await nextTick();
  expect(open.value).toBe(false);
  expect(results).toEqual(["saved"]);
  api.value!.showModal();
  await nextTick();
  expect(open.value).toBe(true);
  expect(dialog.returnValue).toBe("");
  dialog.close("native");
  await nextTick();
  expect(open.value).toBe(false);
  expect(results).toEqual(["saved", "native"]);
  open.value = true;
  await nextTick();
  open.value = false;
  await nextTick();
  expect(dialog.open).toBe(false);
  expect(changes).toEqual([true, false, true, false, true, false]);
});

test("defaults to explicit dismissal and supports cancellable Escape", async () => {
  const { root, dialog, api } = mount({
    open: true,
    onCancel: (event: Event) => event.preventDefault(),
  });
  const cancel = new Event("cancel", { cancelable: true });
  dialog.dispatchEvent(cancel);
  expect(cancel.defaultPrevented).toBe(true);
  dialog.dispatchEvent(new MouseEvent("pointerdown", { clientX: -10, clientY: -10 }));
  dialog.dispatchEvent(new MouseEvent("click", { clientX: -10, clientY: -10 }));
  expect(dialog.open).toBe(true);
  root.querySelector<HTMLButtonElement>(".btn-close")!.click();
  await nextTick();
  expect(dialog.open).toBe(false);
  api.value!.showModal();
  const locked = mount({ open: true, closeOnEscape: false, dismissible: false });
  const lockedCancel = new Event("cancel", { cancelable: true });
  locked.dialog.dispatchEvent(lockedCancel);
  expect(lockedCancel.defaultPrevented).toBe(true);
  expect(locked.root.querySelector(".btn-close")).toBeNull();
});

test("light dismissal requires both pointerdown and click outside the dialog bounds", () => {
  const { dialog } = mount({ open: true, closeOnBackdrop: true });
  Object.defineProperty(dialog, "getBoundingClientRect", {
    value: () => ({ left: 10, right: 100, top: 10, bottom: 100 }),
  });
  const click = (type: string, x: number) =>
    dialog.dispatchEvent(new MouseEvent(type, { clientX: x, clientY: x }));
  click("pointerdown", 30);
  click("click", 30);
  expect(dialog.open).toBe(true);
  click("pointerdown", 30);
  click("click", 0);
  expect(dialog.open).toBe(true);
  click("pointerdown", 0);
  click("click", 0);
  expect(dialog.open).toBe(false);
});

test("renders labelled dialogs with unique IDs and the documented footer placement", () => {
  const first = mount(
    { label: "First", description: "Details", stickyActions: true },
    { actions: () => h("button", "Continue") },
  );
  const second = mount({
    label: "Second",
    type: "fullscreen",
    size: "small",
    fixedHeight: true,
    nonBlurred: true,
  });
  const firstId = first.dialog.getAttribute("aria-labelledby")!;
  expect(document.getElementById(firstId)?.textContent).toBe("First");
  expect(firstId).not.toBe(second.dialog.getAttribute("aria-labelledby"));
  expect(document.getElementById(first.dialog.getAttribute("aria-describedby")!)?.textContent).toBe(
    "Details",
  );
  expect(first.dialog.querySelector(".modal-footer")?.parentElement).toBe(first.dialog);
  expect(second.dialog.className).toBe("modal-base modal-fullscreen-dialog");
  expect(second.dialog.hasAttribute("tabindex")).toBe(false);
  const standard = mount({}, { actions: () => h("button", "Continue") });
  expect(standard.dialog.querySelector(".modal-footer")?.parentElement?.className).toContain(
    "modal-body",
  );
});

test("closes the native dialog on unmount without application close events", () => {
  const results: string[] = [];
  const { dialog } = mount({ open: true, onClose: (value: string) => results.push(value) });
  dispose.pop()!();
  expect(dialog.open).toBe(false);
  expect(results).toEqual([]);
});

test("custom element exposes methods, keeps open current, and bridges cancellable events", async () => {
  defineOudsModal();
  const host = document.createElement("ouds-modal") as ModalElement;
  host.innerHTML = '<p>Rich content</p><button slot="actions">Continue</button>';
  document.body.append(host);
  await nextTick();
  const dialog = host.querySelector("dialog")!;
  const results: string[] = [];
  host.addEventListener("close", (event) =>
    results.push((event as CustomEvent<string[]>).detail[0]),
  );
  host.showModal();
  await nextTick();
  expect(host.open).toBe(true);
  expect(dialog.open).toBe(true);
  host.addEventListener("cancel", (event) => event.preventDefault());
  const cancel = new Event("cancel", { cancelable: true });
  dialog.dispatchEvent(cancel);
  expect(cancel.defaultPrevented).toBe(true);
  host.close("saved");
  await nextTick();
  expect(host.open).toBe(false);
  expect(results).toEqual(["saved"]);
  host.open = true;
  await nextTick();
  expect(dialog.open).toBe(true);
  dialog.close("native");
  await nextTick();
  expect(host.open).toBe(false);
  expect(host.querySelector(".modal-body")?.textContent).toContain("Rich content");
  expect(host.querySelector(".modal-footer")?.textContent).toContain("Continue");
  host.remove();
  await nextTick();
});

test("empty dialogs keep actions in the body and status icons have accessible text", () => {
  const { dialog } = mount(
    { stickyActions: true, variant: "warning" },
    { actions: () => h("button", "Dismiss") },
  );
  expect(dialog.querySelector(".modal-footer")?.parentElement?.className).toContain("modal-body");
  expect(dialog.querySelector(".modal-icon-warning .visually-hidden")?.textContent).toBe("Warning");
});
