<template>
  <div class="pelanggaranContainer">
    <!-- Statistik Pelanggaran Bulan Ini -->
    <div class="statistikCard">
      <h2 class="statistikTitle">Statistik Pelanggaran Bulan Ini</h2>
      <div class="statistikContent">
        <div class="statItem">
          <div class="label">Total Pelanggaran</div>
          <div class="value">{{ totalPelanggaran }}</div>
        </div>
        <div class="statItem">
          <div class="label">Total Poin</div>
          <div class="value">{{ totalPoin }}</div>
        </div>
      </div>
    </div>

    <h2 class="title">Riwayat Pelanggaran</h2>
    <div class="pelanggaranListWrapper">

        <div class="pelanggaranList">
          <div
            class="pelanggaranCard"
            v-for="(item, index) in pelanggaranData"
            :key="index"
          >
            <div class="header">
              <div class="tanggal">{{ item.tanggal }}</div>
              <div class="poin">Poin: {{ item.poin }}</div>
            </div>
            <div class="contentRow">
              <div class="fotoWrapper">
                <img :src="item.foto" alt="Foto Pelanggaran" />
              </div>
              <div class="textContent">
                <div class="pelanggaran">{{ item.pelanggaran }}</div>
                <div class="keterangan">{{ item.keterangan }}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const pelanggaranData = ref([
  {
    tanggal: "2025-05-01",
    pelanggaran: "Terlambat Masuk",
    keterangan: "Masuk kelas terlambat 15 menit",
    poin: 2,
    foto:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?&w=80&h=80&fit=crop",
  },
  {
    tanggal: "2025-05-05",
    pelanggaran: "Tidak Memakai Seragam",
    keterangan: "Datang ke sekolah tanpa memakai seragam lengkap",
    poin: 3,
    foto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?&w=80&h=80&fit=crop",
  },
  {
    tanggal: "2025-05-10",
    pelanggaran: "Menggunakan HP saat Pelajaran",
    keterangan: "Terlihat menggunakan HP saat guru menjelaskan",
    poin: 1,
    foto:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?&w=80&h=80&fit=crop",
  },
  {
    tanggal: "2025-05-12",
    pelanggaran: "Tidak Mengumpulkan Tugas",
    keterangan: "Tugas matematika tidak dikumpulkan tepat waktu",
    poin: 2,
    foto:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?&w=80&h=80&fit=crop",
  },
]);

const totalPelanggaran = computed(() => pelanggaranData.value.length);
const totalPoin = computed(() =>
  pelanggaranData.value.reduce((sum, item) => sum + item.poin, 0)
);
</script>

<style scoped>
.pelanggaranContainer {
  background: #f4f6f8;
  min-height: 100vh;
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
  font-size: 1.5rem;
}

.statistikContent {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.statItem {
  text-align: center;
  flex: 1;
}

.statItem .label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  opacity: 0.8;
}

.statItem .value {
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 1px;
}

/* Title Riwayat */
.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
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
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: #222;
  user-select: none;
}

.keterangan {
  font-size: 0.9rem;
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
