import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Your backend server
        changeOrigin: true,
        secure: false,  // If your backend server uses HTTP and not HTTPS
        // rewrite: (path) => path.replace(/^\/api/, '')  // Optional: remove `/api` prefix
      }
    }
  }
})
