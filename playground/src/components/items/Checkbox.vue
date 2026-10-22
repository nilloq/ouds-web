<script setup lang="ts">
import { ref } from "vue";
import { OudsCheckbox } from "@nilloq/ouds-web/vue";

const value = ref(false);
</script>

<template>
  <div class="d-flex flex-column gap-small">
    <OudsCheckbox v-model="value" label="Checkbox" />
  </div>
</template>
