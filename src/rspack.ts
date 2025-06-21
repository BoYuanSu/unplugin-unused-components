/**
 * This entry file is for rspack plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Rspack plugin
 *
 * @example
 * ```ts
 * // rspack.config.js
 * module.exports = {
 *  plugins: [require('unplugin-unused-components/rspack')()],
 * }
 * ```
 */
const rspack = Unused.rspack as typeof Unused.rspack;
export default rspack;
