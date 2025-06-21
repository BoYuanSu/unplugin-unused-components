import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['./src/*.ts'],
    platform: 'neutral',
    dts: {
      isolatedDeclarations: true,
    },
    outDir: 'dist/esm',
    external: [
      'node:path',
      'node:fs',
    ]
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
    shims: true
  }
]);
