import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: 'verbose',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', 'src/tests/**'],
    },
    alias: {
      '@core': resolve(__dirname, './src/core'),
      '@domain': resolve(__dirname, './src/domain'),
      '@config': resolve(__dirname, './src/config'),
      '@test': resolve(__dirname, './test'),
    },
  },
})
