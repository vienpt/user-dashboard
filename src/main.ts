import "./assets/main.css"

import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import uiPlugin from "@nuxt/ui/vue-plugin"
import { useAuth } from '@clerk/vue'

import App from "./App.vue"
import { createPinia } from "pinia"
import { clerkPlugin } from '@clerk/vue'

/**
 * Integrate with clerk
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const app = createApp(App)

const router = createRouter({
  routes: [{
    path: '/',
    component: () => import('./pages/index.vue')
  }, {
    path: '/dashboard',
    component: () => import('./pages/dashboard/index.vue'),
    meta: { requiresAuth: true }
  }],
  history: createWebHistory(),
})

// Navigation guard
router.beforeEach(async (to) => {
  const { getToken } = useAuth()
  const token = await getToken.value()
  
  if (to.meta.requiresAuth && !token) {
    return '/'
  }
})

app.use(createPinia())
app.use(router)
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.use(uiPlugin)

app.mount('#app')
