<script setup lang="ts">
import { OudsTag } from "@nilloq/ouds-web/vue";
</script>

<template>
  <main class="playground">
    <section aria-labelledby="tags-title">
      <h2 id="tags-title">Tags</h2>
      <ul class="list-unstyled d-flex flex-wrap gap-medium" aria-label="Tag variants">
        <li><OudsTag>Neutral</OudsTag></li>
        <li><OudsTag variant="accent">Accent</OudsTag></li>
        <li><OudsTag variant="positive" :status-icon="true" size="small">Ready</OudsTag></li>
        <li><OudsTag variant="info">Information</OudsTag></li>
        <li><OudsTag variant="warning">Maintenance</OudsTag></li>
        <li><OudsTag variant="negative">Failed</OudsTag></li>
        <li><OudsTag variant="accent" muted>Muted</OudsTag></li>
        <li><OudsTag size="small">Small</OudsTag></li>
      </ul>
    </section>
  </main>
</template>
