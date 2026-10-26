<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import MobileSideMenu from "./components/ui/sidemenu/MobileSideMenu.vue";
import SideMenu from "./components/ui/sidemenu/SideMenu.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <TheHeader />
    <MobileSideMenu />
    <div class="flex-grow-1">
      <div class="container-fluid container-max-width py-medium">
        <div class="row">
          <div class="d-none lg:d-block col-2">
            <SideMenu />
          </div>
          <div class="col-12 lg:col-10">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
