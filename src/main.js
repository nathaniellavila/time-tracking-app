<<<<<<< HEAD
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify' // Assuming you have this file for Vuetify setup

// Vuetify
import '@mdi/font/css/materialdesignicons.css' 
=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify' // Assuming you have this file for Vuetify setup
import '@mdi/font/css/materialdesignicons.css'  // Only once
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

<<<<<<< HEAD
=======
// Import v-calendar and its styles
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
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
<<<<<<< HEAD
=======
app.use(VCalendar)  // Add v-calendar plugin to the app
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)

app.mount('#app')
