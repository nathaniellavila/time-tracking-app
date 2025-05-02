<script setup>
<<<<<<< HEAD
import { ref } from 'vue'
=======
import { ref, computed } from 'vue'
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
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
<<<<<<< HEAD
  confirmPasswordRules
=======
  confirmPasswordRules,
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
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
<<<<<<< HEAD
const loading = ref(false)
const error = ref(null)
=======
const profilePicture = ref(null)
const classification = ref('')   // 🔥 role selector
const loading = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

<<<<<<< HEAD
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
=======
const passwordStrength = computed(() => {
  if (password.value.length > 8 && /[A-Z]/.test(password.value) && /\d/.test(password.value)) return 'Strong'
  if (password.value.length > 5) return 'Medium'
  return 'Weak'
})

function resetForm() {
  firstName.value = ''
  lastName.value = ''
  middleInitial.value = ''
  collegeId.value = ''
  course.value = ''
  yearLevel.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  profilePicture.value = null
  classification.value = ''
}

async function onSubmit() {
  if (!form.value?.validate()) return

  loading.value = true
  snackbar.value = false

  try {
    // 1) Sign up the user with Supabase Auth
    const { data: signData, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          last_name: lastName.value,
          middle_initial: middleInitial.value,
          college_id: collegeId.value,
          course: course.value,
          year_level: yearLevel.value,
          classification: classification.value,
        }
      }
    })
    if (signUpError) throw signUpError

    const userId = signData.user.id

    // 2) Upsert profile and fetch classification in one go
    const { data: profile, error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email.value,
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
        first_name: firstName.value,
        last_name: lastName.value,
        middle_initial: middleInitial.value,
        college_id: collegeId.value,
        course: course.value,
<<<<<<< HEAD
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
=======
        year_level: yearLevel.value,
        classification: classification.value,
      })
      .select('classification')
      .single()
    if (upsertError) throw upsertError

    // 3) Store role & redirect
    localStorage.setItem('userRole', profile.classification)

    snackbarMessage.value = 'Registration successful! Redirecting…'
    snackbarColor.value = 'success'
    snackbar.value = true

    resetForm()
    setTimeout(() => router.push('/'), 1500)

  } catch (err) {
    console.error(err)
    snackbarMessage.value = err.message || 'Something went wrong during sign up.'
    snackbarColor.value = 'error'
    snackbar.value = true
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
<<<<<<< HEAD
      <v-app-bar class="px-3" color="#4B5320">
        <v-spacer></v-spacer>
=======
      <v-app-bar class="px-3" color="#4B5320" dark>
        <v-spacer />
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
<<<<<<< HEAD
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
=======
        />
      </v-app-bar>

      <v-main class="main-background">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8" class="pt-16">
              <v-card elevation="24" class="pa-6">
                <template v-slot:title>
                  <div class="text-center">
                    <h2 class="font-weight-black">TIME TRACKING</h2>
                    <p>Register your account</p>
                  </div>
                </template>

                <v-form ref="form" fast-fail @submit.prevent="onSubmit">
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="collegeId"
                        label="College ID"
                        variant="outlined"
                        :rules="collegeIdRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-file-input
                        v-model="profilePicture"
                        label="Profile Picture"
                        variant="outlined"
                        accept="image/*"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="firstName"
                        label="First Name"
                        variant="outlined"
                        :rules="firstNameRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="lastName"
                        label="Last Name"
                        variant="outlined"
                        :rules="lastNameRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="middleInitial"
                        label="Middle Initial"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="course"
                        label="Course"
                        variant="outlined"
                        :rules="courseRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="yearLevel"
                        :items="[
                          { title: '1st Year', value: '1st Year' },
                          { title: '2nd Year', value: '2nd Year' },
                          { title: '3rd Year', value: '3rd Year' },
                          { title: '4th Year', value: '4th Year' }
                        ]"
                        item-title="title"
                        item-value="value"
                        label="Year Level"
                        variant="outlined"
                        :rules="yearLevelRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        :rules="emailRules"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        :rules="passwordRules"
                      />
                      <small>Password Strength: <strong>{{ passwordStrength }}</strong></small>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
                        type="password"
                        variant="outlined"
                        :rules="confirmPasswordRules(password)"
                      />
<<<<<<< HEAD

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

=======
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="classification"
                        :items="['Admin', 'Student', 'Others']"
                        label="Classification"
                        variant="outlined"
                        required
                      />
                    </v-col>
                  </v-row>

                  <v-btn
                    :loading="loading"
                    block
                    prepend-icon="mdi-account"
                    color="#4B5320"
                    class="mt-6"
                    type="submit"
                  >
                    Register
                  </v-btn>
                </v-form>

                <v-divider class="my-5" />

                <h5 class="text-center">
                  Already have an account?
                  <RouterLink to="/">Click here to login</RouterLink>
                </h5>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" top>
        {{ snackbarMessage }}
      </v-snackbar>

>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
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
<<<<<<< HEAD
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
=======
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
}
</style>
