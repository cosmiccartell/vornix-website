import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    // --- THIS IS THE NEW "GUEST LIST" ---
    // We are telling the security guard to allow all visitors from Ngrok.
    allowedHosts: [
      'localhost',
      '.ngrok-free.app' // This allows ANY ngrok free domain to connect
    ],
  },
})