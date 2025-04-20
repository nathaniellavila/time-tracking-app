<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    router.push('/') // Redirect if not logged in
  } else {
    user.value = data.user
  }
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <v-app>
    <v-app-bar color="#4B5320" title="Dashboard">
      <v-spacer />
      <v-btn @click="logout" prepend-icon="mdi-logout" color="red">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-10">
        <h1 class="text-h4 mb-4">Welcome to the Dashboard</h1>
        <p>User: {{ user?.email }}</p>
        <!-- You can insert a table, chart, etc. here -->
      </v-container>
    </v-main>
  </v-app>
</template>
