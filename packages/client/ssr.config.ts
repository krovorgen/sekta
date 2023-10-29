import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: true,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    cssCodeSplit: false,
    minify: 'esbuild',
    outDir: 'ssr-dist',
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
})
