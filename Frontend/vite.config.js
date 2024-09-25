import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://freelanze-backend.onrender.com', // Backend API URL in development
        changeOrigin: true
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
