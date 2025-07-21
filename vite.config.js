import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
      server: {
      host: true,   // listen on 0.0.0.0 → accessible via localhost, 127.0.0.1, LAN IPs
      port: 5173,   // your dev port
      allowedHosts: ['canva-redirect.onrender.com'],
    },
  plugins: [react()],
})
