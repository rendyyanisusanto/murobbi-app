<template>
  <div class="catatanContainer">
    <h2 class="judul">Catatan</h2>

    <div class="catatanList">
      <div class="catatanCard" v-for="(item, index) in catatanData" :key="index">
        <div class="header">
          <div class="tanggal">{{ item.tanggal }}</div>
          <div class="dari">{{ item.dari }}</div>
        </div>
        <div class="contentRow">
          <div class="fotoWrapper">
            <img :src="item.foto" alt="Foto Catatan" />
          </div>
          <div class="textContent">
            <div class="keterangan">{{ item.keterangan }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const catatanData = ref([
  {
    tanggal: "2025-05-01",
    dari: "Guru BK",
    keterangan: "Siswa terlihat murung, perlu ditindaklanjuti lebih lanjut.",
    foto:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?&w=80&h=80&fit=crop",
  },
  {
    tanggal: "2025-05-03",
    dari: "Wali Kelas",
    keterangan: "Belum mengumpulkan tugas matematika 2x.",
    foto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?&w=80&h=80&fit=crop",
  },
  {
    tanggal: "2025-05-07",
    dari: "TU",
    keterangan: "Belum mengembalikan buku inventaris perpustakaan.",
    foto:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?&w=80&h=80&fit=crop",
  },
]);
</script>

<style scoped>
.catatanContainer {
  background: #f4f6f8;
  min-height: 100vh;
  padding: 1rem;
  font-family: "Segoe UI", sans-serif;
}

.judul {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  user-select: none;
}

.catatanList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.catatanCard {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  padding: 1rem;
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

.dari {
  font-weight: 700;
  color: #2c7be5;
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
}

.keterangan {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
}
</style>
