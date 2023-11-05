import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    // у нас oauth.yandex.ru настроен с redirect_uri=http://localhost:3000
    // для того чтоб oauth.yandex.ru работал на другом порте нужно его добавить в настройках яндекса
    // пока временно меняем порт
    __SERVER_PORT__: process.env.SERVER_PORT || 3000,
  },
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
