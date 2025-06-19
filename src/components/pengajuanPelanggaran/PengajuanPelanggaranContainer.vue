<template>
  <div class="pelanggaranContainer">
    <div class="headerWrapper">
      <h2 class="title">Riwayat Pengajuan Pelanggaran</h2>
      <button class="btnTambah" @click="goToTambah">
        <i class="bi bi-plus-circle me-2"></i> Tambah Pengajuan
      </button>
    </div>
    <div class="pelanggaranListWrapper">
      <div class="pelanggaranList">
        <div
          class="pelanggaranCard"
          v-for="(item, index) in pengajuanData"
          :key="index"
        >
          <div class="header">
            <div class="tanggal">{{ item.tanggal }}</div>
            <div class="poin">Status: {{ item.status }}</div>
          </div>
          <div class="contentRow">
            <div class="fotoWrapper">
              <img :src="item.foto" alt="Foto Pelanggaran" />
            </div>
            <div class="textContent">
              <div class="pelanggaran">{{ item.pelanggaran }}</div>
              <div class="keterangan">{{ item.kronologi }}</div>
            </div>
          </div>
          <hr class="divider" />
          <div class="buttonWrapper">
            <button class="detailButton" @click="showDetail(item)">
              Lihat Detail Pengajuan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { setAuthToken, getSantri, GetPengajuanPelanggaran } from '@/api'
import config from '@/config/config'

const pengajuanData = ref<any[]>([])
const router = useRouter()

const showDetail = (item: any) => {
  router.push(`/pengajuan/${item.id}`)  // ganti dengan route detail jika ada
}
const goToTambah = () => {
  router.push('/pengajuanPelanggaran/add')
}
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)

    const santri = getSantri()
    const response = await GetPengajuanPelanggaran(santri.santri.id)
    const data = response.data

    pengajuanData.value = data.map((item: any) => ({
      id: item.id,
      tanggal: dayjs(item.tanggal).format('DD-MM-YYYY'),
      pelanggaran: item.Tatib.nama || 'Tidak diketahui',
      kronologi: item.kronologi || '-',
      status: item.status_pengajuan || 'BELUM DIPROSES',
      foto: item.foto
        ? `${config.BASE_MEDIA_URL}/pelanggaran/${item.foto}`
        : 'https://placehold.co/600x400'  // fallback jika foto kosong
    }))
  } catch (error) {
    console.error('Gagal mengambil data pengajuan pelanggaran:', error)
  }
})
</script>

<style scoped>
.headerWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1A4D2E;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: #F5F1E3;
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
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(22, 160, 133, 0.3);
}

.btnTambah:hover {
  background: linear-gradient(135deg, #149174, #16a085);
  transform: translateY(-2px);
}

.headerDivider {
  height: 2px;
  background-color: #ddd;
  margin: 0 0 1.5rem 0;
  border-radius: 1px;
}
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
  background-color: #1A4D2E;
  color:#F5F1E3;
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
  background-color: #F5F1E3;
  color: #1A4D2E;
}


.pelanggaranContainer {
  background: #F5F1E3;
  min-height: 120vh;
  padding: 1rem;
  font-family: "Segoe UI", sans-serif;
}

/* Card Statistik */
.statistikCard {
  background-color: #d9534f; /* merah tegas */
  padding: 1.5rem;
  border-radius: 14px;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(217, 83, 79, 0.4);
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
  color: #F5F1E3;
  user-select: none;
}

.pelanggaranList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pelanggaranCard {
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

.pelanggaran {
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
.pelanggaranListWrapper {
  max-height: 600px; /* Atur tinggi tetap untuk area scroll */
  overflow-y: auto;
  padding-right: 0.5rem; /* supaya scroll gak nempel */
  border-radius: 14px;
}

/* scrollbar style opsional */
.pelanggaranListWrapper::-webkit-scrollbar {
  width: 8px;
}
.pelanggaranListWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
}
</style>
