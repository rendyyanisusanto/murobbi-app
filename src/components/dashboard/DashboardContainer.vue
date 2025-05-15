<template>
    <div class="dashboard-container py-4">
    <div class="container px-4">
      <ProfileCard
        :nama="user.nama"
        :foto="user.foto"
        :kelas="user.kelas"
        :jurusan="user.jurusan"
      />
      <AdditionalCard />
      <MenuCard />
      <InfoCard />
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/dashboard/ProfileCard.vue'
import AdditionalCard from '@/components/dashboard/AdditionalCard.vue'
import MenuCard from '@/components/dashboard/Menu.vue'
import InfoCard from '@/components/dashboard/InfoCard.vue'
import {  setAuthToken, getUser, getSiswa } from '@/api'

import config from '@/config/config'
const router = useRouter()

const user = ref({
  nama: '',
  foto: '',
  kelas:'',
  jurusan: ''
})
onMounted(() => {
  const token = localStorage.getItem('token')
  const userData = getUser()
  const siswa = getSiswa()
  if (!userData || !userData.first_name) {
    router.push('/login')
    return
  }
  setAuthToken(token)
  user.value = {
    nama: siswa.nama || 'User',
    foto: `${config.BASE_MEDIA_URL}/siswa/${siswa.foto}`,
    kelas: siswa.kelas?.kelas,
    jurusan: siswa.jurusan?.jurusan
  }
})

</script>

<style scoped>

.dashboard-container {
  background: #ecf0f1;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>