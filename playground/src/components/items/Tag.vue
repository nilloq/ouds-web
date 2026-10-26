<script setup lang="ts">
import { OudsTag, tagVariants, tagSizes } from "@nilloq/ouds-web/vue";

const variantLabels = {
  neutral: "Neutral",
  accent: "Accent",
  positive: "Ready",
  info: "Information",
  warning: "Maintenance",
  negative: "Failed",
} satisfies Record<(typeof tagVariants)[number], string>;
</script>

<template>
  <main class="playground">
    <section aria-labelledby="tags-title">
      <h2 id="tags-title">Tags</h2>
      <ul class="list-unstyled d-flex flex-wrap gap-medium" aria-label="Tag variants">
        <li v-for="variant in tagVariants" :key="variant">
          <OudsTag
            :variant="variant"
            :status-icon="variant === 'positive'"
            :size="variant === 'positive' ? 'small' : 'medium'"
            >{{ variantLabels[variant] }}</OudsTag
          >
        </li>
        <li><OudsTag variant="accent" muted>Muted</OudsTag></li>
        <li v-for="size in tagSizes" :key="size">
          <OudsTag :size="size">{{ size === "medium" ? "Medium" : "Small" }}</OudsTag>
        </li>
      </ul>
    </section>
  </main>
</template>
