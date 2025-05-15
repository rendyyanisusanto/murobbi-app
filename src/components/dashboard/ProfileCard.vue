<template>
  <div class="profile-card p-4 d-flex align-items-center mb-4">
    <img
      :src="foto || placeholderImg"
      alt="Foto Siswa"
      class="profile-img border border-3 border-light"
      style="border-radius: 16px;"
      width="110"
      height="110"
    />
    <div class="profile-info ms-3 flex-grow-1 text-white">
      <h4 class="mb-2 fw-bold">{{ nama }}</h4>
      <p class="mb-0">{{ kelas }} / {{ jurusan }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  nama: String,
  foto: String,
  kelas: String,
  jurusan: String
})

const placeholderImg = 'https://placehold.co/600x400'
</script>

<style scoped>
.profile-card {
  background-color: #3742fa;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 8px 16px rgba(95, 39, 205, 0.4);
}

.profile-img {
  object-fit: cover;
  border-color: #fff !important;
}

</style>
