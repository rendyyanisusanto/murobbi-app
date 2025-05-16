import axios from 'axios'
import config from '@/config/config'

const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000
})
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const login = async (username: string, password: string) => {
  return api.post('/login', { username, password })
}
export const getSiswaById = async (id: number) => {
  return api.get(`/siswa/id/${id}`)
}

export const getPresensiRFIDIn = async (id: number) => {
  return api.get(`/presensiRFID/IN/${id}`)
}

export const getPresensiRFIDOut = async (id: number) => {
  return api.get(`/presensiRFID/OUT/${id}`)
}

export const PresenceMonthlyStudentFormated = async (id: number) => {
  return api.get(`/presensiRFID/PresenceMonthlyStudentFormated/${id}`)
}

export const PresenceMonthlyCountByStudent = async (id: number) => {
  return api.get(`/presensiRFID/PresenceMonthlyCountByStudent/${id}`)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('siswa')
}

export const getUser = (): Record<string, any> => JSON.parse(localStorage.getItem('user') || '{}')
export const getSiswa = (): Record<string, any> => JSON.parse(localStorage.getItem('siswa') || '{}')

// Contoh endpoint untuk presensi
export const fetchPresensi = (nis: string) => api.get(`/presensi/${nis}`)

export default api
