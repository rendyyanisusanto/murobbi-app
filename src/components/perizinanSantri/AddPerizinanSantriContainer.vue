<template>
  <div class="perizinanContainer">
    <h3 class="formTitle">Formulir Perizinan Santri</h3>

    <form @submit.prevent="submitForm" class="formMinimal">
      <div class="mb-4">
        <label class="form-label" for="santri">Pilih Santri</label>
        <Multiselect
            v-model="form.santri_id"
            :options="santriOptions"
            :searchable="true"
            label="label"
            track-by="id"
            placeholder="Cari santri..."
            class="custom-multiselect"
            />
      </div>

      <div class="mb-4">
        <label class="form-label" for="jenis_izin">Jenis Izin</label>
        <select
          id="jenis_izin"
          v-model="form.jenis_izin"
          class="form-control"
          required
        >
          <option value="SAKIT">Sakit</option>
          <option value="PULANG">Pulang</option>
          <option value="ACARA_KELUARGA">Acara Keluarga</option>
          <option value="URUSAN_LAIN">Urusan Lain</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label" for="alasan">Alasan</label>
        <textarea
          id="alasan"
          v-model="form.alasan"
          class="form-control"
          rows="4"
          required
          placeholder="Tulis alasan izin"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="form-label" for="tanggal_izin">Tanggal Izin</label>
        <input
          id="tanggal_izin"
          v-model="form.tanggal_izin"
          type="date"
          class="form-control"
          required
        />
      </div>

      <div class="mb-4">
        <label class="form-label" for="tanggal_kembali">Tanggal Kembali</label>
        <input
          id="tanggal_kembali"
          v-model="form.tanggal_kembali"
          type="date"
          class="form-control"
          required
        />
      </div>

      <div class="d-grid mt-4">
        <button
          type="submit"
          class="btn btn-lg"
          :disabled="loading"
          style="background-color: #1A4D2E; color: white"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan Perizinan' }}
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import { getUser, getAllSantri, setAuthToken, PostPerizinanSantri } from '@/api'

const router = useRouter()
const loading = ref(false)

const form = ref({
  santri_id: null,
  tanggal_izin: '',
  tanggal_kembali: '',
  alasan: '',
  jenis_izin: '',
  kode: '',
  status_dokumen: 'DIAJUKAN_ASRAMA',
  status_aktif: true
})

const santriOptions = ref<{ id: number; label: string }[]>([])
var status_dokumen = "";
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) setAuthToken(token)

  const res = await getAllSantri()
  
  const userData = getUser()
  const groupNames = userData.groups.map((g: any) => g.name.toUpperCase())

    if (groupNames.includes('ASRAMA')) {
    status_dokumen = 'DIAJUKAN_ASRAMA'
    } else if (groupNames.includes('UKP')) {
    status_dokumen = 'DIAJUKAN_POSKESTREN'
    }

  console.log('User Data:', userData)
  santriOptions.value = res.data.map((s: any) => ({
    id: s.id,
    label: `${s.nama}`
  }))
})

const submitForm = async () => {
  loading.value = true
  try {
    if (!form.value.santri_id) {
      alert('Santri belum dipilih.')
      loading.value = false
      return
    }

    const formData = new FormData()
    formData.append('tanggal_izin', form.value.tanggal_izin)
    formData.append('tanggal_kembali', form.value.tanggal_kembali)
    formData.append('alasan', form.value.alasan)
    formData.append('jenis_izin', form.value.jenis_izin)
    formData.append('santri_id',  String(form.value.santri_id?.id))
    formData.append('status_dokumen', status_dokumen)
    formData.append('status_aktif', '1' )

    await PostPerizinanSantri(formData)
    alert('Pengajuan berhasil ditambahkan!')
    await router.push('/perizinanSantri')
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

.perizinanContainer {
  background-color: #F5F1E3;
  min-height: 200vh;
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
