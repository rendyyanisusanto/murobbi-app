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
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    const tokenRes = await axios.post('https://apiedulite.simsmk.sch.id/token', {
      username: 'rendy',
      password: 'Tahutelor123',
    })
    const token = tokenRes.data.token

    const loginRes = await axios.post(
      'https://apiedulite.simsmk.sch.id/login',
      {
        username: username.value,
        password: password.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const idSiswa = loginRes.data.id_siswa
    auth.setAuth(token, idSiswa)
    router.push('/dashboard')
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
