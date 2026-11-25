import { expect, test, vi } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { OudsTextArea as VueTextArea } from "../src/vue/text-area.ts";
import { OudsTextArea, defineOudsTextArea } from "../src/index.ts";

const render = (props = {}, slots = {}) =>
  renderToString(createSSRApp({ render: () => h(VueTextArea, props, slots) }));

test("renders a labeled multiline field with native attributes and a value", async () => {
  const html = await render({
    id: "comments",
    label: "Comments",
    modelValue: "First line\nSecond line",
    name: "comments",
    rows: 4,
    maxlength: 180,
    required: true,
    outlined: true,
    maxWidth: true,
  });
  expect(html).toContain('class="text-area component-max-width"');
  expect(html).toContain("text-area-container-outlined");
  expect(html).toContain('for="comments" class="is-required"');
  expect(html).toMatch(/<textarea[^>]*name="comments"[^>]*rows="4"[^>]*maxlength="180"/);
  expect(html).toContain('placeholder=" "');
  expect(html).toContain(" required");
  expect(html).toContain("First line\nSecond line</textarea>");
});

test("combines external descriptions with helper text and contextual helper links", async () => {
  const html = await render({
    id: "comments",
    helperText: "Add details",
    helperLink: "Help",
    helperLinkHref: "/help",
    "aria-describedby": "external",
  });
  expect(html).toContain('aria-describedby="external comments-helper comments-helper-link"');
  expect(html).toContain('id="comments-helper" class="helper-text"');
  expect(html).toContain('aria-labelledby="comments-helper-link comments-label"');
});

test("uses slotted errors instead of helper text when invalid", async () => {
  const html = await render(
    { id: "comments", invalid: true, helperText: "Hidden help", disabled: true, readonly: true },
    { "error-text": () => "Please add a comment", label: () => "Your comment" },
  );
  expect(html).toContain('aria-invalid="true"');
  expect(html).toContain('aria-describedby="comments-error"');
  expect(html).toContain('id="comments-error" class="error-text"');
  expect(html).toContain("Please add a comment");
  expect(html).toContain("Your comment");
  expect(html).not.toContain("Hidden help");
  expect(html).toMatch(/<textarea[^>]* disabled readonly/);
});

test("generates distinct label associations for Vue fields and renders v-model values", async () => {
  const html = await renderToString(
    createSSRApp({
      render: () => h("div", [h(VueTextArea, { modelValue: "One\nTwo" }), h(VueTextArea)]),
    }),
  );
  const ids = [...html.matchAll(/<textarea[^>]* id="([^"]+)"/g)].map((match) => match[1]);
  expect(ids).toHaveLength(2);
  expect(new Set(ids).size).toBe(2);
  for (const id of ids) expect(html).toContain(`for="${id}"`);
  expect(html).toContain("One\nTwo</textarea>");
});

test("exports a custom element with safe, idempotent registration", () => {
  expect(OudsTextArea).toBeTypeOf("function");
  const define = vi.fn();
  const get = vi.fn().mockReturnValueOnce(undefined).mockReturnValue(OudsTextArea);
  vi.stubGlobal("customElements", { define, get });
  try {
    defineOudsTextArea();
    defineOudsTextArea();
    expect(define).toHaveBeenCalledExactlyOnceWith("ouds-text-area", OudsTextArea);
  } finally {
    vi.unstubAllGlobals();
  }
});
