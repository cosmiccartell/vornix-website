import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app', // Allow all ngrok domains
      '.ngrok.io'        // Allow all ngrok domains (backup)
    ]
  }
})