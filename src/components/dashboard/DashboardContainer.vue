<template>
    <div class="dashboard-container py-4">
    <div class="container px-4">
      <ProfileCard
        :nama="user.nama"
        :foto="user.foto"
        :kamar="user.kamar"
        :asrama="user.asrama"
      />
      <AdditionalCard />
      <MenuCard />
      <InfoCard />
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/dashboard/ProfileCard.vue'
import AdditionalCard from '@/components/dashboard/AdditionalCard.vue'
import MenuCard from '@/components/dashboard/MenuView.vue'
import InfoCard from '@/components/dashboard/InfoCard.vue'
import {  setAuthToken, getUser, getSantri } from '@/api'

import config from '@/config/config'
const router = useRouter()

const user = ref({
  nama: '',
  foto: '',
  kamar:'',
  asrama: ''
})
onMounted(() => {
  const token = localStorage.getItem('token')

  const userData = getUser()
  const santri = getSantri()
  if (!userData) {
    router.push('/login')
    return
  }
  console.log(santri)
  setAuthToken(token || '')
  user.value = {
    nama: santri.santri.nama || 'User',
    foto: `${config.BASE_MEDIA_URL}/santri/${santri.santri.foto}`,
    kamar: santri?.kamar_santri?.nama_kamar || '',
    asrama: santri?.kamar_santri?.nama_asrama || ''
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
