<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" class="bg-blue-grey-darken-4" dark>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title class="text-h6 text-white">Menu</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item
          link
          @click="selectMenu('request')"
          :active="selectedMenu === 'request'"
        >
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

    <!-- App Bar -->
    <v-app-bar app color="#4B5320" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Time Tracking Dashboard</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="selectedMenu" />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RequestFeatures from '@/views/dashboard/RequestFeatures.vue'
import { supabase } from '@/lib/supabase'

// State
const drawer = ref(false)
const selectedMenu = ref('request')

const componentsMap = {
  request: RequestFeatures,
}

const currentComponent = computed(
  () => componentsMap[selectedMenu.value] || RequestFeatures
)

const router = useRouter()

function selectMenu(menu) {
  selectedMenu.value = menu
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/')
}

// Auth + Role Protection
onMounted(async () => {
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    router.push('/')
    return
  }

  const userRole = localStorage.getItem('userRole')
  if (userRole !== 'Student') {
    router.push('/')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
