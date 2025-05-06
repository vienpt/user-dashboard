import "./assets/main.css"

import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import uiPlugin from "@nuxt/ui/vue-plugin"

import App from "./App.vue"
import { createPinia } from "pinia"

const app = createApp(App)

const router = createRouter({
  routes: [{
    path: '/',
    component: () => import('./pages/index.vue')
  }, {
    path: '/dashboard',
    component: () => import('./pages/dashboard/index.vue')
  }],
  history: createWebHistory(),
})

app.use(createPinia())
app.use(uiPlugin)
app.use(router)

app.mount("#app")
