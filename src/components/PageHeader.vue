<script setup>
// TOPIC: Props — defineProps receives reusable heading text from the parent page.
defineProps({
  eyebrow: { type: String, default: 'COACHING MANAGEMENT' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
})
</script>

<template>
  <div class="page-heading">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="page-subtitle">{{ subtitle }}</p>
  </div>
</template>
