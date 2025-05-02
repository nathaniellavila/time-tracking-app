import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

<<<<<<< HEAD
=======
// main.js or plugins/vuetify.js
import '@mdi/font/css/materialdesignicons.css'

>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#4B5320',
          secondary: '#6C757D',
          error: '#FF5252',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#8BC34A',
          secondary: '#B0BEC5',
          error: '#FF5252',
        },
      },
    },
  },
})
