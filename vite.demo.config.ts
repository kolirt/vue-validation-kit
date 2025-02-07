import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vue-validation-kit/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      lib: fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  build: {
    outDir: resolve(__dirname, './demo'),
    emptyOutDir: true
  }
})
