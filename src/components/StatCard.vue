<script setup>
// TOPIC: Props — the parent supplies each card's title, value, helper note, and accent color.
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  note: { type: String, required: true },
  accent: { type: String, default: '#1c8c68' },
})
</script>

<template>
  <article class="stat-card" :style="{ '--card-accent': accent }">
    <p>{{ title }}</p>
    <strong>{{ value }}</strong>
    <span>{{ note }}</span>
  </article>
</template>
