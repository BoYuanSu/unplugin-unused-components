import { createUnplugin, UnpluginInstance } from "unplugin";
import type { Options } from "./core/options";
import findAllMatchedFiles from "./core/findAllMatchedFiles";


const Unused: UnpluginInstance<Options | undefined, false> = createUnplugin((options) => {
  const { include, exclude, logLevel } = {
    include: [/\.([cm]?[jt]sx|vue)$/],
    exclude: [/node_modules/],
    logLevel: 'warning',
    ...options,
  }
  let root: string = process.cwd()

  let components: Set<string>;
  return {
    name: 'unplugin-unused-components',
    enforce: 'pre',
    transform: {
      filter: {
        id: {
          include: include || [],
          exclude: exclude || [],
        }
      },
      handler(code, id): undefined {
        if (components?.has(id)) {
          components.delete(id);
        }
      },
    },
    buildStart() {
      const files = findAllMatchedFiles(root, include, exclude);
      components = new Set<string>(files);
    },
    buildEnd() {
      if (components.size === 0) return;
      const unusedComponents = Array.from(components);
      console.log(`Found ${unusedComponents.length} unused components:`);
      unusedComponents.forEach((component) => {
        console.log(`- ${component}`);
      });
      if (logLevel === 'error') {
        throw new Error(`Found ${unusedComponents.length} unused components.`);
      }
    },
    vite: {
      apply: 'build',
      configResolved(config: any) {
        root ||= config.root;
      },
    }
  }
})

export { Unused }