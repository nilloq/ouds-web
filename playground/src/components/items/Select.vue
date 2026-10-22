<script setup lang="ts">
import { ref } from "vue";
import { OudsSelect } from "@nilloq/ouds-web/vue";

const value = ref("");
</script>

<template>
  <div class="d-flex flex-column gap-small">
    <OudsSelect
      v-model="value"
      label="Select"
      :options="[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ]"
    />
  </div>
</template>
