import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import path from 'node:path';
import rspack from '@rspack/core';
import { VueLoaderPlugin } from 'vue-loader';
import { Unused } from '../../src/index';

describe('rspack', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 監聽 console.log 以驗證 console 輸出
    consoleSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    // 還原 console.log
    consoleSpy.mockRestore();
  });

  it('should run webpack5 tests', async () => {
    const { dirname } = import.meta;

    const compiler = rspack({
      entry: path.resolve(dirname, '../fixtures/index.js'),
      output: {
        path: path.resolve(dirname, './dist'),
      },
      resolve: {
        fullySpecified: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      module: {
        rules: [
          {
            test: /\.(jsx?)$/,
            // exclude: /node_modules/,
            resolve: {
              fullySpecified: false,
            },
            use: {
              loader: 'builtin:swc-loader',
              options: {
                jsc: {
                  parser: {
                    syntax: 'ecmascript',
                    jsx: true,
                  },
                },
              },
            },
            type: 'javascript/auto',
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              // Note, for the majority of features to be available, make sure this option is `true`
              experimentalInlineMatchResource: true,
            },
          },
        ],
      },
      plugins: [
        Unused.rspack({
          absoluteRoot: path.resolve(dirname, '../fixtures'),
        }),
        new VueLoaderPlugin(),
      ],
      externals: {
        vue: 'Vue',
      },
    });

    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          console.error('RsPack compilation error:', err);
          return reject(err);
        } else if (stats?.hasErrors()) {
          console.error('RsPack compilation errors:', stats.toString());
          return reject(new Error('RsPack compilation errors'));
        } else {
          resolve(undefined);
        }
      });
    });

    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
