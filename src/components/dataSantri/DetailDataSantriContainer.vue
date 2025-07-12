<template>
  <div class="detailContainer">
    <h2 class="sectionTitle">Biodata Santri</h2>

    <div class="cardContent" v-if="santri">
      <!-- FOTO -->
      <div class="fotoWrapper">
        <img :src="santri.foto || 'https://placehold.co/160x160?text=Foto'" alt="Foto Santri" />
      </div>

      <!-- BIODATA -->
      <div class="infoWrapper">
        <div class="infoGroup">
          <div class="infoRow"><span class="label">Nama</span><span class="value">{{ santri.nama }}</span></div>
          <div class="infoRow"><span class="label">NIS</span><span class="value">{{ santri.nis }}</span></div>
          <div class="infoRow"><span class="label">NIK</span><span class="value">{{ santri.nik }}</span></div>
          <div class="infoRow"><span class="label">Tempat, Tgl Lahir</span><span class="value">{{ santri.tempat_lahir }}, {{ formatTanggal(santri.tanggal_lahir) }}</span></div>
          <div class="infoRow"><span class="label">Jenis Kelamin</span><span class="value">{{ santri.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</span></div>
          <div class="infoRow"><span class="label">Alamat</span><span class="value">{{ santri.alamat }}</span></div>
        </div>

        <div class="infoGroup">
          <div class="infoRow"><span class="label">Nama Ayah</span><span class="value">{{ santri.nama_ayah }}</span></div>
          <div class="infoRow"><span class="label">No. HP Ayah</span><span class="value">{{ santri.no_hp_ayah }}</span></div>
          <div class="infoRow"><span class="label">Nama Ibu</span><span class="value">{{ santri.nama_ibu }}</span></div>
          <div class="infoRow"><span class="label">No. HP Ibu</span><span class="value">{{ santri.no_hp_ibu }}</span></div>
          <div class="infoRow"><span class="label">Asrama / Kamar</span><span class="value">{{ kamar?.nama_asrama }} / {{ kamar?.nama_kamar }}</span></div>
        </div>
      </div>

      <!-- DOKUMEN -->
      <div class="dokumenWrapper" v-if="dokumen.length">
        <h3 class="dokumenTitle">Dokumen Santri</h3>
        <div class="dokumenGrid">
          <div class="dokumenCard" v-for="doc in dokumen" :key="doc.id">
            <!-- <a :href="doc.file" target="_blank"> -->
              <img
                :src="doc.file"
                :alt="doc.fname"
                @click.prevent="popupImage = doc.file"
              />
              <p class="docLabel">{{ doc.fname }}</p>
            <!-- </a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Gambar -->
<div class="modalBackdrop" v-if="popupImage" @click="popupImage = ''">
  <div class="modalImage">
    <img :src="popupImage" alt="Dokumen Preview" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSantriById, setAuthToken } from '@/api'
import dayjs from 'dayjs'
const popupImage = ref('')
const route = useRoute()
const santri = ref<any>(null)
const kamar = ref<any>(null)
const dokumen = ref<any[]>([])

const formatTanggal = (tgl: string) => {
  return dayjs(tgl).format('DD-MM-YYYY')
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  try {
    const res = await getSantriById(route.params.id)
    const data = res.data || res
    santri.value = data.santri
    kamar.value = data.kamar_santri
    dokumen.value = data.dokumen_santri || []
  } catch (error) {
    console.error('Gagal memuat data santri:', error)
  }
})
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: zoom-out;
}

.modalImage img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.detailContainer {
  background: #f5f1e3;
  min-height: 200vh;
  padding: 2rem 1rem;
}

.sectionTitle {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1A4D2E;
  border-bottom: 2px solid #1A4D2E;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.cardContent {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.fotoWrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.fotoWrapper img {
  width: 160px;
  height: 160px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #1A4D2E;
}

.infoWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.infoGroup {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.infoRow {
  display: flex;
  font-size: 0.8rem;
}

.label {
  width: 160px;
  font-weight: 600;
  color: #1A4D2E;
}

.value {
  flex: 1;
  color: #333;
}

/* Dokumen Styles */
.dokumenWrapper {
  margin-top: 3rem;
}

.dokumenTitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1A4D2E;
}

.dokumenGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}

.dokumenCard {
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 0.75rem;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.dokumenCard:hover {
  transform: scale(1.03);
}

.dokumenCard img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.docLabel {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .infoWrapper {
    grid-template-columns: 1fr;
  }

  .value {
    text-align: left;
  }
}
</style>
