import { useHost, useSlots } from "vue";

const lightDomSlots = new WeakMap<HTMLElement, Set<string>>();

// Capture supplied slots before Vue moves the host's children into its light-DOM outlets.
export function captureControlItemSlots(host: HTMLElement): void {
  if (lightDomSlots.has(host)) return;
  lightDomSlots.set(
    host,
    new Set(
      Array.from(host.childNodes).flatMap((child) => {
        if (child.nodeType === 1) {
          return [(child as Element).getAttribute("slot") || "default"];
        }
        // Whitespace and Vue's conditional-slot comments do not override fallback labels.
        return child.nodeType === 3 && child.textContent?.trim() ? ["default"] : [];
      }),
    ),
  );
}

export function useControlItemSlots(customElement: boolean): (name: string) => boolean {
  const slots = useSlots();
  const host = customElement ? useHost() : undefined;
  return (name) => Boolean(slots[name] || (host && lightDomSlots.get(host)?.has(name)));
}
