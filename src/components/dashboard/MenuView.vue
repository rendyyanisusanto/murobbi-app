<template>
    <h6 class="fw-semibold mb-3 text-muted">Menu</h6>
      <div class="row g-3 text-center">

        <div class="col-3">
          <button class="btn-action" @click="goTo('presensi')">
            <i class="bi bi-calendar-check fs-2 mb-2"></i>
            <div class="btn-label">Presensi</div>
          </button>
        </div>
        <div class="col-3">
          <button class="btn-action" @click="goTo('pelanggaran')">
            <i class="bi bi-journal-x fs-2 mb-2"></i>
            <div class="btn-label">Pelanggaran</div>
          </button>
        </div><div class="col-3">
          <button class="btn-action" @click="goTo('poskestren')">
            <i class="bi bi-journal-plus fs-2 mb-2"></i>
            <div class="btn-label">Poskestren</div>
          </button>
        </div>

        <div class="col-3">
          <button class="btn-action" @click="goTo('catatan')">
            <i class="bi bi-journal-richtext fs-2 mb-2"></i>
            <div class="btn-label">Madin</div>
          </button>
        </div>

        <div class="col-3">
          <button class="btn-action" @click="goTo('catatan')">
            <i class="bi bi-journal-check fs-2 mb-2"></i>
            <div class="btn-label">Tahfidz</div>
          </button>
        </div>
        <div class="col-3">
          <button class="btn-action" @click="goTo('catatan')">
            <i class="bi bi-chat-dots fs-2 mb-2"></i>
            <div class="btn-label">Catatan</div>
          </button>
        </div>
        <div class="col-3">
          <button class="btn-action" @click="goTo('tanggungan')">
            <i class="bi bi-wallet2 fs-2 mb-2"></i>
            <div class="btn-label">Tanggungan</div>
          </button>
        </div>
        <div class="col-3">
          <button class="btn-action btn-logout" @click="logout">
            <i class="bi bi-box-arrow-right fs-2 mb-2"></i>
            <div class="btn-label">Logout</div>
          </button>
        </div>
      </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (page: string) => {
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
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 6px;
  width: 100%;
  color: #2980b9;
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
