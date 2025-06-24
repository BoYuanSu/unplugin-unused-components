import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Unused } from '../../src/index';
import { build } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';

describe('vite', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 監聽 console.log 以驗證 console 輸出
    consoleSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    // 還原 console.log
    consoleSpy.mockRestore();
  });

  it('should run vite tests', async () => {
    const { dirname } = import.meta;
    await build({
      build: {
        lib: {
          entry: path.resolve(dirname, '../fixtures/index.js'),
          name: 'test',
        },
        rollupOptions: {
          output: {
            dir: path.resolve(dirname, './dist'),
          },
          external: ['vue'],
        },
      },
      plugins: [Unused.vite({
        absoluteRoot: path.resolve(dirname, '../fixtures'),
      }), vue()],
    });
    // 驗證 console.log 是否有被呼叫
    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
