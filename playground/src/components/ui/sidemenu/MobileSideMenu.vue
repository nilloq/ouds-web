<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import SideMenu from "./SideMenu.vue";
import SvgIcon from "../SvgIcon.vue";

const route = useRoute();
const offcanvasId = "playgroundSideMenuOffcanvas";

function closeSideMenu() {
  // The OUDS bundle in playground/index.html handles the offcanvas data API.
  document
    .querySelector<HTMLButtonElement>(`#${offcanvasId} [data-bs-dismiss="offcanvas"]`)
    ?.click();
}

watch(() => route.fullPath, closeSideMenu);
</script>

<template>
  <div class="lg:d-none">
    <div class="border-bottom border-default border-thin bg-primary">
      <button
        class="btn"
        type="button"
        data-bs-toggle="offcanvas"
        :data-bs-target="`#${offcanvasId}`"
        :aria-controls="offcanvasId"
      >
        <SvgIcon name="side-panel-show-chevron" />
        Components menu
        <span class="visually-hidden">Open</span>
      </button>
    </div>

    <div
      :id="offcanvasId"
      class="offcanvas offcanvas-start bg-primary"
      tabindex="-1"
      :aria-labelledby="`${offcanvasId}Label`"
    >
      <div class="offcanvas-header">
        <h2 :id="`${offcanvasId}Label`" class="offcanvas-title">Components</h2>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close components menu"
        ></button>
      </div>
      <div class="offcanvas-body">
        <SideMenu />
      </div>
    </div>
  </div>
</template>
