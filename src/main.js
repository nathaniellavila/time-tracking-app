// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify' // Assuming you have this file for Vuetify setup

// Vuetify
import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

// Create Vuetify instance
const vuetifyInstance = createVuetify({ 
  icons: {
    defaultSet: 'mdi', 
  },
  components,
  directives,
})

const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(vuetifyInstance) // Use the Vuetify instance correctly

app.mount('#app')
