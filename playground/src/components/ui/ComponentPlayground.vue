<script setup lang="ts">
import { OudsButton } from "@nilloq/ouds-web/vue";
import CodeBlock from "./CodeBlock.vue";

defineProps<{
  title: string;
  description: string;
  code: string;
  language: "html" | "vue";
}>();

defineEmits<{
  reset: [];
}>();
</script>

<template>
  <section
    class="border border-default rounded-large overflow-hidden"
    :aria-label="`${title} playground`"
  >
    <div
      class="border-bottom border-default p-medium d-flex justify-content-between align-items-center"
    >
      <div>
        <h2>Interactive playground</h2>
        <p class="mb-none">{{ description }}</p>
      </div>
      <OudsButton size="small" type="button" @click="$emit('reset')">Reset</OudsButton>
    </div>

    <div class="row">
      <div class="col-12 md:col-6">
        <div class="d-flex flex-column justify-content-center bg-secondary p-medium h-100">
          <slot name="preview" />
        </div>
      </div>
      <div class="col-12 md:col-6">
        <form class="p-medium" @submit.prevent>
          <slot name="controls" />
        </form>
      </div>
    </div>

    <div class="border-top border-default">
      <CodeBlock :code="code" :language="language" :aria-label="`${language} example code`" />
    </div>
  </section>
</template>
