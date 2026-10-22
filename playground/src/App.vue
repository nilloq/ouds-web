<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import SideMenu from "./components/ui/SideMenu.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <TheHeader />
    <div class="flex-grow-1">
      <div class="container-fluid container-max-width py-medium">
        <div class="row">
          <div class="col-2">
            <SideMenu />
          </div>
          <div class="col-10">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
