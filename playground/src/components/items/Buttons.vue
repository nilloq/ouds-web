<script setup lang="ts">
import { ref } from "vue";

const clicks = ref(0);
</script>

<template>
  <main class="playground">
    <section aria-labelledby="variants-title">
      <h2 id="variants-title">Variants</h2>
      <div class="d-flex flex-wrap gap-medium">
        <ouds-button @click="clicks++">Default</ouds-button>
        <ouds-button variant="strong" @click="clicks++">Strong</ouds-button>
        <ouds-button variant="brand" @click="clicks++">Brand</ouds-button>
        <ouds-button variant="minimal" @click="clicks++">Minimal</ouds-button>
        <ouds-button variant="negative" @click="clicks++">Negative</ouds-button>
      </div>
    </section>

    <section aria-labelledby="states-title">
      <h2 id="states-title">States and content</h2>
      <div class="d-flex flex-wrap gap-medium">
        <ouds-button disabled>Disabled</ouds-button>
        <ouds-button type="submit">Submit type</ouds-button>
        <ouds-button><span aria-hidden="true">★</span> Slotted content</ouds-button>
      </div>
    </section>

    <p class="interaction" aria-live="polite">Button clicks: {{ clicks }}</p>
  </main>
</template>
