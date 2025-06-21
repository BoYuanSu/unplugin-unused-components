# unplugin-unused-components

A Vite/Webpack/Rollup/Rolldown/RsPack plugin to detect and report unused Vue components in your project. This helps you keep your codebase clean and maintainable by identifying components that are not being used.

## Features
- Detects unused Vue/React(jsx) components in your project
- Supports Vite, Webpack, and Rollup
- Customizable scan directories and file extensions
- CLI and API usage

## Installation

```bash
npm install -D unplugin-unused-components
```

## Usage

### Vite
```js
// vite.config.js
import UnusedComponents from 'unplugin-unused-components/vite'

export default {
  plugins: [
    UnusedComponents({
      // options
    })
  ]
}
```

### Webpack
```js
// webpack.config.js
const UnusedComponents = require('unplugin-unused-components/webpack')

module.exports = {
  plugins: [
    UnusedComponents({
      // options
    })
  ]
}
```

### Rollup
```js
// rollup.config.js
import UnusedComponents from 'unplugin-unused-components/rollup'

export default {
  plugins: [
    UnusedComponents({
      // options
    })
  ]
}
```

## Options
- `dirs`: Directories to scan for components. Default: `['src/components']`
- `extensions`: File extensions to consider. Default: `['vue']`
- `exclude`: Glob patterns to exclude files or folders.


## Contributing
Pull requests and issues are welcome!

## License
MIT
