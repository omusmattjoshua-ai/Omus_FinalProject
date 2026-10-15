<script setup>
// TOPIC: Props — items and column labels describe the table without tying it to one page.
defineProps({
  items: { type: Array, required: true },
  columns: { type: Array, required: true },
})

// TOPIC: Props and Emits — events let the parent page perform the actual edit or delete.
const emit = defineEmits(['edit', 'delete'])

function badgeClass(value) {
  const status = String(value).toLowerCase()
  if (['active', 'completed'].includes(status)) return 'badge-green'
  if (['cancelled', 'expired'].includes(status)) return 'badge-red'
  if (['scheduled', 'paused'].includes(status)) return 'badge-yellow'
  return 'badge-neutral'
}
</script>

<template>
  <div class="table-scroll">
    <table v-if="items.length > 0" class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
          <th class="actions-heading">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- TOPIC: Looping over Arrays — each row and cell has a stable key. -->
        <tr v-for="item in items" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            <span
              v-if="column.key === 'status' || column.key === 'membership'"
              :class="['status-badge', badgeClass(item[column.key])]"
            >
              {{ item[column.key] }}
            </span>
            <span v-else>{{ item[column.key] }}</span>
          </td>
          <td class="row-actions">
            <button class="button button-small button-quiet" type="button" @click="emit('edit', item)">Edit</button>
            <button class="button button-small button-delete" type="button" @click="emit('delete', item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- TOPIC: Conditionally Displaying HTML Elements — show an empty result message when there are no rows. -->
    <p v-else class="empty-state">No matching records found. Try another search or add a record.</p>
  </div>
</template>
