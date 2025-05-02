<<<<<<< HEAD
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const loading = ref(true)
const error = ref(null)

const themeManager = useTheme()
const theme = ref(themeManager.global.name.value)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  themeManager.global.name.value = theme.value
}

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
  <v-btn
  @click="toggleTheme"
  :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
  text="Toggle Theme"
  color="white"
  class="mr-2"
/>

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
=======
<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" class="bg-blue-grey-darken-4" dark>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title class="text-h6 text-white">Menu</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item link @click="selectMenu('attendance')" :active="selectedMenu === 'attendance'">
          <v-list-item-icon>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attendance Monitoring</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="selectMenu('request')" :active="selectedMenu === 'request'">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text-question</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Request Features</v-list-item-title>
        </v-list-item>

        <v-spacer></v-spacer>

        <v-divider class="my-2"></v-divider>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#4B5320" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Time Tracking Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <transition name="fade" mode="out-in">
          <component :is="currentComponent" key="selectedMenu" />
        </transition>
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
      </v-container>
    </v-main>
  </v-app>
</template>

<<<<<<< HEAD

=======
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AttendanceMonitoring from '@/views/dashboard/AttendanceMonitoring.vue'
import RequestFeatures      from '@/views/dashboard/RequestFeatures.vue'
import { supabase } from '@/lib/supabase'

const drawer = ref(false)
const selectedMenu = ref('attendance')

const componentsMap = {
  attendance: AttendanceMonitoring,
  request: RequestFeatures,
}

const currentComponent = computed(() => componentsMap[selectedMenu.value] || AttendanceMonitoring)

const router = useRouter()

function selectMenu(menu) {
  selectedMenu.value = menu
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/')
}

// Protect pages: redirect if not auth
supabase.auth.getSession().then(({ data }) => {
  if (!data.session) {
    router.push('/')
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
