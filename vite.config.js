<<<<<<< HEAD
=======
// vite.config.js
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
<<<<<<< HEAD
  base: '/time-tracking-app/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
=======
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Ensures '@' resolves to 'src/'
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
    }
  }
})
