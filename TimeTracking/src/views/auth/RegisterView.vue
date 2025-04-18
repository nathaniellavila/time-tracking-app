<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <!-- App Bar -->
      <v-app-bar class="px-3" color="primary">
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
              <v-col cols="12" md="6" class="mx-auto pt-16" >
                <v-card  prepend-icon="mdi-account" subtitle="Register" elevation="24">
                  <template v-slot:title>
                    <span class="font-weight-black">TIME TRACKING</span>
                  </template>

                  <v-card-text class="pt-4">
                    <v-form fast-fail @submit.prevent>
                      <v-text-field label="Firstname" variant="outlined" />
                      <v-text-field label="Lastname" variant="outlined" />
                      <v-text-field label="Email" variant="outlined" />
                      <v-text-field label="Password" type="password" variant="outlined" />
                      <v-text-field label="Password Confirmation" type="password" variant="outlined" />

                      <v-btn class="mt-2" type="submit" prepend-icon="mdi-account" color="primary" block>Register</v-btn>
                    </v-form>

                    <v-divider class="my-5"/>

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
      <v-footer color="primary" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.main-background {
  background-image: url('public/images/logo final.png'); /* Update to match your file */
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
  background-color: rgba(0, 0, 0, 0.6); /* dark overlay */
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85); /* semi-transparent white */
  backdrop-filter: blur(10px);
  border-radius: 16px;
}
</style>
