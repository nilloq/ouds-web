<script setup lang="ts">
import { useStore } from "../../utils/store";

const { codeDisplayMode } = useStore();
</script>

<template>
  <div>
    <div class="mb-small">
      <p class="mb-xsmall text-muted">Code display</p>
      <ul class="chips-container" aria-label="Code display">
        <li class="chip chip-filter">
          <input v-model="codeDisplayMode" type="radio" id="html" name="radio" value="html" />
          <label class="chip-interactive" for="html">HTML</label>
        </li>
        <li class="chip chip-filter">
          <input v-model="codeDisplayMode" type="radio" id="vue" name="radio" value="vue" />
          <label class="chip-interactive" for="vue">Vue</label>
        </li>
      </ul>
    </div>
    <ul class="list-group list-unstyled">
      <li>
        <RouterLink
          to="/components/button"
          class="list-group-item list-group-item-action border-none"
        >
          <span class="d-flex align-items-center">
            <span class="ms-small">Button</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/components/checkbox"
          class="list-group-item list-group-item-action border-none"
        >
          <span class="d-flex align-items-center">
            <span class="ms-small">Checkbox</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/components/select"
          class="list-group-item list-group-item-action border-none"
        >
          <span class="d-flex align-items-center">
            <span class="ms-small">Select</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/components/tag" class="list-group-item list-group-item-action border-none">
          <span class="d-flex align-items-center">
            <span class="ms-small">Tag</span>
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/components/text-input"
          class="list-group-item list-group-item-action border-none"
        >
          <span class="d-flex align-items-center">
            <span class="ms-small">Text Input</span>
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
