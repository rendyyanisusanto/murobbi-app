<template>
  <div class="RekamMedisContainer">
    <!-- Statistik RekamMedis Bulan Ini -->
    <div class="statistikCard">
      <h2 class="statistikTitle">Statistik Rekam Medis Bulan Ini</h2>
      <div class="statistikContent">
        <div class="statItem">
          <div class="label">Total Rekam Medis</div>
          <div class="value">0</div>
        </div>
        <div class="statItem">
          <div class="label">Jumlah Obat</div>
          <div class="value">0</div>
        </div>
      </div>
    </div>

    <h2 class="title">Riwayat RekamMedis</h2>
    <div class="RekamMedisListWrapper">

        <div class="RekamMedisList">
          <div
            class="RekamMedisCard"
            v-for="(item, index) in RekamMedisData"
            :key="index"
          >
            <div class="header">
              <div class="tanggal">{{ item.tanggal }}</div>
              <div class="poin">Status: {{ item.status_rekam_medis }}</div>
            </div>
            <div class="contentRow">
              <div class="fotoWrapper">
                <img :src="item.foto" alt="Foto RekamMedis" />
              </div>
              <div class="textContent">
                <div class="RekamMedis">{{ item.diagnosis }}</div>
                <div class="keterangan">{{ item.catatan }}</div>
              </div>
            </div>
            <hr class="divider" />

            <div class="buttonWrapper">
              <button class="detailButton" @click="showDetail(item)">
                Lihat Detail Rekam Medis
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import dayjs from "dayjs"
import { setAuthToken, GetRekamMedisBySantriID, getSantri } from '@/api'

import { useRouter } from 'vue-router'
import config from '@/config/config'
const RekamMedisData = ref<{
  tanggal: string
  kode: string
  diagnosis: string
  catatan: string
  status_rekam_medis: string
  foto: string
}>([])

const router = useRouter()
const totalRekamMedis = computed(() => RekamMedisData.value.length)
const totalPoin = computed(() =>
  RekamMedisData.value.reduce((sum, item) => sum + (item.tatib?.poin || 0), 0)
)
const showDetail = (item: any) => {
  console.log("Detail RekamMedis:", item.id)
  // Kamu bisa ganti ini jadi buka modal atau navigate ke halaman detail
  router.push(`/poskestren/${item.id}`)
}
onMounted(async () => {

  try {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)

    const santri = getSantri() // pastikan ini mengembalikan object siswa yang punya id

    const response = await GetRekamMedisBySantriID(santri.santri.id)
    const data = response.data

    // mapping response ke format yang akan ditampilkan
    RekamMedisData.value = data.map((item: {
      id: number
      tanggal: string
        kode: string
        diagnosis: string
        catatan: string
        status_rekam_medis: string
        foto: string
    }) => ({
      id: item.id,
      tanggal: dayjs(item.tanggal).format("DD-MM-YYYY"),
      kode: item.kode || "Tidak diketahui",
      diagnosis: item.diagnosis || "-",
      catatan: item.catatan || "-",
      status_rekam_medis: item.status_rekam_medis?.nama || 0,
      foto: `${config.BASE_MEDIA_URL}/rekam_medis/${item.foto}` // sesuaikan path penyimpanan fotomu
    }))
  } catch (error) {
    console.error("Gagal mengambil data RekamMedis:", error)
  }
})
</script>

<style scoped>
.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 12px 0;
}

.buttonWrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.detailButton {
  width: 100%;
  /* max-width: 200px; */
  background-color: #2563eb;
  color: white;
  font-size: 0.8rem;
  padding: 5px 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: background-color 0.3s ease;
}

.detailButton:hover {
  background-color: #1e40af;
}


.RekamMedisContainer {
  background: #f4f6f8;
  min-height: 120vh;
  padding: 1rem;
  font-family: "Segoe UI", sans-serif;
}

/* Card Statistik */
.statistikCard {
  background-color: #009432; /* merah tegas */
  padding: 1.5rem;
  border-radius: 14px;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px #A3CB38(217, 83, 79, 0.4);
  user-select: none;
}

.statistikTitle {
  margin: 0 0 1rem 0;
  font-weight: 700;
  font-size: 1rem;
}

.statistikContent {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.statItem {
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem 0;
  flex: 1;
}

.statItem .label {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  opacity: 0.8;
}

.statItem .value {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 1px;
}

/* Title Riwayat */
.title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  user-select: none;
}

.RekamMedisList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.RekamMedisCard {
  background: white;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  cursor: default;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  user-select: none;
}

.tanggal {
  font-weight: 600;
  color: #444;
}

.poin {
  font-weight: 700;
  color: #d9534f;
}

.contentRow {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.fotoWrapper {
  flex-shrink: 0;
}

.fotoWrapper img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.textContent {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.RekamMedis {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: #222;
  user-select: none;
}

.keterangan {
  font-size: 0.7rem;
  color: #666;
}

/* Scroll wrapper */
.RekamMedisListWrapper {
  max-height: 600px; /* Atur tinggi tetap untuk area scroll */
  overflow-y: auto;
  padding-right: 0.5rem; /* supaya scroll gak nempel */
  border-radius: 14px;
}

/* scrollbar style opsional */
.RekamMedisListWrapper::-webkit-scrollbar {
  width: 8px;
}
.RekamMedisListWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
}
</style>
