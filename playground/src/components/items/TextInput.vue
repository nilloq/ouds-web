<script setup>
import { ref } from "vue";
import { OudsTextInput } from "@nilloq/ouds-web/vue";

const value = ref("");
</script>

<template>
  <div class="d-flex flex-column gap-small">
    <OudsTextInput v-model="value" label="Text input" placeholder="Enter text" />
  </div>
</template>
