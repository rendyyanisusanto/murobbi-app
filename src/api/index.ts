import axios from 'axios'
import config from '@/config/config'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
  timeout: 10000
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    console.log('Interceptor error response:', error.response)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        console.log('Trigger refresh token flow')
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await api.post('/refresh')
        const newAccessToken = response.data.access_token

        const auth = useAuthStore()
        auth.setAuth(newAccessToken, auth.idSantri) // fix: gunakan yang tersedia
        setAuthToken(newAccessToken)

        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        const auth = useAuthStore()
        auth.logout()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const login = async (username: string, password: string) => {
  return api.post('/login', { username, password })
}
export const getAllSantri = async () => {
  return api.get(`/santri/`)
}
export const PostPengajuanPelanggaran = async (data: any) => {
  return api.post('/Pengajuanpelanggaran/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const PostPerizinanSantri = async (data: any) => {
  return api.post('/PerizinanSantri/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const getSantriById = async (id: number) => {
  return api.get(`/santri/detail/${id}`)
}
export const getPengasuhById = async (id: number) => {
  return api.get(`/pengasuh/id/${id}`)
}
export const GetPelanggaranByID = async (id: string) => {
  return api.get(`pelanggaran/santri_id/${id}`)
}
export const getDetailPelanggaran = async (id: string) => {
  return api.get(`pelanggaran/detail/${id}`)
}
export const GetRekamMedisBySantriID = async (id: string) => {
  return api.get(`rekam_medis/santri_id/${id}`)
}
export const getDetailRekamMedis = async (id: string) => {
  return api.get(`rekam_medis/id/${id}`)
}
export const GetPengajuanPelanggaran = async (id: string) => {
  return api.get(`/Pengajuanpelanggaran/`)
}

export const GetPerizinanSantri = async () => {
  return api.get(`/PerizinanSantri/`)
}
export const getAllTatib = async () => {
  return api.get(`/tatib/`)
}

export const getIjinPengurus = async () => {
  return api.get(`/ijin_pengurus/`)
}
export const getIjinPengurusKeluar = async () => {
  return api.get(`/ijin_pengurus/keluar`)
}


export const getPresensiRFIDIn = async (id: number) => {
  return api.get(`/presensiRFID/IN/${id}`)
}

export const getPresensiRFIDOut = async (id: number) => {
  return api.get(`/presensiRFID/OUT/${id}`)
}

export const PresenceMonthlyStudentFormated = async (id: number) => {
  return api.get(`presensi_santri/santri_id/${id}`)
}

export const PresenceMonthlyCountByStudent = async (id: number) => {
  return api.get(`/presensiRFID/PresenceMonthlyCountByStudent/${id}`)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('pengasuh')
}

export const getUser = (): Record<string, any> => JSON.parse(localStorage.getItem('user') || '{}')
export const getSantri = (): Record<string, any> => JSON.parse(localStorage.getItem('santri') || '{}')
export const getPengasuh = (): Record<string, any> => JSON.parse(localStorage.getItem('pengasuh') || '{}')

// Contoh endpoint untuk presensi
export const fetchPresensi = (nis: string) => api.get(`/presensi/${nis}`)

export default api
