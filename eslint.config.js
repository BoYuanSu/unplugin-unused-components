import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';


export default defineConfig([
  { ignores: ['node_modules/**', 'dist/**'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    rules: {
      'semi': ['warn', 'always'],
      'space-infix-ops': 'warn',
      'indent': ['warn', 2],
      'no-trailing-spaces': 'warn',
      // "singleQuote": "warn",
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
      '@typescript-eslint/no-unused-vars': 'warn',
    }
  }
]);
