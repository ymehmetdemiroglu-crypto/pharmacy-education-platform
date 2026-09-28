import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/ui/vitest.config.ts',
      'packages/widgets/vitest.config.ts',
      'packages/platform/vitest.config.ts',
    ],
  },
});
