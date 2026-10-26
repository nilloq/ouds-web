<script setup lang="ts">
import CodeDisplayMode from "./CodeDisplayMode.vue";
</script>

<template>
  <div>
    <CodeDisplayMode />
    <p class="mb-xsmall text-muted">Components</p>
    <ul class="list-group list-unstyled">
      <li>
        <RouterLink to="/components/button" class="list-group-item list-group-item-action">
          Button
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/components/checkbox" class="list-group-item list-group-item-action">
          Checkbox
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/components/select" class="list-group-item list-group-item-action">
          Select
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/components/tag" class="list-group-item list-group-item-action">
          Tag
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/components/text-input" class="list-group-item list-group-item-action">
          Text Input
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.list-group-item {
  display: block;
  width: 100%;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: var(--bs-color-surface-secondary);
}

.list-group-item.active {
  border-left: 4px solid var(--bs-color-surface-brand-primary);
  background-color: var(--bs-color-surface-secondary);
}
</style>
