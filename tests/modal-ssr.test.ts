import { expect, test } from "vite-plus/test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { OudsModal } from "../src/vue/modal.ts";

test("renders closed markup on the server and gives sibling dialogs unique accessible titles", async () => {
  const markup = await renderToString(
    createSSRApp({
      render: () =>
        h("main", [
          h(OudsModal, { open: true, label: "First" }),
          h(OudsModal, { label: "Second" }),
        ]),
    }),
  );
  const ids = [...markup.matchAll(/aria-labelledby="([^"]+)"/g)].map((match) => match[1]);
  expect(ids).toHaveLength(2);
  expect(new Set(ids).size).toBe(2);
  for (const id of ids) expect(markup).toContain(`id="${id}"`);
  expect(markup).toContain("First");
  expect(markup).toContain("Second");
  expect(markup).not.toMatch(/<dialog[^>]*\sopen(?:[\s=>])/);
});
