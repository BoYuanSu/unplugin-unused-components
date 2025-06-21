import { defineConfig } from 'tsup';

export default defineConfig([
  {
    clean: true,
    entry: ['./src/*.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    external: [
      'node:path',
      'node:fs',
    ],
    dts: true
  },
  {
    entry: ['./src/legacy/*.ts'],
    format: ['cjs'],
    platform: 'node',
    target: 'node10',
    outDir: 'dist/legacy',
    external: [],
    shims: true,
    dts: true
  }
]);
