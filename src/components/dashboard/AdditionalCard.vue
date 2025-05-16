<template>
    <div class="d-flex justify-content-between gap-3 mb-4 flex-wrap">
        <!-- Card Kehadiran -->
        <div class="card shadow rounded-4 border-0 px-3 py-3" style="background-color: #fef9e7; width: 47%;">
          <div class="card-body p-0">
            <h6 class="fw-bold text-dark mb-2">Kehadiran</h6>
            <div class="d-flex justify-content-between">
              <div>
                <p class="mb-1 text-muted small">Masuk</p>
                <p class="fw-semibold text-success m-0">{{hadir.masuk}}</p>
              </div>
              <div class="text-end">
                <p class="mb-1 text-muted small">Pulang</p>
                <p class="fw-semibold text-danger m-0">{{hadir.keluar}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Tanggungan -->
        <div class="card shadow rounded-4 border-0 px-3 py-3" style="background-color: #ebf5fb; width: 47%;">
          <div class="card-body p-0">
            <h6 class="fw-bold text-dark mb-2">Tanggungan</h6>
            <p class="mb-1 text-muted small">Bulan Ini</p>
            <p class="fw-semibold text-primary fs-5 mb-0">Rp150.000</p>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs' // Pastikan ini sudah di-install: `npm install dayjs`
import { setAuthToken, getPresensiRFIDIn, getPresensiRFIDOut, getSiswa } from '@/api'

const hadir = ref({
  masuk: '-',
  keluar: '-',
})

onMounted(async () => {
  
  const token = localStorage.getItem('token')
  
  
  const siswa = getSiswa()
  // console.log(siswa.id_siswa);
  const idSiswa = siswa.id_siswa || siswa.id_siswa || siswa.id_siswa
  setAuthToken(token || '')
  if (!idSiswa) return

  try {
    const [resMasuk, resPulang] = await Promise.all([
      getPresensiRFIDIn(idSiswa),
      getPresensiRFIDOut(idSiswa)
    ])

    const today = dayjs().format('YYYY-MM-DD')

    const dataMasukHariIni = resMasuk.data.find((item: any) =>
      dayjs(item.tanggal).format('YYYY-MM-DD') === today
    )

    const dataPulangHariIni = resPulang.data.find((item: any) =>
      dayjs(item.tanggal).format('YYYY-MM-DD') === today
    )

    hadir.value = {
      masuk: dataMasukHariIni?.waktu || '-',
      keluar: dataPulangHariIni?.waktu || '-'
    }
  } catch (err) {
    console.error('Gagal mengambil data presensi:', err)
  }
})
</script>