# unplugin-unused-components

A Vite/Webpack/Rollup/Rolldown/RsPack plugin to detect and report unused Vue components in your project. This helps you keep your codebase clean and maintainable by identifying components that are not being used.

## Supported Node.js Versions

- The main plugin builds (Vite, Webpack 5+, Rollup, Rolldown, RsPack, Esbuild) require **Node.js v18 or later**.
- For legacy environments (Node.js v10 or later with Webpack v4), please refer to the [Legacy Usage](#legacy-usage) section for the appropriate build and instructions.

## Features
- Detects unused Vue/React(jsx) components in your project
- Supports Vite, Webpack, Rollup, Rolldown, and RsPack
- Customizable scan directories and file extensions

## Installation

```bash
npm install -D unplugin-unused-components
```

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginUnusedComponents from 'unplugin-unused-components/vite'

export default defineConfig({
  plugins: [UnpluginUnusedComponents()],
})
```
</details>

<!-- webpack -->
<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
const UnpluginUnusedComponents = require('unplugin-unused-components/webpack')
module.exports = {
  plugins: [
    UnpluginUnusedComponents(),
  ],
}
```
</details>

<!-- rollup -->
<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginUnusedComponents from 'unplugin-unused-components/rollup'
export default {
  plugins: [
    UnpluginUnusedComponents(),
  ],
}
```
</details>  

<!-- rolldown -->

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import UnpluginUnusedComponents from 'unplugin-unused-components/rolldown'
export default {
  plugins: [
    UnpluginUnusedComponents(),
  ],
}
```
</details>

<!-- esbuild -->
<details>
<summary>Esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnpluginUnusedComponents from 'unplugin-unused-components/esbuild'

build({
  plugins: [UnpluginUnusedComponents()],
})
```
</details>
<details>
<summary>RsPack</summary><br>

```ts
// rspack.config.js
export default {
  plugins: [require('unplugin-unused-components/rspack')()],
}
```
</details>

## Legacy Usage

Support for legacy environments is provided for users who require compatibility with older versions of Webpack (v4) and Node.js (v10). Please refer to the appropriate import path and usage example based on your environment.

### Node.js v10 / Webpack v4
If your project is using Node.js v10 and Webpack v4, use the legacy build of the plugin:

```js
const UnpluginUnusedComponents = require('unplugin-unused-components/dist/legacy/webpack')
module.exports = {
  plugins: [
    UnpluginUnusedComponents(),
  ],
}
```

### Node.js v12+ / Webpack v4
For projects running Node.js v12 or later with Webpack v4, use the modern Webpack 4 build:

```js
const UnpluginUnusedComponents = require('unplugin-unused-components/webpack4')
module.exports = {
  plugins: [
    UnpluginUnusedComponents(),
  ],
}
```

> **Note:**
> - The legacy build is intended only for environments that cannot upgrade to newer Node.js or Webpack versions.
> - For all other cases, use the standard plugin entry points as shown in the main usage section above.

## Options
- `absoluteRoot`: The absolute path of your project root. Must be an absolute path. Default: `process.cwd()`
- `include`: FilterPattern for files to include in scanning. Default: `[/\.([cm]?[jt]sx|vue)$/]`
- `exclude`: FilterPattern for files or folders to exclude from scanning. Default: `[/node_modules/]`

## Contributing
Pull requests and issues are welcome!

## License
MIT
