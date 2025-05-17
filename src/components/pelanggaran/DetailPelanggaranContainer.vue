<template>
  <div class="pageWrapper">
    <h2 class="pageTitle">Detail Pelanggaran</h2>

    <div v-if="detail" class="cardDetail">
      <div v-if="detail.foto" class="imageWrapper">
        <img :src="detail.foto" alt="Foto Pelanggaran" class="fotoDetail" />
      </div>

      <div class="textInfo">
        <div class="infoRow">
          <span class="label">Tanggal:</span>
          <span class="value">{{ formattedDate }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Pelanggaran:</span>
          <span class="value">{{ detail.pelanggaran }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Tata Tertib:</span>
          <span class="value">{{ detail.tatib }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Keterangan:</span>
          <span class="value">{{ detail.kronologi }}</span>
        </div>
        <div class="infoRow">
          <span class="label">Poin:</span>
          <span class="value">{{ detail.poin }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { setAuthToken, getDetailPelanggaran } from '@/api'
import config from '@/config/config'

const route = useRoute()

const detail = ref<{
  tanggal: string
  tatib: string
  pelanggaran: string
  kronologi: string
  poin: number
  foto: string
} | null>(null)

const formattedDate = computed(() =>
  detail.value ? dayjs(detail.value.tanggal).format('DD MMMM YYYY') : ''
)

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    console.error('ID pelanggaran tidak ditemukan')
    return
  }

  try {
    const token = localStorage.getItem('token')
    if (token) setAuthToken(token)

    const response = await getDetailPelanggaran(id)
    detail.value = {
      tanggal: response.data.tanggal,
      pelanggaran: response.data.pelanggaran,
      tatib: response.data.tatib.nama,
      kronologi: response.data.kronologi,
      poin: response.data.tatib.poin,
      foto: `${config.BASE_MEDIA_URL}/pelanggaran/${response.data.foto}`
    }
  } catch (err) {
    console.error('Gagal ambil detail pelanggaran', err)
  }
})
</script>

<style scoped>
.pageWrapper {
  background: #f9fafb;
  min-height: 120vh;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
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
