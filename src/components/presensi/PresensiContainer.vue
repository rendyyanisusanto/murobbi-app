<template>
  <div class="presensiContainer">
    <!-- Card Statistik Bulan Ini -->
    <div class="statistikCard">
      <h2 class="statistikTitle">Statistik Bulan Ini</h2>
      <div class="statistikBulanan">
        <div class="statItem masuk">
          <div class="label">Masuk</div>
          <div class="count">{{ jumlahMasuk }}</div>
        </div>
        <div class="statItem sakit">
          <div class="label">Sakit</div>
          <div class="count">{{ jumlahSakit }}</div>
        </div>
        <div class="statItem alpha">
          <div class="label">Alpha</div>
          <div class="count">{{ jumlahAlpha }}</div>
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
          <div class="statusList">
            <div class="statusItem" v-for="(status, shift) in item.shifts" :key="shift">
              <span class="shiftName">{{ shift }}</span>
              <span class="badge" :class="statusBadgeClass(status)">{{ status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { setAuthToken, PresenceMonthlyCountByStudent, PresenceMonthlyStudentFormated, getSantri } from '@/api'

const weeklyPresensi = ref<any[]>([])
const jumlahMasuk = ref(0)
const jumlahSakit = ref(0)
const jumlahAlpha = ref(0)

function statusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case 'hadir':
      return 'badge-hadir'
    case 'sakit':
      return 'badge-sakit'
    case 'ijin':
    case 'izin':
      return 'badge-ijin'
    case 'alpha':
      return 'badge-alpha'
    default:
      return 'badge-default'
  }
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  const santri = getSantri()
  try {
    const response = await PresenceMonthlyStudentFormated(santri.santri.id)
    const data = response.data

    const statusCount: Record<string, number> = {
      hadir: 0,
      sakit: 0,
      alpha: 0
    }

    weeklyPresensi.value = data.map((item: any) => {
      const shifts: Record<string, string> = {}
      Object.keys(item).forEach((key) => {
        if (key !== 'tanggal') {
          shifts[key] = item[key]

          // Hitung jumlah status
          const normalized = item[key].toLowerCase()
          if (statusCount[normalized] !== undefined) {
            statusCount[normalized]++
          }
        }
      })
      return {
        tanggal: dayjs(item.tanggal).format('dddd, DD/MM/YYYY'),
        shifts
      }
    })

    jumlahMasuk.value = statusCount.hadir
    jumlahSakit.value = statusCount.sakit
    jumlahAlpha.value = statusCount.alpha
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

.statistikCard {
  background-color: #2c7be5;
  padding: 1.5rem;
  border-radius: 14px;
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(44, 123, 229, 0.4);
}

.statistikTitle {
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.6rem;
}

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
}

.statItem .label {
  font-weight: 600;
  font-size: 1rem;
  color: #f0f4ff;
}

.statItem .count {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
}

.riwayatTitle {
  margin: 1.5rem 0 0.8rem 0;
  font-weight: 700;
  font-size: 1.3rem;
  color: #333;
}

.presensiListWrapper {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
  border-radius: 14px;
}

.presensiGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.presensiCard {
  background: #fff;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.presensiDate {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: #333;
}

.statusList {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.statusItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shiftName {
  font-weight: 600;
  color: #555;
  text-transform: capitalize;
}

.badge {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-hadir {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-sakit {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-ijin {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-alpha {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-default {
  background-color: #e5e7eb;
  color: #374151;
}
</style>
