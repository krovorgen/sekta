import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import EnvironmentPlugin from 'vite-plugin-environment'

dotenv.config({ path: '../../.env' })

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    SERVER_RUNNING: false,
  },
  plugins: [react(), EnvironmentPlugin(['SERVER_RUNNING'])],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
