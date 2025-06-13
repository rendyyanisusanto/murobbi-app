import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    idSantri: '',
  }),
  actions: {
    setAuth(token: string, idSantri: string) {
      this.token = token
      this.idSantri = idSantri
      localStorage.setItem('token', token)
      localStorage.setItem('id_siswa', idSantri)
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = ''
      this.idSantri = ''
      localStorage.removeItem('token')
      localStorage.removeItem('id_siswa')
    },
    loadFromStorage() {
      this.token = localStorage.getItem('token') || ''
      this.idSantri = localStorage.getItem('id_siswa') || ''
    }
  },
})
