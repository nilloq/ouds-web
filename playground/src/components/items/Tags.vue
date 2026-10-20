<template>
  <main class="playground">
    <section aria-labelledby="tags-title">
      <h2 id="tags-title">Tags</h2>
      <ul class="list-unstyled d-flex flex-wrap gap-medium" aria-label="Tag variants">
        <li><ouds-tag>Neutral</ouds-tag></li>
        <li><ouds-tag variant="accent">Accent</ouds-tag></li>
        <li><ouds-tag variant="positive" status-icon="true" size="small">Ready</ouds-tag></li>
        <li><ouds-tag variant="info">Information</ouds-tag></li>
        <li><ouds-tag variant="warning">Maintenance</ouds-tag></li>
        <li><ouds-tag variant="negative">Failed</ouds-tag></li>
        <li><ouds-tag variant="accent" muted>Muted</ouds-tag></li>
        <li><ouds-tag size="small">Small</ouds-tag></li>
      </ul>
    </section>
  </main>
</template>
