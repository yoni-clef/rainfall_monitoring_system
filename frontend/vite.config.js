import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
