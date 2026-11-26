import { expect, test } from "vite-plus/test";
import {
  defineOudsButton,
  defineOudsTag,
  OudsButton,
  OudsTag,
  OudsRadio,
  defineOudsRadio,
} from "../src/index.ts";

test("exports the Vue-authored custom elements and registration helpers", () => {
  expect(typeof OudsRadio).toBe("function");
  expect(defineOudsRadio).toBeTypeOf("function");
  expect(() => defineOudsRadio()).not.toThrow();
  expect(typeof OudsButton).toBe("function");
  expect(defineOudsButton).toBeTypeOf("function");
  expect(typeof OudsTag).toBe("function");
  expect(defineOudsTag).toBeTypeOf("function");
});
