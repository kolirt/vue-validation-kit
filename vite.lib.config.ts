import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: './tsconfig.lib.json',
      include: ['lib/index.ts', 'lib/localization/index.ts', 'lib/rules/index.ts']
    }),
    eslint()
  ],
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        index: resolve(__dirname, 'lib/index.ts'),
        'localization/index': resolve(__dirname, 'lib/localization/index.ts'),
        'rules/index': resolve(__dirname, 'lib/rules/index.ts')
      }
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
      output: {
        globals: {
          ...(() => {
            const obj: Record<string, string> = {}
            Object.keys(pkg.dependencies).forEach((key) => {
              obj[key] = key
            })
            return obj
          })()
        }
      }
    }
  }
})
