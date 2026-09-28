import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pharmacy/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@pharmacy/widgets': path.resolve(__dirname, '../../packages/widgets/src'),
      '@pharmacy/platform': path.resolve(__dirname, '../../packages/platform/src'),
    },
  },
  server: {
    port: 3000,
  },
});
