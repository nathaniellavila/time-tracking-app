<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-4">Attendance Monitoring</h2>
    <v-card elevation="2" class="pa-4">
      <!-- Example: Date filter -->
      <v-row align="center" class="mb-4">
        <v-col cols="12" md="4">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="selectedDate"
                label="Select Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="selectedDate" @input="menu = false" />
          </v-menu>
        </v-col>
      </v-row>

      <!-- Example: Attendance table -->
      <v-data-table
        :headers="headers"
        :items="records"
        dense
        class="elevation-1"
      >
        <template #item.status="{ item }">
          <v-chip :color="statusColor(item.status)" dark>{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mdiCalendar } from '@mdi/js'

const menu = ref(false)
const selectedDate = ref(new Date().toISOString().substr(0, 10))

const headers = [
  { text: 'College ID', value: 'college_id' },
  { text: 'Name', value: 'name' },
  { text: 'Course', value: 'course' },
  { text: 'Date', value: 'date' },
  { text: 'Status', value: 'status' },
]

const records = ref([])

// Fake data loader (replace with your API call)
onMounted(() => {
  records.value = [
    { college_id: '2023-00123', name: 'Juan Dela Cruz', course: 'BSIT', date: selectedDate.value, status: 'Present' },
    { college_id: '2023-00124', name: 'Maria Santos', course: 'BSCS', date: selectedDate.value, status: 'Absent' },
  ]
})

function statusColor(status) {
  return {
    Present: 'green',
    Absent: 'red',
    Late: 'orange'
  }[status] || 'grey'
}
</script>
