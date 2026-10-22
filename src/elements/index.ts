import { defineOudsButton } from "./button.js";
import { defineOudsTag } from "./tag.js";
import { defineOudsSelect } from "./select.js";
import { defineOudsCheckbox } from "./checkbox.js";
import { defineOudsTextInput } from "./text-input.js";

export { OudsButton, defineOudsButton } from "./button.js";
export { OudsTag, defineOudsTag } from "./tag.js";
export { OudsSelect, defineOudsSelect } from "./select.js";
export { OudsCheckbox, defineOudsCheckbox } from "./checkbox.js";
export { OudsTextInput, defineOudsTextInput } from "./text-input.js";
export type * from "../components/button/button.types.js";
export type * from "../components/tag/tag.types.js";
export type * from "../components/select/select.types.js";
export type * from "../components/checkbox/checkbox.types.js";
export type * from "../components/text-input/text-input.types.js";

defineOudsButton();
defineOudsTag();
defineOudsSelect();
defineOudsCheckbox();
defineOudsTextInput();
