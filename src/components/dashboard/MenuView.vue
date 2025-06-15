<template>
  <h6 class="fw-semibold mb-3 text-muted">Menu</h6>
  <div class="row g-3 text-center">
    <div class="col-3" v-for="menu in filteredMenus" :key="menu.name">
      <button class="btn-action" @click="goTo(menu.page)">
        <i :class="['bi', menu.icon, 'fs-2', 'mb-2']"></i>
        <div class="btn-label">{{ menu.label }}</div>
      </button>
    </div>

    <!-- Logout tetap muncul untuk semua -->
    <div class="col-3">
      <button class="btn-action btn-logout" @click="logout">
        <i class="bi bi-box-arrow-right fs-2 mb-2"></i>
        <div class="btn-label">Logout</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()


const props = defineProps<{ groups: string[] }>()

interface MenuItem {
  name: string
  label: string
  icon: string
  page: string
  groups: string[]  // grup yang bisa akses menu ini
}

const allMenus: MenuItem[] = [
  { name: 'presensi', label: 'Presensi', icon: 'bi-calendar-check', page: 'presensi', groups: ['keamanan', 'administrasi', 'kebersihan'] },
  { name: 'pengajuanPelanggaran', label: 'Pelanggaran', icon: 'bi-journal-x', page: 'pengajuanPelanggaran', groups: ['keamanan', 'administrasi'] },
  { name: 'poskestren', label: 'Poskestren', icon: 'bi-journal-plus', page: 'poskestren', groups: ['kesehatan', 'administrasi'] },
  { name: 'madin', label: 'Madin', icon: 'bi-journal-richtext', page: 'catatan', groups: ['madin', 'administrasi'] },
  { name: 'tahfidz', label: 'Tahfidz', icon: 'bi-journal-check', page: 'catatan', groups: ['tahfidz', 'administrasi'] },
  { name: 'catatan', label: 'Catatan', icon: 'bi-chat-dots', page: 'catatan', groups: ['administrasi'] },
  { name: 'tanggungan', label: 'Tanggungan', icon: 'bi-wallet2', page: 'tanggungan', groups: ['keuangan', 'administrasi'] }
]

const filteredMenus = computed(() => {
  // Filter menu yang punya setidaknya 1 group yang ada di props.groups
  return allMenus.filter(menu => menu.groups.some(g => props.groups.includes(g)))
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('siswa')
  router.push('/login')
}

const goTo = (page: string) => {
  router.push(`/${page}`)
}
</script>

<style scoped>
.btn-action {
  background-color: #fff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 6px;
  width: 100%;
  color: #1A4D2E;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-action i {
  font-size: 1.5rem; /* atau fs-4 jika pakai Bootstrap */
  margin-bottom: 4px;
}
.btn-action {
  aspect-ratio: 1 / 1;
}
.btn-label {
  font-size: 0.65rem;
  line-height: 1;
}

.btn-action:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.btn-label {
  font-size: 0.7rem;
}

.btn-logout {
  color: #c0392b;
}

.btn-logout:hover {
  color: #e74c3c;
}
</style>
