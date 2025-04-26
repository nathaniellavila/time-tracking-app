import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { supabase } from '@/lib/supabase'


const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/auth/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  // 1. Fetch session
  const { data } = await supabase.auth.getSession()

  // 2. Log it out for debugging
  console.log('Supabase session data:', data)

  // 3. Check auth state
  const isAuth = !!data.session

  // 4. Redirect if not authenticated
  if (to.meta.requiresAuth && !isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router

