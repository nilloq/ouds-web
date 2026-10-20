<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import SvgIcon from "./SvgIcon.vue";

const colorMode = useColorMode({ emitAuto: true });

function toggleMode(mode: "auto" | "light" | "dark") {
  colorMode.value = mode;
  document.documentElement.dataset.bsTheme = colorMode.value;
}

const iconName = computed(() => {
  if (colorMode.value === "auto") return "contrast";
  if (colorMode.value === "light") return "ui-light-mode";
  if (colorMode.value === "dark") return "ui-dark-mode";
  return "";
});
</script>

<template>
  <li class="nav-item dropdown">
    <button
      class="nav-link nav-icon dropdown-toggle"
      aria-expanded="false"
      data-bs-toggle="dropdown"
      data-bs-auto-close="true"
      data-bs-display="static"
      :aria-label="colorMode === 'light' ? 'Light' : 'Dark'"
    >
      <SvgIcon :name="iconName" class="me-xsmall" aria-hidden="true" :size="20" />
      <span class="md:d-none ms-xsmall">Toggle theme</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-label="Toggle theme">
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          :aria-pressed="colorMode === 'auto'"
          aria-label="Auto"
          @click="toggleMode('auto')"
        >
          <SvgIcon name="contrast" class="me-xsmall" aria-hidden="true" />
          Auto
          <SvgIcon
            v-if="colorMode === 'auto'"
            name="form-tick-square-approve"
            class="ms-auto"
            aria-hidden="true"
          />
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          :aria-pressed="colorMode === 'light'"
          aria-label="Light"
          @click="toggleMode('light')"
        >
          <SvgIcon name="ui-light-mode" class="me-xsmall" aria-hidden="true" />
          Light
          <SvgIcon
            v-if="colorMode === 'light'"
            name="form-tick-square-approve"
            class="ms-auto"
            aria-hidden="true"
          />
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          :aria-pressed="colorMode === 'dark'"
          aria-label="Dark"
          @click="toggleMode('dark')"
        >
          <SvgIcon name="ui-dark-mode" class="me-xsmall" aria-hidden="true" />
          Dark
          <SvgIcon
            v-if="colorMode === 'dark'"
            name="form-tick-square-approve"
            class="ms-auto"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>
  </li>
</template>
