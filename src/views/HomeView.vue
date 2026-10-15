<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import { readList, starterCoaches, starterClients, starterSessions } from '../data/storage'

// TOPIC: Reactivity / ref() — values loaded from localStorage are held in reactive references.
const coaches = ref(readList('cms-coaches', starterCoaches))
const clients = ref(readList('cms-clients', starterClients))
const sessions = ref(readList('cms-sessions', starterSessions))

// TOPIC: Computed Properties — totals update automatically as the saved lists change.
const totalCoachCount = computed(() => coaches.value.length)
const activeCoachCount = computed(() => coaches.value.filter((coach) => coach.status === 'Active').length)
const totalClientCount = computed(() => clients.value.length)
const completedSessionCount = computed(() => sessions.value.filter((session) => session.status === 'Completed').length)
</script>

<template>
  <section class="home-page">
    <div class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">TRAIN WITH PURPOSE</p>
        <!-- TOPIC: Text Interpolation — {{ }} outputs the title, totals, and other live data. -->
        <h1>Coaching<br />Management<br /><span>System</span></h1>
        <p class="hero-description">
          Plan coaching schedules, manage athlete progress, and keep every session organized in one easy workspace.
        </p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" :to="'/sessions'">View schedule <span aria-hidden="true">↗</span></RouterLink>
          <RouterLink class="button button-outline" :to="'/coaches'">Meet the coaches</RouterLink>
        </div>
      </div>
      <div class="hero-art">
        <div class="floating-card card-one">
          <span>Coach</span>
          <strong>Performance</strong>
        </div>
        <div class="floating-card card-two">
          <span>Progress</span>
          <strong>+18%</strong>
        </div>
        <div class="floating-card card-three">
          <span>Sessions</span>
          <strong>24 this week</strong>
        </div>
        <div class="hero-art-label"><span class="pulse-dot"></span> Live overview</div>
      </div>
    </div>

    <div class="home-stats">
      <StatCard title="Registered coaches" :value="totalCoachCount" note="Your coaching team" />
      <StatCard title="Active coaches" :value="activeCoachCount" note="Ready to coach" accent="#4269c5" />
      <StatCard title="Athletes" :value="totalClientCount" note="Growing every day" accent="#d08a2f" />
      <StatCard title="Sessions completed" :value="completedSessionCount" note="Progress in motion" accent="#7957b5" />
    </div>

    <PageHeader
      eyebrow="YOUR WORKSPACE"
      title="Everything in one place"
      subtitle="Jump into a section to manage your day-to-day coaching operations."
    />
    <div class="feature-grid">
      <RouterLink class="feature-card" :to="'/coaches'">
        <span class="feature-icon icon-green">01</span>
        <h2>Coach directory</h2>
        <p>Keep specialties, experience, contact details, and coach availability up to date.</p>
        <span class="feature-link">Manage coaches <b>→</b></span>
      </RouterLink>
      <RouterLink class="feature-card" :to="'/clients'">
        <span class="feature-icon icon-blue">02</span>
        <h2>Athlete profiles</h2>
        <p>Track each athlete’s goals, assigned coach, age, and membership status.</p>
        <span class="feature-link">Manage athletes <b>→</b></span>
      </RouterLink>
      <RouterLink class="feature-card" :to="'/sessions'">
        <span class="feature-icon icon-orange">03</span>
        <h2>Session schedule</h2>
        <p>Plan upcoming coaching sessions and mark completed or cancelled visits.</p>
        <span class="feature-link">Manage sessions <b>→</b></span>
      </RouterLink>
    </div>
  </section>
</template>
