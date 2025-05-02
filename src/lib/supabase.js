// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thctmyueyhbzfwzgbflo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoY3RteXVleWhiemZ3emdiZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjM1MTMsImV4cCI6MjA2MDY5OTUxM30.zfdDpg030yLEn3WIJO_vmjx6mmypJuuGrzH97o4WBjc'

export const supabase = createClient(supabaseUrl, supabaseKey)
<<<<<<< HEAD

=======
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
