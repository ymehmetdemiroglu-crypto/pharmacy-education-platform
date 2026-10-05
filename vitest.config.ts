import { defineConfig } from 'vitest/config';

// Root-level tests: Supabase Edge Function logic (pure modules) and repo scripts.
// Package-level tests run through `pnpm -r test`.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['supabase/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
