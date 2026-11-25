<script setup lang="ts">
defineProps<{
  component: string;
  label: string;
}>();
</script>

<template>
  <a
    class="btn btn-default ms-auto flex-shrink-0"
    :href="`https://web.unified-design-system.orange.com/orange/docs/1.6/components/${component}/`"
    target="_blank"
    rel="noopener noreferrer"
  >
    OUDS documentation<span class="visually-hidden"> for {{ label }}</span>
  </a>
</template>
