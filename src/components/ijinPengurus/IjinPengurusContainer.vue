<template>
  <div class="datasantriContainer">
    <div class="headerWrapper">
      <div class="headerContent">
        <h2 class="title">
          📋 Izin Pengurus
        </h2>
        <div class="jumlahIjin">
          Pengurus Keluar Saat Ini: <strong>{{ keluarData.length }}</strong>
        </div>
      </div>
    </div>

    <div class="tabHeader">
      <button
        :class="['tabButton', { active: activeTab === 'keluar' }]"
        @click="activeTab = 'keluar'"
      >
        Sedang Keluar
      </button>
      <button
        :class="['tabButton', { active: activeTab === 'histori' }]"
        @click="activeTab = 'histori'"
      >
        Histori Izin
      </button>
    </div>

    <div class="scrollArea">
      <div
        class="datasantriCard clickable"
        v-for="(item, index) in activeTab === 'keluar' ? keluarData : historiData"
        :key="index"
      >
        <div class="cardContent">
          <div class="infoWrapper">
            <div class="cardBody">
              <div class="infoRow">
                <span class="label">Nama</span>
                <span class="value">: {{ item.nama }}</span>
              </div>
              <div class="infoRow">
                <span class="label">Keluar</span>
                <span class="value">: {{ formatDate(item.waktuKeluar) }}</span>
              </div>
              <div class="infoRow">
                <span class="label">Kembali</span>
                <span class="value">: {{ item.waktuKembali ? formatDate(item.waktuKembali) : '-' }}</span>
              </div>
              <div class="infoRow">
                <span class="label">Status</span>
                <span class="value" :class="statusClass(item.status)">: {{ item.status }}</span>
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
import { getIjinPengurus, getIjinPengurusKeluar, setAuthToken } from '@/api'

const router = useRouter()
const keluarData = ref<any[]>([])
const historiData = ref<any[]>([])
const activeTab = ref<'keluar' | 'histori'>('keluar')

const formatDate = (datetime: string) => {
  const date = new Date(datetime)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) + ' ' + date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusClass = (status: string) => {
  return status === 'KELUAR' ? 'text-red' : 'text-green'
}

const goToDetail = (id: number) => {
  router.push(`/ijinPengurus/${id}`)
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  try {
    const keluarRes = await getIjinPengurusKeluar()
    keluarData.value = keluarRes.data.map((item: any) => ({
      id: item.id,
      nama: item.Santri?.nama || '-',
      waktuKeluar: item.waktu_keluar,
      waktuKembali: item.waktu_kembali,
      status: item.status
    }))

    const historiRes = await getIjinPengurus()
    historiData.value = historiRes.data.map((item: any) => ({
      id: item.id,
      nama: item.Santri?.nama || '-',
      waktuKeluar: item.waktu_keluar,
      waktuKembali: item.waktu_kembali,
      status: item.status
    }))
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
})
</script>

<style scoped>
.datasantriContainer {
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
}

.headerContent {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.jumlahIjin {
  font-size: 0.95rem;
}

.tabHeader {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tabButton {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  background: #e0e0e0;
  font-weight: bold;
  color: #333;
  transition: 0.2s;
  border: none;
  cursor: pointer;
}

.tabButton.active {
  background: #1A4D2E;
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.scrollArea {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.datasantriCard {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.15s;
}

.datasantriCard:hover {
  transform: scale(1.01);
}

.cardContent {
  display: flex;
  gap: 1rem;
  align-items: center;
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

.text-red {
  color: #c0392b;
  font-weight: bold;
}

.text-green {
  color: #27ae60;
  font-weight: bold;
}
</style>
