<template>
    <h6 class="fw-semibold mb-3 text-muted">Menu</h6>
      <div class="row g-3 text-center">
        <div class="col-4">
          <button class="btn-action" @click="goTo('presensi')">
            <i class="bi bi-calendar-check fs-2 mb-2"></i>
            <div class="btn-label">Presensi</div>
          </button>
        </div>
        <div class="col-4">
          <button class="btn-action" @click="goTo('pelanggaran')">
            <i class="bi bi-exclamation-triangle fs-2 mb-2"></i>
            <div class="btn-label">Pelanggaran</div>
          </button>
        </div>
        <div class="col-4">
          <button class="btn-action" @click="goTo('catatan')">
            <i class="bi bi-chat-dots fs-2 mb-2"></i>
            <div class="btn-label">Catatan</div>
          </button>
        </div>
        <div class="col-4">
          <button class="btn-action" @click="goTo('tanggungan')">
            <i class="bi bi-wallet2 fs-2 mb-2"></i>
            <div class="btn-label">Tanggungan</div>
          </button>
        </div>
        <div class="col-4">
          <button class="btn-action" @click="goTo('performa')">
            <i class="bi bi-bar-chart-line fs-2 mb-2"></i>
            <div class="btn-label">Performa</div>
          </button>
        </div>
        <div class="col-4">
          <button class="btn-action btn-logout" @click="logout">
            <i class="bi bi-box-arrow-right fs-2 mb-2"></i>
            <div class="btn-label">Logout</div>
          </button>
        </div>
      </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (page) => {
  router.push(`/${page}`)
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('siswa')
  router.push('/login')
}
</script>

<style scoped>

.btn-action {
  background-color: #fff;
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 20px 12px;
  width: 100%;
  color: #2980b9;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-action:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.btn-label {
  font-size: 1rem;
}

.btn-logout {
  color: #c0392b;
}

.btn-logout:hover {
  color: #e74c3c;
}
</style>