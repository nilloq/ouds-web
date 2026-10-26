<script setup lang="ts">
const components = [
  {
    name: "Button",
    path: "/components/button",
    description: "Actions that let people submit, navigate, or move through a flow.",
  },
  {
    name: "Checkbox",
    path: "/components/checkbox",
    description: "A control for selecting one or more options from a set.",
  },
  {
    name: "Select",
    path: "/components/select",
    description: "A form control for choosing an option from a list.",
  },
  {
    name: "Tag",
    path: "/components/tag",
    description: "A compact label for showing status, category, or metadata.",
  },
  {
    name: "Text Input",
    path: "/components/text-input",
    description: "A form control for entering and editing text.",
  },
];
</script>

<template>
  <main aria-labelledby="components-title">
    <header class="mb-large">
      <p class="text-muted">OUDS Web</p>
      <h1 id="components-title">Components</h1>
      <p>
        Explore the components available in this package. Open a component to try its options and
        view examples for Vue and custom elements.
      </p>
    </header>

    <ul class="row list-unstyled row-gap-medium" aria-label="Available components">
      <li v-for="component in components" :key="component.path" class="col-12 md:col-6 lg:col-4">
        <RouterLink
          class="link link-chevron d-flex p-3 border border-default h-100 justify-content-between align-items-center p-small"
          :to="component.path"
        >
          <span class="d-flex flex-column">
            <span class="fw-bold">{{ component.name }}</span>
            <span class="fw-normal">{{ component.description }}</span>
          </span>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
