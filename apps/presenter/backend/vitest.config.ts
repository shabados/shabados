import { defineConfig } from 'vitest/config'

export default defineConfig( {
  test: {
    clearMocks: true,
    setupFiles: 'test/setup.ts',
    globalSetup: 'test/setup-global.ts',
    testTimeout: 500,
  },
} )
