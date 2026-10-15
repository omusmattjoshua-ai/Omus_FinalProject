<script setup>
import { computed, ref, watch } from 'vue'
import DataTable from '../components/DataTable.vue'
import PageHeader from '../components/PageHeader.vue'
import { readDraft, readList, saveDraft, saveList, starterClients, starterCoaches, starterSessions } from '../data/storage'

// TOPIC: Reactivity / ref() — sessions, dropdown options, form, and search are reactive refs.
const sessions = ref(readList('cms-sessions', starterSessions))
const clients = ref(readList('cms-clients', starterClients))
const coaches = ref(readList('cms-coaches', starterCoaches))
const searchText = ref('')
const showForm = ref(true)
const defaultForm = { client: '', coach: '', date: '', time: '', status: 'Scheduled' }
const savedDraft = readDraft('cms-sessions-draft', { form: defaultForm, editingId: null })
const editingId = ref(savedDraft.editingId)
const form = ref({ ...savedDraft.form })
const formError = ref('')
const formIsValid = computed(() => form.value.client && form.value.coach && form.value.date && form.value.time)
const columns = [
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'client', label: 'Athlete' },
  { key: 'coach', label: 'Coach' },
  { key: 'status', label: 'Status' },
]

// TOPIC: Computed Properties — completed sessions and filtered rows stay in sync with refs.
const totalSessionCount = computed(() => sessions.value.length)
const completedCount = computed(() => sessions.value.filter((session) => session.status === 'Completed').length)
const filteredSessions = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  if (!query) return sessions.value
  return sessions.value.filter((session) => Object.values(session).some((value) => String(value).toLowerCase().includes(query)))
})

watch(sessions, (newSessions) => saveList('cms-sessions', newSessions), { deep: true })
watch([form, editingId], ([newForm, newEditingId]) => {
  saveDraft('cms-sessions-draft', { form: newForm, editingId: newEditingId })
}, { deep: true })

function resetForm() {
  // Clear the session fields and restore the default scheduled status.
  form.value = { ...defaultForm }
  editingId.value = null
  formError.value = ''
}

function saveSession() {
  // Reuse the save handler for both creating a session and editing one.
  if (!formIsValid.value) {
    formError.value = 'Please complete every required field.'
    return
  }
  const session = { id: editingId.value ?? Date.now(), ...form.value }
  if (editingId.value === null) sessions.value.push(session)
  else sessions.value = sessions.value.map((item) => (item.id === editingId.value ? session : item))
  resetForm()
}

function editSession(session) {
  // Put the chosen schedule row into the editable form.
  editingId.value = session.id
  form.value = { ...session }
  formError.value = ''
  showForm.value = true
}

function deleteSession(id) {
  // Require confirmation before removing a session from the schedule.
  if (window.confirm('Delete this session? This action cannot be undone.')) {
    sessions.value = sessions.value.filter((session) => session.id !== id)
    if (editingId.value === id) resetForm()
  }
}
</script>

<template>
  <section>
    <PageHeader title="Sessions & schedule" subtitle="Plan coaching time and keep every session’s status up to date." />
    <div class="schedule-summary">
      <span class="summary-mark">✓</span>
      <p><strong>{{ completedCount }}</strong> coaching sessions completed</p>
      <span class="summary-divider"></span>
      <p>{{ totalSessionCount }} total sessions in your schedule</p>
    </div>
    <div class="toolbar">
      <label class="search-control"><span aria-hidden="true">⌕</span><input v-model="searchText" type="search" :placeholder="'Search by athlete, coach, date, or status…'" aria-label="Search sessions" /></label>
      <button class="button button-primary" type="button" @click="showForm = !showForm">{{ showForm ? 'Hide form' : 'Add session' }}</button>
    </div>

    <section v-show="showForm" class="form-panel">
      <div class="section-heading">
        <div><p class="eyebrow">{{ editingId === null ? 'PLAN A SESSION' : 'UPDATE SESSION' }}</p><h2>{{ editingId === null ? 'Schedule a session' : 'Edit session' }}</h2></div>
        <button v-if="editingId !== null" class="text-button" type="button" @click="resetForm">Cancel edit</button>
      </div>
      <form class="record-form" @submit.prevent="saveSession">
        <label>Athlete
          <select v-model="form.client" required>
            <option disabled value="">Choose an athlete</option>
            <option v-for="client in clients" :key="client.id" :value="client.name">{{ client.name }}</option>
          </select>
        </label>
        <label>Coach
          <select v-model="form.coach" required>
            <option disabled value="">Choose a coach</option>
            <option v-for="coach in coaches" :key="coach.id" :value="coach.name">{{ coach.name }}</option>
          </select>
        </label>
        <label>Date<input v-model="form.date" type="date" required /></label>
        <label>Time<input v-model="form.time" type="time" required /></label>
        <label>Status
          <select :value="form.status" @change="form.status = $event.target.value">
            <option>Scheduled</option><option>Completed</option><option>Cancelled</option>
          </select>
        </label>
        <div class="form-submit"><button class="button button-primary" type="submit" :disabled="!formIsValid">{{ editingId === null ? 'Add session' : 'Save changes' }}</button></div>
      </form>
      <p v-if="formError" class="form-error">{{ formError }}</p>
      <p v-if="clients.length === 0 || coaches.length === 0" class="helper-note">Create at least one athlete and one coach before scheduling a session.</p>
    </section>

    <section class="list-panel">
      <div class="section-heading"><div><p class="eyebrow">SESSION PLANNER</p><h2>All sessions <span class="count-chip">{{ filteredSessions.length }}</span></h2></div></div>
      <DataTable :items="filteredSessions" :columns="columns" @edit="editSession" @delete="deleteSession" />
    </section>
  </section>
</template>
