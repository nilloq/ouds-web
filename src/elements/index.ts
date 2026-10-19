import { defineOudsButton } from "./button.js";
import { defineOudsTag } from "./tag.js";

export { OudsButton, defineOudsButton } from "./button.js";
export { OudsTag, defineOudsTag } from "./tag.js";
export type * from "../components/button/button.types.js";
export type * from "../components/tag/tag.types.js";

defineOudsButton();
defineOudsTag();
