import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/n8n-proxy': {
        target: 'https://n8n.deontex.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/n8n-proxy/, ''),
      },
    },
  },
})
