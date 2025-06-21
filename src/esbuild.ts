/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { Unused } from './index';

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import UnusedComponents from 'unplugin-unused-components/esbuild'

 *
 * build({
 *   plugins: [UnusedComponents()],
 * })
 * ```
 */
const esbuild = Unused.esbuild as typeof Unused.esbuild;
export default esbuild;
