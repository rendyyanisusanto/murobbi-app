import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
// import Dashboard from '@/views/Dashboard.vue'
// import Absen from '@/views/Absen.vue'
// import Tagihan from '@/views/Tagihan.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // { path: '/dashboard', component: Dashboard },
  // { path: '/absen', component: Absen },
  // { path: '/tagihan', component: Tagihan }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
