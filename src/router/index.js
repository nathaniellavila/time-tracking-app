<<<<<<< HEAD
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
=======
import { createRouter, createWebHashHistory } from 'vue-router'
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { supabase } from '@/lib/supabase'

<<<<<<< HEAD
// ROUTES
const routes = [
  { path: '/', name: 'home', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: () => import('@/views/auth/DashboardView.vue'), 
    meta: { requiresAuth: true } 
  }
]

// DETECT IF GITHUB PAGES
const isGithubPages = import.meta.env.BASE_URL.includes('github.io')

// ROUTER
const router = createRouter({
  history: isGithubPages ? createWebHashHistory() : createWebHistory(),
  routes
})

// NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  console.log('Supabase session data:', data)
  const isAuth = !!data.session

  if (to.meta.requiresAuth && !isAuth) {
    next('/')
  } else {
    next()
  }
=======
const routes = [
  { path: '/', name: 'home', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // Admin dashboard (only for Admins)
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/dashboard/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  // Student dashboard (for Student & Others)
  {
    path: '/student-dashboard',
    name: 'student-dashboard',
    component: () => import('@/views/dashboard/StudentDashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isAuth = !!data.session

  // Not logged in → go to login
  if (to.meta.requiresAuth && !isAuth) {
    return next('/')
  }

  // If route requires Admin, check classification
  if (to.meta.requiresAdmin) {
    // fetch user profile classification
    const { data: profile } = await supabase
      .from('profiles')
      .select('classification')
      .eq('id', data.session.user.id)
      .single()

    if (profile.classification !== 'Admin') {
      // not an Admin → redirect to student dashboard
      return next('/student-dashboard')
    }
  }

  next()
>>>>>>> 70cbf5a (feat: admindashboard,studentdashboard)
})

export default router
