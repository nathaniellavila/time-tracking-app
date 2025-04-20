<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  firstNameRules,
  lastNameRules,
  emailRules,
  passwordRules,
  confirmPasswordRules
} from '../../validators/registerValidators'

const theme = ref('light')
function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const form = ref(null)

// Form data
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Submit handler
const onSubmit = () => {
  if (form.value?.validate()) {
    console.log('Form submitted!', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
    // Continue with API call or route navigation here
  } else {
    console.log('Form invalid – please fill all required fields.')
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

      <!-- Background with Overlay -->
      <v-main class="main-background">
        <div class="overlay">
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" md="6" class="mx-auto pt-16">
                <v-card prepend-icon="mdi-account" subtitle="Register" elevation="24">
                  <template v-slot:title>
                    <span class="font-weight-black">TIME TRACKING</span>
                  </template>

                  <v-card-text class="pt-4">
                    <v-form ref="form" fast-fail @submit.prevent="onSubmit">
                      <v-text-field
                        v-model="firstName"
                        label="Firstname"
                        variant="outlined"
                        :rules="firstNameRules"
                      />
                      <v-text-field
                        v-model="lastName"
                        label="Lastname"
                        variant="outlined"
                        :rules="lastNameRules"
                      />
                      <v-text-field
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        :rules="emailRules"
                      />
                      <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        :rules="passwordRules"
                      />
                      <v-text-field
                        v-model="confirmPassword"
                        label="Password Confirmation"
                        type="password"
                        variant="outlined"
                        :rules="confirmPasswordRules(password)"
                      />

                      <v-btn class="mt-2" type="submit" prepend-icon="mdi-account" color="#4B5320" block>
                        Register
                      </v-btn>
                    </v-form>

                    <v-divider class="my-5" />

                    <h5 class="text-center">
                      Already have an account?
                      <RouterLink to="/">Click here to login</RouterLink>
                    </h5>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>

      <!-- Footer -->
      <v-footer color="#4B5320" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.main-background {
  background-image: url('/images/logo final.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 16px;
}
</style>
