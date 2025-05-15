import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    idSiswa: '',
  }),
  actions: {
    setAuth(token: string, idSiswa: string) {
      this.token = token
      this.idSiswa = idSiswa
      localStorage.setItem('token', token)
      localStorage.setItem('id_siswa', idSiswa)
    },
    logout() {
      this.token = ''
      this.idSiswa = ''
      localStorage.removeItem('token')
      localStorage.removeItem('id_siswa')
    },
  },
})
