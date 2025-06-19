<template>
  <div class="perizinanContainer">
    <div class="headerWrapper">
      <h2 class="title">Riwayat Perizinan Santri</h2>
      <button class="btnTambah" @click="goToTambah">
        <i class="bi bi-plus-circle me-2"></i> Tambah Perizinan
      </button>
    </div>
    <div class="scrollArea">
      <div
        class="perizinanCard"
        v-for="(item, index) in pengajuanData"
        :key="index"
      >
        <div class="cardHeader">
          <div class="kode">{{ item.kode }}</div>
          <div class="status">
            <span :class="['badge', getStatusClass(item.status)]">
              {{ item.status.replace(/_/g, ' ') }}
            </span>
          </div>
        </div>
        <div class="cardBody">
          <div class="infoRow"><span class="label">Nama</span><span class="value">: {{ item.nama }}</span></div>
          <div class="infoRow"><span class="label">Jenis Izin</span><span class="value">: {{ item.jenis_izin }}</span></div>
          <div class="infoRow"><span class="label">Alasan</span><span class="value">: {{ item.alasan }}</span></div>
          <div class="infoRow"><span class="label">Tanggal Izin</span><span class="value">: {{ item.tanggal }}</span></div>
          <div class="infoRow"><span class="label">Tanggal Kembali</span><span class="value">: {{ item.kembali }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { setAuthToken, GetPerizinanSantri } from '@/api'

const pengajuanData = ref<any[]>([])
const router = useRouter()

const goToTambah = () => router.push('/perizinanSantri/add')

const getStatusClass = (status: string) => {
  switch (status) {
    case 'DIAJUKAN ASRAMA': return 'badge-warning'
    case 'DIAJUKAN POSKESTREN': return 'badge-info'
    case 'DIKETAHUI KETUA KAMAR': return 'badge-secondary'
    case 'DIKETAHUI KABID': return 'badge-primary'
    case 'SELESAI': return 'badge-success'
    case 'DITOLAK': return 'badge-danger'
    default: return 'badge-light'
  }
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)

    const response = await GetPerizinanSantri()
    const data = response.data

    pengajuanData.value = data.map((item: any) => ({
      id: item.id,
      kode: item.kode,
      nama: item.Santri?.nama || 'Tidak diketahui',
      jenis_izin: item.jenis_izin.replace(/_/g, ' '),
      alasan: item.alasan || '-',
      tanggal: dayjs(item.tanggal_izin).format('DD-MM-YYYY'),
      kembali: dayjs(item.tanggal_kembali).format('DD-MM-YYYY'),
      status: item.status_dokumen.replace(/_/g, ' ') || 'DIAJUKAN ASRAMA'
    }))
  } catch (error) {
    console.error('Gagal mengambil data perizinan:', error)
  }
})
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

.perizinanContainer {
  background: #F5F1E3;
  min-height: 100vh;
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

.perizinanCard {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.2rem 1.2rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1A4D2E;
  color: #F5F1E3;
  padding: 1rem 1.2rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin: -1rem -1rem 1rem; /* tarik ke atas agar seamless */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.kode {
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
}

.status .badge {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
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
  width: 140px;
  font-weight: 600;
  color: #1A4D2E;
}

.value {
  flex: 1;
  color: #333;
}

/* Badge Colors */
.badge-warning { background-color: #f0ad4e; }
.badge-info { background-color: #5bc0de; }
.badge-secondary { background-color: #6c757d; }
.badge-primary { background-color: #007bff; }
.badge-success { background-color: #5cb85c; }
.badge-danger { background-color: #d9534f; }
.badge-light { background-color: #bbb; }
</style>
