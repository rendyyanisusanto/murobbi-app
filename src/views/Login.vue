<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center">
    <div class="container">
      <h2 class="text-center mb-4 text-white">Login Orang Tua</h2>
      <form @submit.prevent="handleLogin" class="p-4 rounded bg-white shadow">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Memproses...' : 'Login' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login, getSiswaById, setAuthToken } from '@/api'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const loginRes = await login(username.value, password.value)
    const loginData = loginRes.data
    const group = loginData.group
    const table = loginData.user.table
    const anggotaId = loginData.user.anggota_id
    const accessToken = loginData.token

    if (group === 'ortu' && table === 'siswa') {
      setAuthToken(accessToken)
      const siswaRes = await getSiswaById(anggotaId)

      auth.setAuth(accessToken, siswaRes.data)
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(loginData.user))
      localStorage.setItem('siswa', JSON.stringify(siswaRes.data))
      router.push('/dashboard')
    } else {
      error.value = 'Akun bukan orang tua siswa.'
    }
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Gagal login. Coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.login-wrapper {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6ec4, #48c6ef);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
