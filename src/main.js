import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// TOPIC: Intro to VueJS — Vue builds this SPA from components and swaps routes without reloading the page.
// TOPIC: Environment & Requirements — Vite serves this app locally; Node.js and npm commands are in README.md.
// TOPIC: ECMAScript Imports — createApp, the root component, router, and CSS are imported as modules.
createApp(App).use(router).mount('#app')
