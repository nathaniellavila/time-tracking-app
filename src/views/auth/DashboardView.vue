<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const error = ref(null)

const user = ref({
  email: 'sampleuser@example.com'
})

const attendance = ref([
  {
    id: 1,
    college_id: '2023-00123',
    first_name: 'Juan',
    last_name: 'Dela Cruz',
    middle_initial: 'M',
    course: 'BSIT',
    year_level: '3rd Year',
    date: '2025-04-20',
    status: 'Present'
  },
  {
    id: 2,
    college_id: '2023-00124',
    first_name: 'Maria',
    last_name: 'Santos',
    middle_initial: 'L',
    course: 'BSCS',
    year_level: '2nd Year',
    date: '2025-04-19',
    status: 'Absent'
  },
  {
    id: 3,
    college_id: '2023-00125',
    first_name: 'Pedro',
    last_name: 'Lopez',
    middle_initial: 'J',
    course: 'BSIT',
    year_level: '1st Year',
    date: '2025-04-18',
    status: 'Late'
  }
])

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const logout = () => {
  router.push('/')
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'present':
      return 'green'
    case 'absent':
      return 'red'
    case 'late':
      return 'orange'
    default:
      return 'grey'
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="#4B5320" title="Dashboard" dark>
      <v-spacer />
      <v-btn @click="logout" prepend-icon="mdi-logout" color="red">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-10">
        <h1 class="text-h4 font-weight-bold mb-4">Attendance Dashboard</h1>

        <!-- Loading Indicator -->
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>

        <!-- Error Message -->
        <p v-if="error" class="text-red-600">{{ error }}</p>

        <!-- User Info -->
        <p v-if="user && !loading" class="mb-6">
          Logged in as: <strong>{{ user.email }}</strong>
        </p>

        <!-- Section Header -->
        <v-card class="mb-4 pa-4" elevation="2" color="grey-lighten-4">
          <h2 class="text-h6 font-weight-medium mb-0">
            📋 Student Attendance Records
          </h2>
        </v-card>

        <!-- Attendance Table -->
        <v-data-table
          v-if="attendance.length && !loading"
          :headers="[
            { text: 'College ID', value: 'college_id' },
            { text: 'First Name', value: 'first_name' },
            { text: 'Last Name', value: 'last_name' },
            { text: 'M.I.', value: 'middle_initial' },
            { text: 'Course', value: 'course' },
            { text: 'Year Level', value: 'year_level' },
            { text: 'Date', value: 'date' },
            { text: 'Status', value: 'status' }
          ]"
          :items="attendance"
          class="elevation-2"
          density="comfortable"
          item-value="id"
        >
          <template #item.date="{ item }">
            {{ new Date(item.date).toLocaleDateString() }}
          </template>

          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>


