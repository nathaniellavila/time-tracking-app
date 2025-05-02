<template>
    <v-container>
      <v-card v-if="requests.length">
        <v-card-title>📥 Requests from Students</v-card-title>
        <v-list>
          <v-list-item v-for="req in requests" :key="req.id">
            <v-icon class="mr-2">mdi-account-question</v-icon>
            <v-list-item-content>
              <v-list-item-title>{{ req.firstname }} {{ req.lastname }}</v-list-item-title>
              <v-list-item-subtitle>{{ req.request_reason }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-alert v-else type="info" class="mt-4">No requests yet.</v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const requests = ref([])
  
  onMounted(async () => {
  console.log('🔍 Fetching requests…')
  const { data, error } = await supabase.from('requests').select('*')
  if (error) {
    console.error('❌ Fetch error:', error)
  } else {
    console.log('✅ Fetched data:', data)
    requests.value = data
  }

  console.log('🔌 Subscribing to realtime…')
  const channel = supabase
    .channel('public:requests')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'requests' },
      (payload) => {
        console.log('🆕 Realtime payload:', payload)
        requests.value.unshift(payload.new)
      }
    )
    .subscribe((status) => {
      console.log('▶️ Realtime status:', status)
    })

  onUnmounted(() => {
    supabase.removeChannel(channel)
  })
})


  </script>
  