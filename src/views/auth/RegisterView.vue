<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import {
  courseRules,
  collegeIdRules,
  firstNameRules,
  lastNameRules,
  emailRules,
  passwordRules,
  yearLevelRules,
  confirmPasswordRules
} from '../../validators/registerValidators'

const router = useRouter()
const theme = ref('light')
const form = ref(null)

const firstName = ref('')
const lastName = ref('')
const middleInitial = ref('')
const collegeId = ref('')
const course = ref('')
const yearLevel = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref(null)

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const onSubmit = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  error.value = null

  try {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        middle_initial: middleInitial.value,
        college_id: collegeId.value,
        course: course.value,
        year_level: yearLevel.value
      }
    }
  })


    if (signUpError) throw signUpError

    const { user } = data
    await supabase.from('profiles').insert({
      id: user.id,
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      middle_initial: middleInitial.value,
      college_id: collegeId.value,
      course: course.value,
      year_level: yearLevel.value
    })

    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    error.value = err.message || 'Something went wrong during sign up.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="#4B5320">
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

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
                      <v-text-field v-model="collegeId" label="College ID" variant="outlined" />
                      <v-text-field v-model="firstName" label="First Name" variant="outlined" :rules="firstNameRules" />
                      <v-text-field v-model="lastName" label="Last Name" variant="outlined" :rules="lastNameRules" />
                      <v-text-field v-model="middleInitial" label="Middle Initial" variant="outlined" />
                      <v-text-field v-model="course" label="Course" variant="outlined" />
                      <v-select
                        v-model="yearLevel"
                        :items="['1st Year', '2nd Year', '3rd Year', '4th Year']"
                        label="Year Level"
                        variant="outlined"
                      />
                      <v-text-field v-model="email" label="Email" variant="outlined" :rules="emailRules" />
                      <v-text-field v-model="password" label="Password" type="password" variant="outlined" :rules="passwordRules" />
                      <v-text-field
                        v-model="confirmPassword"
                        label="Password Confirmation"
                        type="password"
                        variant="outlined"
                        :rules="confirmPasswordRules(password)"
                      />

                      <v-btn :loading="loading" class="mt-2" type="submit" prepend-icon="mdi-account" color="#4B5320" block>
                        Register
                      </v-btn>

                      <v-alert v-if="error" type="error" class="mt-4">
                        {{ error }}
                      </v-alert>
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
