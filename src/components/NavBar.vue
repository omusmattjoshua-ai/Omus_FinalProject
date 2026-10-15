<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Clients', to: '/clients' },
  { label: 'Sessions', to: '/sessions' },
]
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" :to="'/'" aria-label="Coaching Management System home">
      <img
        class="brand-logo"
        src="https://thumbs.dreamstime.com/b/abstract-sports-coach-stands-his-back-t-shirt-baseball-cap-background-coaching-theme-splash-191918960.jpg"
        alt=""
      />
      <span>COACHING<span class="brand-light"> MANAGEMENT</span></span>
    </RouterLink>
    <nav class="main-nav" aria-label="Main navigation">
      <!-- TOPIC: Class & Object Binding — RouterLink supplies its active state for this object binding. -->
      <RouterLink
        v-for="link in links"
        :key="link.to"
        v-slot="{ href, navigate, isActive }"
        :to="link.to"
        custom
      >
        <a :href="href" :class="{ active: isActive }" @click="navigate">
          {{ link.label }}
        </a>
      </RouterLink>
    </nav>
  </header>
</template>
