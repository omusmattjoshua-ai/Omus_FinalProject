<script setup>
import { computed, ref, watch } from 'vue'
import DataTable from '../components/DataTable.vue'
import PageHeader from '../components/PageHeader.vue'
import { readDraft, readList, saveDraft, saveList, starterCoaches } from '../data/storage'

// TOPIC: Reactivity / ref() — the list, form, query, and form visibility are reactive.
const coaches = ref(readList('cms-coaches', starterCoaches))
const searchText = ref('')
const showForm = ref(true)
const defaultForm = { name: '', specialty: '', email: '', mobile: '', address: '', experience: '', status: 'Active' }
const savedDraft = readDraft('cms-coaches-draft', { form: defaultForm, editingId: null })
const editingId = ref(savedDraft.editingId)
const form = ref({ ...defaultForm, ...savedDraft.form })
const formError = ref('')
const formIsValid = computed(() => (
  form.value.name.trim()
  && form.value.specialty
  && form.value.email.trim()
  && form.value.mobile.trim()
  && form.value.address.trim()
  && form.value.experience !== ''
))
const sportSpecialties = [
  'Archery',
  'Athletics / Track and Field',
  'Badminton',
  'Baseball',
  'Basketball',
  'Boxing',
  'Cricket',
  'Cycling',
  'Dance',
  'Football / Soccer',
  'Golf',
  'Gymnastics',
  'Hockey',
  'Martial Arts',
  'Netball',
  'Rugby',
  'Running',
  'Swimming',
  'Table Tennis',
  'Tennis',
  'Volleyball',
  'Weightlifting',
  'Wrestling',
  'Strength & Conditioning',
  'Sports Nutrition',
  'Other',
]
const columns = [
  { key: 'name', label: 'Coach' },
  { key: 'specialty', label: 'Specialty' },
  { key: 'email', label: 'Email' },
  { key: 'mobile', label: 'Mobile number' },
  { key: 'address', label: 'Address' },
  { key: 'experience', label: 'Experience (years)' },
  { key: 'status', label: 'Status' },
]

// TOPIC: Computed Properties — search filters the source list without changing it.
const filteredCoaches = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  if (!query) return coaches.value
  return coaches.value.filter((coach) => Object.values(coach).some((value) => String(value).toLowerCase().includes(query)))
})

// TOPIC: Reactivity / ref() — watch persists every create, update, and delete.
watch(coaches, (newCoaches) => saveList('cms-coaches', newCoaches), { deep: true })
watch([form, editingId], ([newForm, newEditingId]) => {
  saveDraft('cms-coaches-draft', { form: newForm, editingId: newEditingId })
}, { deep: true })

function resetForm() {
  // Clear fields and leave edit mode so the next submit creates a new coach.
  form.value = { ...defaultForm }
  editingId.value = null
  formError.value = ''
}

function saveCoach() {
  // Check required data before converting it into a record.
  if (!formIsValid.value) {
    formError.value = 'Please complete every required field.'
    return
  }

  const coach = {
    id: editingId.value ?? Date.now(),
    name: form.value.name.trim(),
    specialty: form.value.specialty.trim(),
    email: form.value.email.trim(),
    mobile: form.value.mobile.trim(),
    address: form.value.address.trim(),
    experience: Number(form.value.experience),
    status: form.value.status,
  }

  if (editingId.value === null) coaches.value.push(coach)
  else coaches.value = coaches.value.map((item) => (item.id === editingId.value ? coach : item))

  resetForm()
}

function editCoach(coach) {
  // Copy the selected row into the form; copying avoids editing the table directly.
  editingId.value = coach.id
  form.value = { ...defaultForm, ...coach, experience: String(coach.experience) }
  formError.value = ''
  showForm.value = true
}

function deleteCoach(id) {
  // Ask before removing a record, then replace the reactive list without that id.
  if (window.confirm('Delete this coach? This action cannot be undone.')) {
    coaches.value = coaches.value.filter((coach) => coach.id !== id)
    if (editingId.value === id) resetForm()
  }
}
</script>

<template>
  <section>
    <PageHeader title="Coaches" subtitle="Manage your coaching team, specialties, and availability." />
    <div class="toolbar">
      <label class="search-control">
        <span aria-hidden="true">⌕</span>
        <input v-model="searchText" type="search" :placeholder="'Search coaches by name, specialty, or status…'" aria-label="Search coaches" />
      </label>
      <!-- TOPIC: Conditionally Displaying HTML Elements — v-show toggles the form without removing it. -->
      <button class="button button-primary" type="button" @click="showForm = !showForm">
        {{ showForm ? 'Hide form' : 'Add coach' }}
      </button>
    </div>

    <section v-show="showForm" class="form-panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ editingId === null ? 'NEW TEAM MEMBER' : 'UPDATE TEAM MEMBER' }}</p>
          <h2>{{ editingId === null ? 'Add a coach' : 'Edit coach' }}</h2>
        </div>
        <button v-if="editingId !== null" class="text-button" type="button" @click="resetForm">Cancel edit</button>
      </div>
      <form class="record-form" @submit.prevent="saveCoach">
        <label>Full name<input v-model="form.name" :placeholder="'e.g. Morgan Lee'" required /></label>
        <label>Specialty
          <select v-model="form.specialty" required>
            <option disabled value="">Choose a sport or specialty</option>
            <option v-for="sport in sportSpecialties" :key="sport" :value="sport">{{ sport }}</option>
          </select>
        </label>
        <label>Email<input v-model="form.email" type="email" :placeholder="'coach@example.com'" required /></label>
        <label>Mobile number<input v-model="form.mobile" type="tel" :placeholder="'e.g. 555-010-2020'" required /></label>
        <label>Address<input v-model="form.address" :placeholder="'Street, city, and region'" required /></label>
        <label>Experience (years)<input v-model="form.experience" type="number" min="0" :placeholder="'e.g. 5'" required /></label>
        <label>Status
          <select :value="form.status" @change="form.status = $event.target.value">
            <option>Active</option><option>Inactive</option>
          </select>
        </label>
        <div class="form-submit">
          <button class="button button-primary" type="submit" :disabled="!formIsValid">
            {{ editingId === null ? 'Add coach' : 'Save changes' }}
          </button>
        </div>
      </form>
      <p v-if="formError" class="form-error">{{ formError }}</p>
    </section>

    <section class="list-panel">
      <div class="section-heading">
        <div><p class="eyebrow">TEAM DIRECTORY</p><h2>All coaches <span class="count-chip">{{ filteredCoaches.length }}</span></h2></div>
      </div>
      <DataTable :items="filteredCoaches" :columns="columns" @edit="editCoach" @delete="deleteCoach" />
    </section>
  </section>
</template>
