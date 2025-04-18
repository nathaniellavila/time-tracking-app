<script setup>
  import { ref } from 'vue'

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
            <v-col cols="12" md="6" class="mx-auto pt-10"  >
  <v-card class="mx-auto"  elevation="30" color="green">
    
    <!-- Logo above the title, inside the card -->
    <v-img
      :src="'/images/logo final.png'"
      alt="Logo"
      height="120"
      class="mt-4 mx-auto"
      style="max-width: 150px;"
      contain
    ></v-img>

    <!-- Title slot -->
    <template v-slot:title>
      <div class="text-center">
        <span class="font-weight-black">TIME TRACKING</span>
      </div>
    </template>

    <!-- Form content -->
    <v-card-text class="bg-surface-light pt-4">
      <v-form fast-fail @submit.prevent>
        <v-text-field label="Email" variant="outlined"></v-text-field>
        <v-text-field label="Password" type="password" variant="outlined"></v-text-field>
        <v-btn class="mt-2" color="green" type="submit" prepend-icon="mdi-account" block>Log In</v-btn>
      </v-form>

      <v-divider class="my-5"></v-divider>

      <h5 class="text-center">
        Don't have an account?
        <RouterLink to="/register">Click here to Register</RouterLink>
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
