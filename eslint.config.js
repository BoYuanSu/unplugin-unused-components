import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  { ignores: ['node_modules/**', 'dist/**'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  stylistic.configs.customize({
    arrowParens: 'always',
    indent: 2,
    quotes: 'single',
    semi: true,
    commaDangle: 'always-multiline',
  }),
  {
    rules: {
      '@stylistic/brace-style': ['warn', '1tbs'],
      'space-infix-ops': 'warn',
      'no-trailing-spaces': 'warn',
      '@stylistic/object-curly-newline': ['warn', {
        consistent: true,
      }],
      'comma-dangle': ['warn', 'always-multiline'],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);
