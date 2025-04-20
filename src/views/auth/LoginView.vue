<script setup>
<<<<<<< HEAD
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { emailRules, passwordRules } from '../../validators/loginValidators'



const theme = ref('light')
const form = ref(null)
const snackbar = ref(false)
const snackbarMessage = ref('')
const loading = ref(false)

function showSnackbar(message) {
  snackbarMessage.value = message
  snackbar.value = true
}

const router = useRouter()

const email = ref('')
const password = ref('')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

async function onSubmit() {
  if (form.value?.validate()) {
    loading.value = true

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    loading.value = false

    if (error) {
      showSnackbar('Login failed: ' + error.message)
    } else {
      showSnackbar('Login successful!')
      router.push('/dashboard') // ✅ Redirect after success
    }
  } else {
    showSnackbar('Please fill in all required fields.')
  }
}

=======
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
  const theme = ref('light')

  function onClick() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
>>>>>>> adcc62d79afc9479145838382ec1514896dfa3af
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
<<<<<<< HEAD
      <!-- App Bar -->
      <v-app-bar class="px-3" color="#4B5320">
        <v-spacer></v-spacer>
=======
      <v-app-bar class="px-3" color="primary">
        <v-spacer></v-spacer>

>>>>>>> adcc62d79afc9479145838382ec1514896dfa3af
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

<<<<<<< HEAD
      <!-- Main content -->
      <v-main>
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" md="6" class="mx-auto pt-10">
              <v-card class="mx-auto" elevation="30" color="#4B5320">
                <!-- Logo -->
                <v-img
                  :src="'/images/logo final.png'"
                  alt="Logo"
                  height="120"
                  class="mt-4 mx-auto"
                  style="max-width: 150px;"
                  contain
                ></v-img>

                <!-- Title -->
                <template v-slot:title>
                  <div class="text-center">
                    <span class="font-weight-black">TIME TRACKING</span>
                  </div>
                </template>

                <!-- Form -->
                <v-card-text class="bg-surface-light pt-4">
                  <v-form ref="form" fast-fail @submit.prevent="onSubmit">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      variant="outlined"
                      :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      :rules="passwordRules"
                    ></v-text-field>

                    <v-btn
                      class="mt-2"
                      color="#4B5320"
                      type="submit"
                      prepend-icon="mdi-account"
                      block
                    >
                      Log In
                    </v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center">
                    Don't have an account?
                    <RouterLink to="/register"> Click here to Register</RouterLink>
                  </h5>
=======
      <v-main>
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" md="6" class="mx-auto pt-16">
              <v-card class="mx-auto" elevation ="24">
              
                <v-card-title> 
                  <v-img src="/images\finalLogo.png" height="80"></v-img>
                  <h3 class="font-weight-black text-center">TimeTracking </h3> 
                  <p class="text-center"> Login Form</p>
                </v-card-title>
                <v-card-text class="bg-surface-light pt-4">
                  <v-divider class = "my-5"></v-divider>

                  <v-form fast-fail @submit.prevent>
                    <v-text-field label ="Email" variant = "outlined"></v-text-field>

                    <v-text-field label ="Password" type ="Password" variant = "outlined"></v-text-field>

                    <v-btn class="mt-2" type="submit" block color="primary" prepend-icon="mdi-account-plus">Login</v-btn>
                  </v-form>

                  <v-divider class = "my-5"></v-divider>

                  <h5 class ="text-center"
                  >Don't have an account? <RouterLink to="/register">Click here to Register</RouterLink></h5>

>>>>>>> adcc62d79afc9479145838382ec1514896dfa3af
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

<<<<<<< HEAD
      <!-- Footer -->
      <v-footer color="#4B5320" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>

  <v-snackbar v-model="snackbar" timeout="3000" color="red" variant="flat">
  {{ snackbarMessage }}
</v-snackbar>

<v-overlay :model-value="loading" class="align-center justify-center">
  <v-progress-circular indeterminate size="64" color="white" />
</v-overlay>
=======
      <v-footer color="primary" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
>>>>>>> adcc62d79afc9479145838382ec1514896dfa3af
</template>
