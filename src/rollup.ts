/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import UnusedComponents from 'unplugin-unused-components/rollup'
 *
 * export default {
 *   plugins: [UnusedComponents()],
 * }
 * ```
 */
const rollup = Unused.rollup as typeof Unused.rollup;
export default rollup;
