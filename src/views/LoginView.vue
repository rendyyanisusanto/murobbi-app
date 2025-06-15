<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo -->
      <img src="/icon.png" alt="Logo" class="logo" />

      <!-- Title -->
      <h2 class="app-title">Santri Pasir – APP</h2>
      <p class="subtitle">Pengurus</p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input
            v-model="username"
            type="text"
            class="input"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="input"
            required
          />
        </div>
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Memproses...' : 'Login' }}
        </button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login, getSantriById, setAuthToken } from '@/api'

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
    const anggotaId = loginData.user.anggota_id
    const accessToken = loginData.token


      setAuthToken(accessToken)
      const santriRes = await getSantriById(anggotaId)

      auth.setAuth(accessToken, santriRes.data)
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(loginData.user))
      localStorage.setItem('santri', JSON.stringify(santriRes.data))

      router.push('/dashboard')

  } catch (err: unknown) {
    interface AxiosError {
      response?: {
        data?: {
          message?: string
        }
      }
    }
    const axiosErr = err as AxiosError
    if (axiosErr && axiosErr.response && axiosErr.response.data) {
      error.value = axiosErr.response.data.message || 'Gagal login. Coba lagi.'
    } else {
      error.value = 'Gagal login. Coba lagi.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a4d2e 10%, rgba(0, 0, 0, 0.8));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}


.login-card {
  text-align: center;
  width: 100%;
  max-width: 350px;
}

.logo {
  width: 200px;
  margin-bottom: 1rem;
}

.app-title {
  color: white;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  color: #e2e8f0;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  text-align: left;
}

.form-label {
  color: white;
  margin-bottom: 0.3rem;
  display: block;
  font-size: 0.9rem;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}

.login-button {
  background-color: #facc15; /* kuning */
  color: #1f2937;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 2rem;
}

.login-button:hover {
  background-color: #fbbf24;
}

.error {
  color: #f87171;
  margin-top: 1rem;
}
</style>
