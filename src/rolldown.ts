/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import UnusedComponents from 'unplugin-unused-components/rolldown'
 *
 * export default {
 *   plugins: [UnusedComponents()],
 * }
 * ```
 */
const rolldown = Unused.rolldown as typeof Unused.rolldown;
export default rolldown;
