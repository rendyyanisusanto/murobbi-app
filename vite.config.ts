// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {

    host: '0.0.0.0',
    port: 10007, // atau port lain
    allowedHosts: [
      'murobbi-app.simsmk.sch.id'
    ]
  },
})
