import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import EnvironmentPlugin from 'vite-plugin-environment'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [react(), EnvironmentPlugin(['VITE_DIRECT_URL'])],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
