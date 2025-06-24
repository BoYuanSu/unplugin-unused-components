import path from 'node:path';
import { rollup } from 'rollup';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Unused } from '../../src/index';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';

describe('rollup', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 監聽 console.log 以驗證 console 輸出
    consoleSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    // 還原 console.log
    consoleSpy.mockRestore();
  });

  it('should run rollup tests', async () => {
    const { dirname } = import.meta;

    const bundle = await rollup({
      input: path.resolve(dirname, '../fixtures/index.js'),
      output: {
        dir: path.resolve(dirname, './dist'),
        file: 'index.js',
        format: 'esm',
      },
      plugins: [
        nodeResolve({
          extensions: ['.js', '.jsx'],
        }),
        Unused.rollup({
          absoluteRoot: path.resolve(dirname, '../fixtures'),
          exclude: [/node_modules/, /dist/],
        }),
        babel({
          presets: ['@babel/preset-react'],
          babelHelpers: 'bundled',
        }),
        vue(),
      ],
      external: ['vue', 'react'],
    });
    bundle.write({
      dir: path.resolve(dirname, './dist'),
      format: 'esm',
    });

    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
