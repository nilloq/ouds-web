<script setup lang="ts">
import { ref } from "vue";

const clicks = ref(0);
const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.dataset.bsTheme = isDark.value ? "dark" : "light";
}
</script>

<template>
  <main class="playground">
    <header>
      <p class="eyebrow">OUDS Web Components</p>
      <h1>Button playground</h1>
      <p>Vue mounts the page; the buttons are framework-independent custom elements.</p>
      <div class="theme-control">
        <ouds-button variant="minimal" :aria-pressed="isDark" @click="toggleTheme">
          Switch to {{ isDark ? "light" : "dark" }} theme
        </ouds-button>
        <span aria-live="polite">Current theme: {{ isDark ? "dark" : "light" }}</span>
      </div>
    </header>

    <section aria-labelledby="variants-title">
      <h2 id="variants-title">Variants</h2>
      <div class="button-row">
        <ouds-button @click="clicks++">Default</ouds-button>
        <ouds-button variant="strong" @click="clicks++">Strong</ouds-button>
        <ouds-button variant="brand" @click="clicks++">Brand</ouds-button>
        <ouds-button variant="minimal" @click="clicks++">Minimal</ouds-button>
        <ouds-button variant="negative" @click="clicks++">Negative</ouds-button>
      </div>
    </section>

    <section aria-labelledby="states-title">
      <h2 id="states-title">States and content</h2>
      <div class="button-row">
        <ouds-button disabled>Disabled</ouds-button>
        <ouds-button type="submit">Submit type</ouds-button>
        <ouds-button><span aria-hidden="true">★</span> Slotted content</ouds-button>
      </div>
    </section>

    <section aria-labelledby="tags-title">
      <h2 id="tags-title">Tags</h2>
      <ul class="tag-row" aria-label="Tag variants">
        <li><ouds-tag>Neutral</ouds-tag></li>
        <li><ouds-tag variant="accent">Accent</ouds-tag></li>
        <li><ouds-tag variant="positive">Ready</ouds-tag></li>
        <li><ouds-tag variant="info">Information</ouds-tag></li>
        <li><ouds-tag variant="warning">Maintenance</ouds-tag></li>
        <li><ouds-tag variant="negative">Failed</ouds-tag></li>
        <li><ouds-tag variant="accent" muted>Muted</ouds-tag></li>
        <li><ouds-tag size="small">Small</ouds-tag></li>
      </ul>
    </section>

    <p class="interaction" aria-live="polite">Button clicks: {{ clicks }}</p>
  </main>
</template>

<style>
:root {
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
}

.playground {
  display: grid;
  gap: 2rem;
  max-width: 60rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

header,
section {
  display: grid;
  gap: 0.75rem;
}

.theme-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
}

h2 {
  font-size: 1.25rem;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.interaction {
  font-weight: 700;
}
</style>
