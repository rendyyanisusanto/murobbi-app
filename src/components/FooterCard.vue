<template>
    <nav class="navbar fixed-bottom navbar-light bg-white border-top shadow-sm" style="height: 70px;">
  <div class="container d-flex justify-content-between align-items-center px-3">
    
    <!-- Menu Kiri -->
    <button class="btn btn-white d-flex flex-column align-items-center text-secondary border-end" style="flex: 1; padding: 0 0.5rem; border-radius: 0;">
      <i class="bi bi-wallet2 fs-4"></i>
      <small style="font-size: 11px;">Tanggungan</small>
    </button>
    <button class="btn btn-white d-flex flex-column align-items-center text-secondary border-end" style="flex: 1; padding: 0 0.5rem; border-radius: 0;">
      <i class="bi bi-person-circle fs-4"></i>
      <small style="font-size: 11px;">Profile</small>
    </button>

    <!-- Tombol Home Aktif -->
    <button 
      class="btn btn-primary d-flex flex-column align-items-center justify-content-center shadow" 
      style="flex: 1; padding: 0 0.5rem; border-radius: 12px;"
      aria-label="Home"
    >
      <i class="bi bi-house-door-fill fs-4"></i>
      <small style="font-size: 11px; color: white;">Home</small>
    </button>

    <!-- Menu Kanan -->
    <button class="btn btn-white d-flex flex-column align-items-center text-secondary border-start" style="flex: 1; padding: 0 0.5rem; border-radius: 0;">
      <i class="bi bi-chat-dots fs-4"></i>
      <small style="font-size: 11px;">Messages</small>
    </button>
    <button class="btn btn-white d-flex flex-column align-items-center text-secondary border-start" style="flex: 1; padding: 0 0.5rem; border-radius: 0;">
      <i class="bi bi-gear fs-4"></i>
      <small style="font-size: 11px;">Account</small>
    </button>
  </div>
</nav>
</template>