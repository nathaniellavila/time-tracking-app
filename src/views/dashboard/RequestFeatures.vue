<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6">Request Features</h2>

    <v-card elevation="4" class="pa-6">
      <v-form ref="form" @submit.prevent="submitRequest">
        <v-text-field
          v-model="requestTitle"
          label="Request Title"
          :rules="[v => !!v || 'Title is required']"
          outlined
          dense
          class="mb-4"
        />

        <v-textarea
          v-model="requestDetails"
          label="Details"
          :rules="[v => !!v || 'Details are required']"
          outlined
          rows="4"
          class="mb-6"
        />

        <!-- Date Picker -->
        <v-row>
          <v-col cols="12" md="6">
            <v-date-picker
              v-model="selectedDate"
              color="primary"
              :min="minDate"
              show-adjacent-months
              @input="onDateSelect"
            />
          </v-col>

          <v-col cols="12" md="6" class="d-flex align-center">
            <div v-if="selectedDate">
              <strong>Selected Date:</strong>
              {{ humanReadableDate }}
            </div>
          </v-col>
        </v-row>

        <!-- Appointment Summary -->
        <v-row>
          <v-col cols="12" class="mt-4">
            <v-alert
              v-if="selectedDate"
              type="info"
              border="left"
              colored-border
              elevation="2"
            >
              <strong>Appointment Scheduled For:</strong> {{ humanReadableDate }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- Submit Button -->
        <div class="d-flex justify-end mt-6">
          <v-btn
            color="#4B5320"
            dark
            type="submit"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon left>mdi-send</v-icon>
            Submit Request
          </v-btn>
        </div>
      </v-form>

      <!-- Feedback Alerts -->
      <v-alert
        v-if="successMessage"
        type="success"
        class="mt-4"
        border="left"
        colored-border
      >
        {{ successMessage }}
      </v-alert>
      <v-alert
        v-if="errorMessage"
        type="error"
        class="mt-4"
        border="left"
        colored-border
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { supabase } from '@/lib/supabase'

// Form state
const requestTitle = ref('')
const requestDetails = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Date state only
const selectedDate = ref(null)
const minDate = dayjs().format('YYYY-MM-DD')

// Computed date display
const humanReadableDate = computed(() => {
  return selectedDate.value ? dayjs(selectedDate.value).format('MMMM D, YYYY') : ''
})

// Handle date selection
function onDateSelect(date) {
  selectedDate.value = date
}

// Submit handler
async function submitRequest() {
  if (!requestTitle.value || !requestDetails.value) {
    errorMessage.value = 'Please fill out title and details.'
    return
  }

  if (!selectedDate.value) {
    errorMessage.value = 'Please pick a date for the request.'
    return
  }

  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) throw new Error('Not authenticated')

    // Convert selected date to ISO string
    const appointmentDateISO = dayjs(selectedDate.value).startOf('day').toISOString()

    const payload = {
      title: requestTitle.value,
      details: requestDetails.value,
      appointment_datetime: appointmentDateISO,
      submitted_at: new Date().toISOString(),
      user_id: user.id
    }

    const { error } = await supabase.from('feature_requests').insert(payload)
    if (error) throw error

    successMessage.value = 'Request submitted successfully!'
    requestTitle.value = ''
    requestDetails.value = ''
    selectedDate.value = null
  } catch (err) {
    errorMessage.value = err.message || 'Submission failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.text-subtitle-1 {
  font-size: 1.125rem;
}
</style>
