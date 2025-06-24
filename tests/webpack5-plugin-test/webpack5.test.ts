import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { Unused } from '../../src/index';
import webpack from 'webpack';
import path from 'node:path';
import { VueLoaderPlugin } from 'vue-loader';
describe('webpack5', () => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const compiler = webpack({
      mode: 'production',
      entry: path.resolve(dirname, '../fixtures/index.js'),
      output: {
        path: path.resolve(dirname, '../fixtures/dist/webpack5'),
        filename: 'index.js',
        library: 'test',
        libraryTarget: 'commonjs',
      },
      externals: {
        vue: 'Vue',
      },
      resolve: {
        fullySpecified: false,
        extensions: ['.js', '.jsx', '.vue'],
      },
      plugins: [
        Unused.webpack({
          absoluteRoot: path.resolve(dirname, '../fixtures'),
          exclude: [/node_modules/, /dist/],

        }),
        new VueLoaderPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
              fullySpecified: false,
            },
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ],
              },
            },
          },
        ],
      },
    });
    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          console.error('Webpack compilation error:', err);
          return reject(err);
        } else if (stats?.hasErrors()) {
          console.error('Webpack compilation errors:', stats.toString());
          return reject(new Error('Webpack compilation errors'));
        } else {
          resolve(undefined);
        }
      });
    });

    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
