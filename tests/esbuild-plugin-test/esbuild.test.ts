import { build } from 'esbuild';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Unused } from '../../src/index';
import path from 'node:path';
import vue from 'unplugin-vue/esbuild';

describe('esbuild', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 監聽 console.log 以驗證 console 輸出
    consoleSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    // 還原 console.log
    consoleSpy.mockRestore();
  });

  it('should run esbuild tests', async () => {
    const { dirname } = import.meta;
    await build({
      entryPoints: [path.resolve(dirname, '../fixtures/index.js')],
      plugins: [
        Unused.esbuild({
          absoluteRoot: path.resolve(dirname, '../fixtures'),
        }),
        vue(),
      ],
      bundle: true,
      define: {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
      },
      outdir: path.resolve(dirname, './dist'),
      external: ['vue'],
    });
    // 驗證 console.log 是否有被呼叫
    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
