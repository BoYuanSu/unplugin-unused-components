import path from 'node:path';
import { rolldown } from 'rolldown';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Unused } from '../../src/index';
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

    const bundle = await rolldown({
      input: path.resolve(dirname, '../fixtures/index.js'),
      plugins: [
        Unused.rolldown({
          absoluteRoot: path.resolve(dirname, '../fixtures'),
          exclude: [/node_modules/, /dist/],
        }),
        vue(),
      ],
      external: ['vue', 'react/jsx-runtime'],
    });
    await bundle.write({
      dir: path.resolve(dirname, './dist'),
      format: 'esm',
    });

    await bundle.close();

    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
