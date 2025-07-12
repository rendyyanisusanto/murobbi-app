<template>
    <div class="dashboard-container py-4">
    <div class="container px-4">
      <ProfileCard
        :nama="user.nama"
        :foto="user.foto"
        :kamar="user.kamar"
        :asrama="user.asrama"
      />
      <MenuCard :groups="user.groups || []" />
      <!-- <InfoCard /> -->
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/dashboard/ProfileCard.vue'
import MenuCard from '@/components/dashboard/MenuView.vue'
// import InfoCard from '@/components/dashboard/InfoCard.vue'
import {  setAuthToken, getUser, getSantri } from '@/api'

import config from '@/config/config'
const router = useRouter()

const user = ref({
  nama: '',
  foto: '',
  kamar:'',
  asrama: '',
  groups: ['keamanan']
})
onMounted(() => {
  const token = localStorage.getItem('token')

  const userData = getUser()
  const santri = getSantri()
  if (!userData) {
    router.push('/login')
    return
  }
  
  setAuthToken(token || '')
  user.value = {
    nama: santri.santri.nama || 'User',
    foto: santri.santri.foto ? `${santri.santri.foto}` : 'https://placehold.co/600x400',
    kamar: santri?.kamar_santri?.nama_kamar || '',
    asrama: santri?.kamar_santri?.nama_asrama || '',
    groups: userData.groups?.map((g: any) => g.name) || []
  }
  console.log(user.value)
})

</script>

<style scoped>

.dashboard-container {
  background: #F5F1E3;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
