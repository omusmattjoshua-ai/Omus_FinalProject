# Coaching Management System

A beginner-friendly, responsive single-page application for managing a coaching team, athlete profiles, and coaching sessions. Built for the DC 301 Vue.js lab exam using Vue 3, the Composition API, `<script setup>`, Vite, and Vue Router.

## What are Vue and an SPA?

Vue is a JavaScript framework for building interactive user interfaces from reusable components. Its reactivity system updates the page when data changes, without manually rewriting HTML.

A Single Page Application (SPA) loads one HTML page and updates the visible screen as the user navigates. Vue Router changes between the Home, Coaches, Clients, and Sessions views without a full-page reload.

## Environment and setup

Requirements:

- Node.js (current LTS recommended) and npm
- Visual Studio Code (recommended editor)
- Vite (the development server and build tool; installed with this project)
- Vue 3 and Vue Router (installed with this project)

### Create a new project from scratch

The current workspace is already scaffolded and has Vue Router installed. To reproduce the setup in a new folder:

```bash
npm create vue@latest
```

At the prompts, choose a project name, select **Vue Router** only, and choose **No** for TypeScript, Pinia, testing, and the other optional features. Then enter the new project folder, replace its starter files with the source files described below, and run:

```bash
npm install
npm run dev
```

Vite prints the local development URL (usually `http://localhost:5173`). Open that address in a browser. Stop the server with `Ctrl+C`.

For this already-created copy, use:

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Features

- Four Vue Router pages: Home, Coaches, Clients & Athletes, and Sessions & Schedule
- Create, read, update, and delete actions for all three record types
- Coach profiles include email, mobile number, address, experience, and a sports specialty selected from a dropdown list
- Athlete profiles include a required sport selection from the available sports dropdown
- Required-field validation and email / numeric input constraints
- Search across each list and an empty-result message
- Confirmation before deleting a record
- Reactive Vue state saved to browser `localStorage` (no backend required)
- Unfinished form entries saved separately so they remain available after refreshing
- Seed records to make the first launch immediately demo-ready
- Shared active-state navigation, page headings, statistic cards, and a reusable data table
- Responsive plain-CSS layout with status colors: green (active/completed), yellow (scheduled/paused), and red (cancelled/expired)

The sample data is stored in this browser only. Use the browser developer tools to clear the `cms-coaches`, `cms-clients`, and `cms-sessions` localStorage entries if you want to restore the starter records.

## Folder structure

```text
coaching_management_system/
├── index.html                 # Vite HTML entry point and page metadata
├── package.json               # npm scripts and Vue/Vite/Vue Router dependencies
├── package-lock.json          # Exact npm dependency versions
├── vite.config.js             # Vite configuration with Vue SFC support
├── README.md                  # Setup, feature list, topic mapping, and demo guide
├── public/                    # Static files served as-is by Vite
├── src/
│   ├── main.js                # Creates the app and installs Vue Router
│   ├── App.vue                # Shared layout, navbar, router view, and footer
│   ├── style.css              # Shared responsive design system
│   ├── assets/
│   │   └── hero.png           # Home page hero artwork
│   ├── components/
│   │   ├── NavBar.vue         # Shared active-link navigation
│   │   ├── PageHeader.vue     # Reusable page title and subtitle
│   │   ├── StatCard.vue       # Reusable dashboard statistic
│   │   └── DataTable.vue      # Reusable list, status badges, and row actions
│   ├── data/
│   │   └── storage.js         # Starter records and localStorage helper functions
│   ├── router/
│   │   └── index.js           # Home, Coaches, Clients, and Sessions routes
│   └── views/
│       ├── HomeView.vue       # Overview, feature cards, and live counts
│       ├── CoachesView.vue    # Coach CRUD and search
│       ├── ClientsView.vue    # Athlete CRUD and search
│       └── SessionsView.vue  # Session CRUD, status, and search
└── node_modules/              # Installed dependencies (not committed)
```

## Topic-to-file mapping

| Exam topic | Where to demonstrate it |
| --- | --- |
| 1. Intro to VueJS and SPA | This README; `src/main.js`, `src/App.vue`, and `src/router/index.js` show the app lifecycle and SPA routes. |
| 2. Environment and requirements | Setup section above; `package.json` and `vite.config.js`. |
| 3. Text interpolation (`{{ }}`) | `src/components/PageHeader.vue`, `StatCard.vue`, `DataTable.vue`, and the view templates. |
| 4. Reactivity / `ref()` | All page state in `src/views/*.vue`; persistence helper in `src/data/storage.js`. |
| 5. Attribute binding | `src/components/NavBar.vue` (`:to`, `:href`, `:class`), `StatCard.vue` (`:style`), `DataTable.vue`, and the CRUD forms (`:placeholder`, `:value`, `:disabled`). |
| 6. Looping with `v-for` and `:key` | `NavBar.vue`, `DataTable.vue`, and the client/session form dropdowns. |
| 7. Conditional display | `DataTable.vue` uses `v-if`/`v-else` for the table and empty message; CRUD views use `v-if` and `v-show` for form controls. |
| 8. Computed properties | `HomeView.vue` counts and all three CRUD views' search results; `SessionsView.vue` completed-session count. |
| 9. Components | `src/components/` contains `NavBar`, `PageHeader`, `StatCard`, and reusable `DataTable`. |
| 10. ECMAScript imports | `src/main.js`, `src/router/index.js`, all views, and `src/data/storage.js`. |
| 11. Props and emits | `PageHeader.vue`, `StatCard.vue`, and `DataTable.vue` use `defineProps`; `DataTable.vue` uses `defineEmits` for edit/delete. |
| 12. Class/object binding and styles | `NavBar.vue` active-link object binding, `DataTable.vue` status badge class array, and `StatCard.vue` inline style object. |

## Quick class presentation

1. **Home:** Introduce the dashboard and explain that the statistic cards are computed from reactive data.
2. **Coaches:** Demonstrate adding a coach, searching, editing a row, changing status, and confirming deletion.
3. **Clients & athletes:** Add an athlete and assign a coach; explain that dropdown choices come from coach data.
4. **Sessions & schedule:** Schedule a session for an athlete and coach, edit it to Completed, then delete a test session.
5. Refresh the browser to show that localStorage retained the records.
