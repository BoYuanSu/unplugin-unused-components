import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import LegacyPlugin from '../../src/legacy/webpack.ts';
import webpack from 'webpack';
import path from 'node:path';
import { VueLoaderPlugin } from 'vue-loader';

describe('webpack4', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 監聽 console.log 以驗證 console 輸出
    consoleSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    // 還原 console.log
    consoleSpy.mockRestore();
  });

  it('should run webpack4 tests', async () => {
    const { dirname } = import.meta;
    const compiler = webpack({
      entry: path.resolve(dirname, '../fixtures/index.js'),
      output: {
        path: path.resolve(dirname, './dist'),
        filename: 'index.js',
        library: 'test',
        libraryTarget: 'commonjs',
      },
      externals: {
        vue: 'Vue',
      },
      resolve: {
        extensions: ['.js', '.vue', '.jsx'],
      },
      plugins: [
        new LegacyPlugin({
          absoluteRoot: path.resolve(dirname, '../fixtures'),

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
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
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
        } else if (stats.hasErrors()) {
          console.error('Webpack compilation errors:', stats.toString('errors-only'));
          return reject(new Error('Webpack compilation errors'));
        } else {
          resolve(stats);
        }
      });
    });

    expect(consoleSpy).toBeCalledWith('Found 2 unused components:');
  });
});
