/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Webpack plugin
 *
 * @example
 * ```ts
 * // webpack.config.js
 * module.exports = {
 *  plugins: [require('unplugin-unused-components/webpack')()],
 * }
 * ```
 */
const webpack = Unused.webpack as typeof Unused.webpack;
export default webpack;
