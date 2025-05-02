<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" class="bg-blue-grey-darken-4" dark>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title class="text-h6 text-white">Menu</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item link @click="selectMenu('attendance')" :active="selectedMenu === 'attendance'">
          <v-list-item-icon>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attendance Monitoring</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="selectMenu('request')" :active="selectedMenu === 'request'">
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon> <!-- changed icon to bell -->
          </v-list-item-icon>
          <v-list-item-title>Notification for Request</v-list-item-title>
        </v-list-item>

        <v-spacer></v-spacer>

        <v-divider class="my-2" />

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="#4B5320" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Admin Dashboard - Time Tracking</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="selectedMenu" />
        </transition>
      </v-container>
    </v-main>

    <!-- Snackbar Notification -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="bottom right">
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>

  <!-- Requests Display -->
  <div v-if="selectedMenu === 'request'">
    <v-alert v-if="requests.length === 0" type="info">No requests yet.</v-alert>
    <v-list v-else>
      <v-list-item v-for="req in requests" :key="req.id">
        <v-list-item-title>{{ req.firstname }} {{ req.lastname }}</v-list-item-title>
        <v-list-item-subtitle>{{ req.request_reason }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import AttendanceMonitoring from '@/views/dashboard/AttendanceMonitoring.vue'
import NotificationForRequest from '@/views/dashboard/NotificationForRequest.vue'

// States
const drawer = ref(false)
const selectedMenu = ref('attendance')
const requests = ref([])
const snackbar = ref({ show: false, message: '', color: 'info' })

// Router
const router = useRouter()

// Components Map
const componentsMap = {
  attendance: AttendanceMonitoring,
  request: NotificationForRequest,
}

const currentComponent = computed(() => componentsMap[selectedMenu.value] || AttendanceMonitoring)

// Methods
function selectMenu(menu) {
  selectedMenu.value = menu
}

async function logout() {
  await supabase.auth.signOut()
  localStorage.removeItem('userRole')
  router.push('/')
}

function showSnackbar(msg) {
  snackbar.value = { show: true, message: msg, color: 'info' }
}

// Realtime Listener
let requestListener = null

onMounted(async () => {
  // Auth Protection
  const { data: sessionData } = await supabase.auth.getSession()
  if (!sessionData.session) return router.push('/')
  if (localStorage.getItem('userRole') !== 'Admin') return router.push('/')

  // Initial Request Fetch
  const { data: initial, error } = await supabase.from('requests').select('*')
  if (!error) requests.value = initial

  // Realtime Listener for New Requests
  requestListener = supabase
    .channel('public:requests')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'requests' }, (payload) => {
      console.log('New request:', payload.new)
      requests.value.unshift(payload.new)
      showSnackbar('📥 New request received!')
    })
    .subscribe()
})

onUnmounted(() => {
  if (requestListener) {
    supabase.removeChannel(requestListener)
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
