<template>
  <nav
    class="navbar fixed-bottom border-top shadow-sm"
    style="height: 70px; background-color: #1A4D2E;"
  >
    <div class="container d-flex justify-content-between align-items-center px-3 text-white">

      <!-- Menu Kiri -->
      <button
        class="btn d-flex flex-column align-items-center text-white"
        style="flex: 1; padding: 0 0.5rem; border-radius: 0; background: transparent;"
      >
        <i class="bi bi-wallet2 fs-4"></i>
        <small style="font-size: 11px;">Tanggungan</small>
      </button>

      <button
        class="btn d-flex flex-column align-items-center text-white"
        style="flex: 1; padding: 0 0.5rem; border-radius: 0; background: transparent;"
      >
        <i class="bi bi-person-circle fs-4"></i>
        <small style="font-size: 11px;">Profile</small>
      </button>

      <!-- Tombol Home Aktif -->
      <button
        class="btn d-flex flex-column align-items-center justify-content-center"
        style="flex: 1; padding: 0 0.5rem; border-radius: 12px; background-color: #FACC15; color: #1A4D2E;"
        @click="goTo('dashboard')"
      >
        <i class="bi bi-house-door-fill fs-4"></i>
        <small style="font-size: 11px;">Home</small>
      </button>

      <!-- Menu Kanan -->
      <button
        class="btn d-flex flex-column align-items-center text-white"
        style="flex: 1; padding: 0 0.5rem; border-radius: 0; background: transparent;"
      >
        <i class="bi bi-chat-dots fs-4"></i>
        <small style="font-size: 11px;">Messages</small>
      </button>

      <button
        class="btn d-flex flex-column align-items-center text-white"
        style="flex: 1; padding: 0 0.5rem; border-radius: 0; background: transparent;"
      >
        <i class="bi bi-gear fs-4"></i>
        <small style="font-size: 11px;">Account</small>
      </button>

    </div>
  </nav>
</template>


<script setup lang="ts">

import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (page) => {
  router.push(`/${page}`)
}
</script>
