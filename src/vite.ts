/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import UnusedComponents from 'unplugin-unused-components/vite'
 *
 * export default defineConfig({
 *   plugins: [UnusedComponents()],
 * })
 * ```
 */
const vite = Unused.vite as typeof Unused.vite;
export default vite;
