import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    clean: true,
    entry: ['./src/*.ts'],
    format: ['esm', 'cjs'],
    dts: {
      isolatedDeclarations: true,
    },
    outDir: 'dist',
    external: [
      'node:path',
      'node:fs',
    ],
  },
  {
    entry: ['./src/legacy/*.ts'],
    format: ['cjs'],
    platform: 'node',
    target: 'node10',
    outDir: 'dist/legacy',
    dts: {
      isolatedDeclarations: true,
    },
    external: [],
    alias: {
      'node:path': 'path',
      'node:fs': 'fs',
    },
    shims: true,
  },
]);
