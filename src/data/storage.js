// TOPIC: ECMAScript Imports — this shared module exports local-storage helpers and starter data.
export const sportSpecialties = [
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
  'Other',
]

const starterCoaches = [
  { id: 1, name: 'Maya Chen', specialty: 'Strength & Conditioning', email: 'maya@suello.example', mobile: '555-010-2020', address: '12 Summit Street', experience: 8, status: 'Active' },
  { id: 2, name: 'Jordan Reyes', specialty: 'Basketball', email: 'jordan@suello.example', mobile: '555-010-2021', address: '24 Court Avenue', experience: 5, status: 'Active' },
  { id: 3, name: 'Avery Brooks', specialty: 'Sports Nutrition', email: 'avery@suello.example', mobile: '555-010-2022', address: '38 Valley Road', experience: 11, status: 'Inactive' },
]

const starterClients = [
  { id: 1, name: 'Sam Rivera', age: 19, sport: 'Strength & Conditioning', goal: 'Build strength', coach: 'Maya Chen', membership: 'Active' },
  { id: 2, name: 'Taylor Morgan', age: 22, sport: 'Basketball', goal: 'Improve shooting', coach: 'Jordan Reyes', membership: 'Active' },
  { id: 3, name: 'Riley Patel', age: 17, sport: 'Running', goal: 'Improve endurance', coach: 'Maya Chen', membership: 'Paused' },
]

const starterSessions = [
  { id: 1, client: 'Sam Rivera', coach: 'Maya Chen', date: '2026-10-18', time: '09:00', status: 'Scheduled' },
  { id: 2, client: 'Taylor Morgan', coach: 'Jordan Reyes', date: '2026-10-12', time: '14:30', status: 'Completed' },
  { id: 3, client: 'Riley Patel', coach: 'Maya Chen', date: '2026-10-20', time: '11:00', status: 'Scheduled' },
]

// TOPIC: Reactivity / ref() — readList supplies plain starting values for a page's reactive ref.
export function readList(key, starterItems) {
  const savedItems = localStorage.getItem(key)
  return savedItems === null ? starterItems : JSON.parse(savedItems)
}

// Save after each list change so updates are still present after a refresh.
export function saveList(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

// Keep unfinished form entries separate from saved records so they can be resumed after refresh.
export function readDraft(key, defaultDraft) {
  const savedDraft = localStorage.getItem(key)
  return savedDraft === null ? defaultDraft : JSON.parse(savedDraft)
}

export function saveDraft(key, draft) {
  localStorage.setItem(key, JSON.stringify(draft))
}

export { starterCoaches, starterClients, starterSessions }
