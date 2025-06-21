import { createUnplugin, UnpluginInstance } from 'unplugin';
import findAllMatchedFiles from './core/findAllMatchedFiles';
import { resolveOptions, type Options } from './core/options';
import outputUnusedFiles from './core/outputUnusedFiles';


const Unused: UnpluginInstance<Options | undefined, false> = createUnplugin((options) => {


  const { include, exclude, logLevel, absoluteRoot: rootWithCWD } = resolveOptions(options);

  let root: string = rootWithCWD;

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
      outputUnusedFiles(unusedComponents);
    },
    vite: {
      apply: 'build',
      configResolved(config: unknown) {
        if (typeof config === 'object' && config !== null && 'root' in config && typeof config.root === 'string') {
          root ||= config.root;
        }
      },
    }
  };
});

export { Unused };

export type { Options };

