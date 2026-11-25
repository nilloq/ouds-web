import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { OudsBadge } from "../src/vue/badge.ts";
import { OudsBadge as BadgeElement, defineOudsBadge } from "../src/badge.ts";

const renderBadge = async (props = {}, slots = {}) =>
  (await renderToString(createSSRApp({ render: () => h(OudsBadge, props, slots) }))).replace(
    /<!--[\s\S]*?-->/g,
    "",
  );

test("renders the default negative dot with a hidden description", async () => {
  const html = await renderBadge({ label: "Errors" });
  expect(html).toContain('class="badge"');
  expect(html).toContain('<span class="visually-hidden">Errors</span>');
  expect(html).not.toContain("badge-negative");
  expect(html).not.toContain("badge-count");
});

test("renders zero and overflow counts, taking precedence over icons", async () => {
  for (const count of [0, "99+"]) {
    const html = await renderBadge({ count, statusIcon: true, label: " unread messages" });
    expect(html).toContain("badge-count");
    expect(html).toContain(String(count));
    expect(html).not.toContain("badge-status-icon");
    expect(html).toContain(" unread messages</span>");
  }
});

test("shows functional status icons only for functional variants", async () => {
  for (const variant of ["negative", "positive", "info", "warning"]) {
    expect(await renderBadge({ variant, statusIcon: true })).toContain(
      'class="badge-status-icon" aria-hidden="true"',
    );
  }
  for (const variant of ["neutral", "accent"]) {
    expect(await renderBadge({ variant, statusIcon: true })).not.toContain("badge-status-icon");
  }
});

test("supports custom icons and description slots with OUDS styling", async () => {
  const html = await renderBadge(
    { variant: "neutral", size: "large", disabled: true },
    {
      icon: () => h("svg", { class: "badge-icon", "aria-hidden": "true" }),
      default: () => "Favourite",
    },
  );
  expect(html).toContain('class="badge badge-neutral badge-large disabled"');
  expect(html).toContain('class="badge-icon" aria-hidden="true"');
  expect(html).toContain("Favourite");
  expect(html).not.toContain("Notification");
});

test("exposes the standalone custom element and can register without a browser", () => {
  expect(BadgeElement).toBeTypeOf("function");
  expect(() => defineOudsBadge()).not.toThrow();
});
