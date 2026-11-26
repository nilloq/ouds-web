<script setup lang="ts">
defineProps<{ output: string }>();
</script>

<template>
  <section
    class="border-bottom border-default bg-secondary p-medium"
    aria-label="Playground output"
  >
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-small">
      <div>
        <p class="fw-bold mb-xsmall">Playground output</p>
        <p role="status" aria-live="polite" aria-atomic="true" class="mb-none text-break">
          <code>{{ output || "No interaction yet" }}</code>
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>
