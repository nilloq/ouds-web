<script setup lang="ts">
import { useId } from "vue";
import { useStore } from "../../../utils/store";

const { codeDisplayMode } = useStore();
const id = useId();
</script>

<template>
  <div class="mb-small">
    <p class="mb-xsmall text-muted">Code display mode</p>
    <ul class="chips-container" aria-label="Code display">
      <li class="chip chip-filter">
        <input :id="`${id}-html`" v-model="codeDisplayMode" type="radio" :name="id" value="html" />
        <label class="chip-interactive" :for="`${id}-html`">HTML</label>
      </li>
      <li class="chip chip-filter">
        <input :id="`${id}-vue`" v-model="codeDisplayMode" type="radio" :name="id" value="vue" />
        <label class="chip-interactive" :for="`${id}-vue`">Vue</label>
      </li>
    </ul>
  </div>
</template>
