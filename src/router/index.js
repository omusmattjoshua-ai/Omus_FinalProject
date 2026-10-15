import { createRouter, createWebHistory } from 'vue-router'

// TOPIC: ECMAScript Imports — each screen is a separate Vue component imported by its route.
import HomeView from '../views/HomeView.vue'
import CoachesView from '../views/CoachesView.vue'
import ClientsView from '../views/ClientsView.vue'
import SessionsView from '../views/SessionsView.vue'

// TOPIC: Components — Vue Router swaps the matching page into <RouterView>.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/coaches', name: 'coaches', component: CoachesView },
    { path: '/clients', name: 'clients', component: ClientsView },
    { path: '/sessions', name: 'sessions', component: SessionsView },
  ],
})

export default router
