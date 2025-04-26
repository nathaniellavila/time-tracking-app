import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { supabase } from '@/lib/supabase'

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
})

export default router
