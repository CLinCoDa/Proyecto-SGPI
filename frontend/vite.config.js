import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Cambia al puerto que prefieras
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Tu backend Django
        changeOrigin: true,
      },
    },
  },
})
