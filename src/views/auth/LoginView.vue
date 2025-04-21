<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { emailRules, passwordRules } from '@/validators/loginValidators'

const router = useRouter()
const theme = ref('light')
const form = ref(null)

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

async function onSubmit() {
  if (!form.value?.validate()) {
    console.log('Login form is invalid')
    return
  }

  loading.value = true
  errorMessage.value = ''

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    console.error('Login error:', error)
  } else if (data.session) {
    // Redirect to dashboard on successful login
    router.push('/dashboard')
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <!-- App Bar -->
      <v-app-bar class="px-3" color="#4B5320">
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

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
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer color="#4B5320" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
</template>
