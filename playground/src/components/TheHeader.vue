<script setup lang="ts">
import ThemeSwitch from "./ui/ThemeSwitch.vue";
</script>

<template>
  <header>
    <nav class="navbar lg:navbar-expand" aria-label="Global navigation">
      <div class="container-fluid container-max-width">
        <div class="navbar-brand me-auto lg:me-xlarge">
          <a class="stretched-link" href="/">
            <img
              src="../assets/img/orange-logo.svg"
              width="50"
              height="50"
              alt="OUDS Web - Back to Home"
              loading="lazy"
            />
          </a>
          <h1 class="title">OUDS Web Components</h1>
        </div>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".global-header-1"
          aria-controls="global-header-1.1 global-header-1.2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="global-header-1.1" class="navbar-collapse collapse lg:me-auto global-header-1">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="/components" aria-current="page">Components</a>
            </li>
          </ul>
        </div>
        <div id="global-header-1.2" class="navbar-collapse collapse global-header-1">
          <ul class="navbar-nav">
            <ThemeSwitch />
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
