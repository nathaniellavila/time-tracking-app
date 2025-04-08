<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
  const theme = ref('light')

  function onClick() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="primary">
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

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer color="primary" border app>2024 - TimeTracking</v-footer>
    </v-app>
  </v-responsive>
</template>
