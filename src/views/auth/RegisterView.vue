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
      <v-app-bar class="px-3" color="green">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row class="justify-center">

            <v-col cols="12" md="6" class="mx-auto pt-16">
              <v-card class="mx-auto icon-center"elevation="30">
                <template v-slot:title>
                  <v-img src="/images\finalLogo.png" height="80"></v-img>
                  <h3 class="font-weight-black text-center">TimeTracking</h3>
                  <p class="text-center font-weight-bold"> Registration Form</p>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Firstname" variant="outlined" />
                    <v-text-field label="Lastname" variant="outlined" />
                    <v-text-field label="Email" variant="outlined" />
                    <v-text-field label="Password" type="password" variant="outlined" />
                    <v-text-field label="Password Confirmation" type="password" variant="outlined" />

                    <v-btn class="mt-2" type="submit" block  color="green" prepend-icon="mdi-login">Register</v-btn>
                  </v-form>

                  <v-divider class="my-5" />

                  <h5 class="text-center">
                    Already have an account?
                    <RouterLink to="/"> Click here to login</RouterLink>
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer color="green" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
</template>
