import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Presensi from '@/views/PresensiView.vue'
import Pelanggaran from '@/views/PelanggaranView.vue'
import Poskestren from '@/views/PoskestrenView.vue'
import DetailPoskestren from '@/views/DetailPoskestrenView.vue'
import DetailPelanggaran from '@/views/DetailPelanggaranView.vue'
import PengajuanPelanggaran from '@/views/PengajuanPelanggaran.vue'
import AddPengajuanPelanggaran from '@/views/AddPengajuanPelanggaran.vue'
import Catatan from '@/views/CatatanView.vue'
import PerizinanSantri from '@/views/PerizinanSantri.vue'
import AddPerizinanSantri from '@/views/AddPerizinanSantri.vue'
import DataSantri from '@/views/DataSantriView.vue'
import DetailDataSantri from '@/views/DetailDataSantriView.vue'
import IjinPengurus from '@/views/IjinPengurus.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/presensi', component: Presensi },
  { path: '/pelanggaran', component: Pelanggaran },
  { path: '/pelanggaran/:id', name: 'DetailPelanggaran', component: DetailPelanggaran},
  { path: '/catatan', component: Catatan },
  { path: '/poskestren', component: Poskestren },
  { path: '/poskestren/:id', name: 'DetailPoskestren', component: DetailPoskestren},
  { path: '/pengajuanPelanggaran', component: PengajuanPelanggaran },
  { path: '/pengajuanPelanggaran/add', component: AddPengajuanPelanggaran },
  { path: '/perizinanSantri', component: PerizinanSantri },
  { path: '/perizinanSantri/add', component: AddPerizinanSantri },
  { path: '/dataSantri', component: DataSantri },
  { path: '/dataSantri/:id',  name: 'DetailDataSantriView', component: DetailDataSantri },
  { path: '/ijinPengurus', component: IjinPengurus },
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
