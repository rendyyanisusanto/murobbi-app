<template>
  <div class="datasantriContainer">
    <div class="headerWrapper">
      <h2 class="title">Data Santri</h2>
      <button class="btnTambah" @click="goToTambah">
        <i class="bi bi-plus-circle me-2"></i> Tambah Santri
      </button>
    </div>

    <div class="scrollArea">
      <div class="datasantriCard clickable" v-for="(santri, index) in santriData" :key="index" @click="goToDetail(santri.id)">
        <div class="cardContent">
          <div class="fotoWrapper">
            <img :src="santri.foto || 'https://placehold.co/600x400'" alt="Foto Santri" />
          </div>
          <div class="infoWrapper">
            <div class="cardBody">
              <div class="infoRow">
                <span class="label">NIS</span>
                <span class="value">: {{ santri.nis }}</span>
              </div>
              <div class="infoRow">
                <span class="label">Nama</span>
                <span class="value">: {{ santri.nama }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllSantri, setAuthToken } from '@/api'

const router = useRouter()
const santriData = ref<any[]>([])

const goToTambah = () => router.push('/santri/add')
const goToDetail = (id: number) => {
  router.push(`/dataSantri/${id}`)
}
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  try {
    const res = await getAllSantri()
    santriData.value = res.data.map((s: any) => ({
      id: s.id,
      nis: s.nis || '-',
      nama: s.nama || 'Tidak diketahui',
      foto: s.foto ? s.foto : ''
    }))
  } catch (error) {
    console.error('Gagal mengambil data santri:', error)
  }
})
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

.datasantriContainer {
  background: #F5F1E3;
  min-height: 150vh;
  padding: 1rem;
}

.headerWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1A4D2E;
  padding: 16px 20px;
  border-radius: 12px;
  color: #F5F1E3;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.btnTambah {
  background: #F5F1E3;
  color: #1A4D2E;
  border: none;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 10px rgba(22, 160, 133, 0.3);
  transition: all 0.3s ease;
}

.btnTambah:hover {
  background: linear-gradient(135deg, #149174, #16a085);
  color: #fff;
  transform: translateY(-2px);
}

.scrollArea {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.scrollArea::-webkit-scrollbar {
  width: 8px;
}
.scrollArea::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.datasantriCard {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.datasantriCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.cardContent {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.fotoWrapper img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.infoWrapper {
  flex: 1;
}

.cardBody {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.infoRow {
  display: flex;
  gap: 8px;
  font-size: 0.92rem;
}

.label {
  width: 80px;
  font-weight: 600;
  color: #1A4D2E;
}

.value {
  flex: 1;
  color: #333;
}
</style>
