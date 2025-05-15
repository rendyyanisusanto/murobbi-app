import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
// import Absen from '@/views/Absen.vue'
// import Tagihan from '@/views/Tagihan.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  // { path: '/absen', component: Absen },
  // { path: '/tagihan', component: Tagihan }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Middleware: Cek apakah login dulu sebelum akses route yang dilindungi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login') // jika belum login, redirect ke login
  } else if (to.path === '/login' && token) {
    next('/dashboard') // jika sudah login, jangan bisa ke login lagi
  } else {
    next() // lanjut ke rute berikutnya
  }
})

export default router
