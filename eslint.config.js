import tsPlugin from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/test-results/**',
      '**/playwright-report/**',
      '**/docs/screenshots/**',
      '**/*.log',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '**/vitest.rules.config.ts',
      '**/tailwind.config.js',
      '**/postcss.config.js',
    ],
  },
  ...tsPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
