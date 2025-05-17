<template>
  <div class="pageWrapper">
    <h2 class="pageTitle">Detail Rekam Medis</h2>

    <div v-if="detail" class="cardDetail">
      <div v-if="detail.foto" class="imageWrapper">
        <img :src="detail.foto" alt="Foto RekamMedis" class="fotoDetail" />
      </div>

      <div class="textInfo">
        <div class="infoRow">
          <span class="label">Tanggal:</span>
          <span class="value">{{ formattedDate }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Diagnosis:</span>
          <span class="value">{{ detail.diagnosis }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Catatan:</span>
          <span class="value">{{ detail.catatan }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Lama Sakit:</span>
          <span class="value">{{ detail.lama_sakit }} Hari</span>
        </div>
        <div class="infoRow">
          <span class="label">Status Rekam Medis:</span>
          <span class="value">{{ detail.status_rekam_medis }} Hari</span>
        </div>
        <div class="infoRow">
          <span class="label">Perawat:</span>
          <span class="value">{{ detail.perawat }}</span>
        </div>

        
        <!-- Obat List -->
        <div class="infoRow">
          <span class="label">Obat:</span>
          <div class="cardItemWrapper">
            <div v-for="obat in detail.obat_list" :key="obat.id" class="cardItem">
              {{ obat.nama }}
            </div>
          </div>
        </div>

        <!-- Keluhan List -->
        <div class="infoRow">
          <span class="label">Keluhan:</span>
          <div class="cardItemWrapper">
            <div v-for="keluhan in detail.keluhan_list" :key="keluhan.id" class="cardItem">
              {{ keluhan.nama }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { setAuthToken, getDetailRekamMedis } from '@/api'
import config from '@/config/config'

const route = useRoute()

const detail = ref<{
  tanggal: string
  catatan: string
  diagnosis: string
  lama_sakit: string
  status_rekam_medis: string
  perawat: string
  foto: string
  
  obat_list: { id: number; nama: string }[]
  keluhan_list: { id: number; nama: string }[]
} | null>(null)

const formattedDate = computed(() =>
  detail.value ? dayjs(detail.value.tanggal).format('DD MMMM YYYY') : ''
)

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    console.error('ID Rekam Medis tidak ditemukan')
    return
  }

  try {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)

    const response = await getDetailRekamMedis(id)
    detail.value = {
      tanggal: response.data.tanggal,
      catatan: response.data.catatan,
      diagnosis: response.data.diagnosis,
      status_rekam_medis: response.data.status_rekam_medis.nama,
      lama_sakit: response.data.lama_sakit,
      perawat: response.data.perawat.nama,
      foto: `${config.BASE_MEDIA_URL}/rekam_medis/${response.data.foto}`,
      obat_list: response.data.obat_list || [],
      keluhan_list: response.data.keluhan_list || []
    }
  } catch (err) {
    console.error('Gagal ambil detail RekamMedis', err)
  }
})
</script>

<style scoped>
.pageWrapper {
  background: #f9fafb;
  min-height: 150vh;
  height: 100%;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardItemWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cardItem {
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.pageTitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.cardDetail {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  width: 100%;
  margin-bottom: 5rem;
}

.imageWrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.fotoDetail {
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid #e5e7eb;
}

.textInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.infoRow {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
}

.value {
  font-size: 1rem;
  color: #111827;
  margin-top: 0.25rem;
}
</style>
