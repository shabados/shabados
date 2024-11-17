import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
import { defineConfig } from 'vite'

const isTest = process.env.NODE_ENV === 'test'

export default defineConfig( {
  plugins: [
    !isTest && TanStackRouterVite(),
    react({
      babel: {
        presets: ['jotai/babel/preset']
      }
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:42425',
        ws: true,
      },
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: [ 'tests/setupTests.ts' ],
    restoreMocks: true,
  },
} )
