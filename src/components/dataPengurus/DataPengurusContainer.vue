<template>
  <div class="pengurusContainer">
    <div class="headerWrapper">
      <h2 class="title">Data Pengurus</h2>
    </div>

    <div class="scrollArea">
      <div
        class="pengurusCard clickable"
        v-for="(pengurus, index) in pengurusData"
        :key="index"
        @click="goToDetail(pengurus.santri.id)"
      >
        <div class="cardContent">
          <div class="fotoWrapper">
            <img :src="pengurus.santri.foto || 'https://placehold.co/600x400'" alt="Foto Santri" />
          </div>
          <div class="infoWrapper">
            <div class="cardBody">
              <div class="infoRow">
                <span class="label">Nama</span>
                <span class="value">: {{ pengurus.santri.nama }}</span>
              </div>
              <div class="infoRow">
                <span class="label">Bidang</span>
                <span class="value">: {{ pengurus.lembaga_pengurus?.nama || '-' }}</span>
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
import { getAllPengurus, setAuthToken } from '@/api'

const router = useRouter()
const pengurusData = ref<any[]>([])

const goToDetail = (santriId: number) => {
  router.push(`/dataSantri/${santriId}`)
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  try {
    const res = await getAllPengurus()
    pengurusData.value = res.data
  } catch (error) {
    console.error('Gagal mengambil data pengurus:', error)
  }
})
</script>

<style scoped>
.pengurusContainer {
  background: #F5F1E3;
  min-height: 150vh;
  padding: 1rem;
}

.headerWrapper {
  background: #1A4D2E;
  padding: 16px 20px;
  border-radius: 12px;
  color: #F5F1E3;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.scrollArea {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.pengurusCard {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pengurusCard:hover {
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
