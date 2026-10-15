<script setup>
import { computed, ref, watch } from 'vue'
import DataTable from '../components/DataTable.vue'
import PageHeader from '../components/PageHeader.vue'
import { readDraft, readList, saveDraft, saveList, starterClients, starterCoaches, sportSpecialties } from '../data/storage'

// TOPIC: Reactivity / ref() — all client page state is stored in refs.
const clients = ref(readList('cms-clients', starterClients))
const coaches = ref(readList('cms-coaches', starterCoaches))
const searchText = ref('')
const showForm = ref(true)
const defaultForm = { name: '', age: '', sport: '', goal: '', coach: '', membership: 'Active' }
const savedDraft = readDraft('cms-clients-draft', { form: defaultForm, editingId: null })
const editingId = ref(savedDraft.editingId)
const form = ref({ ...savedDraft.form })
const formError = ref('')
const formIsValid = computed(() => form.value.name.trim() && form.value.age !== '' && form.value.sport && form.value.goal.trim() && form.value.coach)
const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
  { key: 'goal', label: 'Training goal' },
  { key: 'coach', label: 'Assigned coach' },
  { key: 'membership', label: 'Membership' },
]

// TOPIC: Computed Properties — results react to both list updates and search input.
const filteredClients = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  if (!query) return clients.value
  return clients.value.filter((client) => Object.values(client).some((value) => String(value).toLowerCase().includes(query)))
})

watch(clients, (newClients) => saveList('cms-clients', newClients), { deep: true })
watch([form, editingId], ([newForm, newEditingId]) => {
  saveDraft('cms-clients-draft', { form: newForm, editingId: newEditingId })
}, { deep: true })

function resetForm() {
  // Clear fields and return to create mode.
  form.value = { ...defaultForm }
  editingId.value = null
  formError.value = ''
}

function saveClient() {
  // Only save a profile after its required fields have passed validation.
  if (!formIsValid.value) {
    formError.value = 'Please complete every required field.'
    return
  }

  const client = {
    id: editingId.value ?? Date.now(),
    name: form.value.name.trim(),
    age: Number(form.value.age),
    sport: form.value.sport,
    goal: form.value.goal.trim(),
    coach: form.value.coach,
    membership: form.value.membership,
  }
  if (editingId.value === null) clients.value.push(client)
  else clients.value = clients.value.map((item) => (item.id === editingId.value ? client : item))
  resetForm()
}

function editClient(client) {
  // Fill the form with a copy of the chosen athlete profile.
  editingId.value = client.id
  form.value = { ...client, age: String(client.age) }
  formError.value = ''
  showForm.value = true
}

function deleteClient(id) {
  // Confirm first so a mistaken click cannot remove an athlete silently.
  if (window.confirm('Delete this athlete? This action cannot be undone.')) {
    clients.value = clients.value.filter((client) => client.id !== id)
    if (editingId.value === id) resetForm()
  }
}
</script>

<template>
  <section>
    <PageHeader title="Clients & athletes" subtitle="Keep athlete goals, coach assignments, and memberships organized." />
    <div class="toolbar">
      <label class="search-control"><span aria-hidden="true">⌕</span><input v-model="searchText" type="search" :placeholder="'Search athletes, goals, or coaches…'" aria-label="Search athletes" /></label>
      <button class="button button-primary" type="button" @click="showForm = !showForm">{{ showForm ? 'Hide form' : 'Add athlete' }}</button>
    </div>

    <section v-show="showForm" class="form-panel">
      <div class="section-heading">
        <div><p class="eyebrow">{{ editingId === null ? 'NEW PROFILE' : 'UPDATE PROFILE' }}</p><h2>{{ editingId === null ? 'Add an athlete' : 'Edit athlete' }}</h2></div>
        <button v-if="editingId !== null" class="text-button" type="button" @click="resetForm">Cancel edit</button>
      </div>
      <form class="record-form" @submit.prevent="saveClient">
        <label>Full name<input v-model="form.name" :placeholder="'e.g. Jamie Park'" required /></label>
        <label>Age<input v-model="form.age" type="number" min="1" max="120" :placeholder="'e.g. 18'" required /></label>
        <label>Sport
          <select v-model="form.sport" required>
            <option disabled value="">Choose a sport</option>
            <option v-for="sport in sportSpecialties" :key="sport" :value="sport">{{ sport }}</option>
          </select>
        </label>
        <label>Training goal<input v-model="form.goal" :placeholder="'e.g. Build endurance'" required /></label>
        <label>Assigned coach
          <select v-model="form.coach" required>
            <option disabled value="">Choose a coach</option>
            <option v-for="coach in coaches" :key="coach.id" :value="coach.name">{{ coach.name }}</option>
          </select>
        </label>
        <label>Membership
          <select :value="form.membership" @change="form.membership = $event.target.value">
            <option>Active</option><option>Paused</option><option>Expired</option>
          </select>
        </label>
        <div class="form-submit"><button class="button button-primary" type="submit" :disabled="!formIsValid">{{ editingId === null ? 'Add athlete' : 'Save changes' }}</button></div>
      </form>
      <p v-if="formError" class="form-error">{{ formError }}</p>
    </section>

    <section class="list-panel">
      <div class="section-heading"><div><p class="eyebrow">ATHLETE DIRECTORY</p><h2>All athletes <span class="count-chip">{{ filteredClients.length }}</span></h2></div></div>
      <DataTable :items="filteredClients" :columns="columns" @edit="editClient" @delete="deleteClient" />
      <p v-if="coaches.length === 0" class="helper-note">Add a coach before creating an athlete profile.</p>
    </section>
  </section>
</template>
