<template>
  <div class="pelanggaranContainer">
    <h3 class="formTitle">Formulir Pengajuan Pelanggaran</h3>

    <form @submit.prevent="submitForm" class="formMinimal">
      <div class="mb-4">
        <label class="form-label" for="santri">Pilih Santri</label>
        <Multiselect
          v-model="form.santri_ids"
          :options="santriOptions"
          :multiple="true"
          :searchable="true"
          label="label"
          track-by="id"
          placeholder="Cari dan pilih santri..."
          id="santri"
          class="custom-multiselect"
        />
      </div>

      <div class="mb-4">
        <label class="form-label" for="tatib">Pilih Tata Tertib</label>
        <select
          id="tatib"
          v-model="form.tatib_id"
          class="form-control"
          required
        >
          <option value="" disabled>Pilih salah satu tata tertib</option>
          <option
            v-for="tatib in tatibOptions"
            :key="tatib.id"
            :value="tatib.id"
          >
            {{ tatib.nama }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label" for="tanggal">Tanggal</label>
        <input
          id="tanggal"
          v-model="form.tanggal"
          type="date"
          class="form-control"
          required
        />
      </div>

      <div class="mb-4">
        <label class="form-label" for="kronologi">Kronologi</label>
        <textarea
          id="kronologi"
          v-model="form.kronologi"
          class="form-control"
          rows="5"
          required
          placeholder="Jelaskan kronologi secara singkat"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="form-label" for="foto">Nama File Foto (Opsional)</label>
        <input
          id="foto"
          type="file"
          @change="handleFileChange"
          class="form-control"
          accept="image/*"
        />
      </div>

      <div class="d-grid mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="loading"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan Pengajuan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import { useRouter } from 'vue-router'
import { setAuthToken, PostPengajuanPelanggaran,getSantri, getAllTatib, getAllSantri } from '@/api'

const form = ref({
  kode: '',
  takzir: '',
  tanggal: '',
  kronologi: '',
  foto: '',
  santri_ids: [] as any[],
  tatib_id: 1,
  pelapor_id: 1538,
  status_dokumen_pelanggaran: 'BELUM DIPROSES',
  status_aktif: true
})
const router = useRouter() // ✅ Inisialisasi router

const loading = ref(false)
const santriOptions = ref<{ id: number; label: string }[]>([])
const tatibOptions = ref<{ id: number; nama: string }[]>([])
const fotoFile = ref<File | null>(null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    fotoFile.value = target.files[0]
  }
}
onMounted(async () => {
  const token = localStorage.getItem('token')
  const localSantri = getSantri()
  if (localSantri.id) form.value.pelapor_id = parseInt(localSantri.id)
  if (token) setAuthToken(token)

  try {
    const res = await getAllSantri()
    santriOptions.value = res.data.map((s: any) => ({
      id: s.id,
      label: `${s.nama} - ${s.nis}`
    }))


    const tatibRes = await getAllTatib() // Ganti ini sesuai API kamu
    tatibOptions.value = tatibRes.data.map((t: any) => ({
      id: t.id,
      nama: `${t.kode} - ${t.nama}` || `Tatib #${t.id}` // Sesuaikan struktur data API-mu
    }))

  } catch (err) {
    console.error('Gagal memuat santri:', err)
  }
})

const submitForm = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('tanggal', form.value.tanggal)
    formData.append('kronologi', form.value.kronologi)
    formData.append('tatib_id', String(form.value.tatib_id))
    formData.append('pelapor_id', String(form.value.pelapor_id))
    formData.append('status_dokumen_pelanggaran', form.value.status_dokumen_pelanggaran)

    form.value.santri_ids.forEach((sId, idx) => {
      formData.append(`santri_ids[${idx}]`, sId.id || sId) // support object or ID
    })

    if (fotoFile.value) {
      formData.append('foto', fotoFile.value)
    }

    await PostPengajuanPelanggaran(formData)
    alert('Pengajuan berhasil ditambahkan!')
    form.value = {
      ...form.value,
      kode: '',
      takzir: '',
      tanggal: '',
      kronologi: '',
      foto: '',
      santri_ids: []
    }
    await router.push('/pengajuanPelanggaran')
  } catch (err) {
    console.error('Gagal menyimpan:', err)
    alert('Terjadi kesalahan saat menyimpan.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.pelanggaranContainer {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 3rem 1.5rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

.formTitle {
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #222;
}

.formMinimal {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.formMinimal .form-label {
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.formMinimal .form-control,
.custom-multiselect .multiselect {
  border: 1.8px solid #bbb;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  width: 100%;
}

.formMinimal .form-control:focus,
.custom-multiselect .multiselect:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  outline: none;
}

.custom-multiselect .multiselect {
  min-height: 50px;
  padding: 0.3rem 0.8rem;
}

button.btn-primary {
  width: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.9rem 0;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

button.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  border-color: #0056b3;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
