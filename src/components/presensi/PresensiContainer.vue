<template>
  <div class="presensiContainer">
    <!-- Card Statistik Bulan Ini -->
    <div class="statistikCard">
      <h2 class="statistikTitle">Statistik Bulan Ini</h2>
      <div class="statistikBulanan">
        <div class="statItem masuk">
          <div class="label">Masuk</div>
          <div class="count">{{jumlahMasuk}}</div>
        </div>
        <div class="statItem sakit">
          <div class="label">Sakit</div>
          <div class="count">0</div>
        </div>
        <div class="statItem izin">
          <div class="label">Ijin</div>
          <div class="count">0</div>
        </div>
        <div class="statItem alpha">
          <div class="label">Alpha</div>
          <div class="count">0</div>
        </div>
      </div>
    </div>

    <!-- Subtitle Riwayat Presensi -->
    <h3 class="riwayatTitle">Riwayat Presensi</h3>

    <!-- Presensi Harian -->
    <div class="presensiListWrapper">
      <div class="presensiGrid">
        <div class="presensiCard" v-for="(item, index) in weeklyPresensi" :key="index">
          <div class="presensiDate">{{ item.tanggal }}</div>
          <hr />
          <div class="absenRow">
            <div class="absenItem">
              <span class="absenLabel">Masuk</span>: 
              <span class="absenValue">{{ item.masuk || '-' }}</span>
            </div>
            <div class="absenItem">
              <span class="absenLabel">Pulang</span>: 
              <span class="absenValue">{{ item.pulang || '-' }}</span>
            </div>
            <div class="absenItem">
              <span class="absenLabel">Jml Ijin</span>: 
              <span class="absenValue">{{ item.izinKeluar || 0 }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {  setAuthToken, PresenceMonthlyCountByStudent, getSiswa, PresenceMonthlyStudentFormated } from '@/api'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
const weeklyPresensi = ref<any[]>([])
const jumlahMasuk = ref<number>(0)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  const siswa = getSiswa() // pastikan ini mengembalikan object siswa yang punya id

  try {
    const response = await PresenceMonthlyStudentFormated(siswa.id_siswa)
    const data = response.data.data

    weeklyPresensi.value = data.map((item: any) => ({
      tanggal: dayjs(item.tanggal).format('dddd, DD/MM/YYYY'),
      masuk: item.masuk,
      pulang: item.pulang,
      izinKeluar: item.jumlah_ijin_keluar
    }))

    const countRes = await PresenceMonthlyCountByStudent(siswa.id_siswa)
    jumlahMasuk.value = countRes.data.data[0]?.jumlah_masuk || 0
  } catch (error) {
    console.error('Gagal memuat data presensi:', error)
  }
})

</script>

<style scoped>
.presensiContainer {
  background: #f4f6f8;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

/* Card Pembungkus Statistik Bulanan */
.statistikCard {
  background-color: #2c7be5; /* biru tegas */
  padding: 1.5rem;
  border-radius: 14px;
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(44, 123, 229, 0.4);
}

/* Judul Statistik */
.statistikTitle {
  margin: 0 0 1rem 0;
  font-weight: 700;
  font-size: 1.6rem;
  user-select: none;
}

/* Statistik Bulanan di dalam card */
.statistikBulanan {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.statItem {
  flex: 1;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem 0;
  text-align: center;
  cursor: default;
  user-select: none;
  transition: background-color 0.3s ease;
}

.statItem:hover {
  background: rgba(255, 255, 255, 0.25);
}

.statItem .label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #f0f4ff;
}

.statItem .count {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
}

.masuk { color: #a8e6cf; }
.sakit { color: #dcedc1; }
.izin { color: #ffd3b6; }
.alpha { color: #ffaaa5; }

/* Subtitle Riwayat Presensi */
.riwayatTitle {
  margin: 1.5rem 0 0.8rem 0;
  font-weight: 700;
  font-size: 1.3rem;
  color: #333;
  user-select: none;
}


/* Scroll wrapper */
.presensiListWrapper {
  max-height: 600px; /* Atur tinggi tetap untuk area scroll */
  overflow-y: auto;
  padding-right: 0.5rem; /* supaya scroll gak nempel */
  border-radius: 14px;
}

/* scrollbar style opsional */
.presensiListWrapper::-webkit-scrollbar {
  width: 8px;
}
.presensiListWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
}

/* Grid Presensi */
.presensiGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

/* Card Presensi Harian */
.presensiCard {
  background: #fff;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 14px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  cursor: default;
}

.presensiDate {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: #333;
  user-select: none;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin-bottom: 0.8rem;
}

.absenRow {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
}

.absenItem {
  text-align: center;
}

.absenLabel {
  font-weight: 600;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.absenValue {
  font-weight: 700;
  font-size: 1.1rem;
  color: #222;
}
</style>
