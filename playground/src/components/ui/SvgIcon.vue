<script setup lang="ts">
import { computed } from "vue";
const svgSprite = new URL("../../assets/img/solaris-icons-sprite.svg", import.meta.url).href;

const { name, size = 24 } = defineProps<{
  name: string;
  size?: number;
}>();

const iconSize = computed(() => `${size}px`);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :style="{ width: iconSize, height: iconSize }"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <use v-bind="{ 'xlink:href': `${svgSprite}#${name}` }" />
  </svg>
</template>
