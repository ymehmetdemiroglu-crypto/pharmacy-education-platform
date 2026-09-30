import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@pharmacy/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@pharmacy/widgets': path.resolve(__dirname, '../../packages/widgets/src'),
      '@pharmacy/platform': path.resolve(__dirname, '../../packages/platform/src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, '../../packages/ui/src/test/setup.ts')],
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
