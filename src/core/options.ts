import path from 'node:path';
import type { FilterPattern } from 'unplugin';

interface Options {
  absoluteRoot?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
  logLevel?: 'warning' | 'error';
}

type OptionsWithDefaults = Required<Options>;

const isValidRoot = (root: string): root is string => {
  if (path.isAbsolute(root)) {
    return true;
  }
  return false;
};

const resolveOptions = (options?: Options): OptionsWithDefaults => {
  const unValidRoot = options?.absoluteRoot ?? '';
  const absoluteRoot = isValidRoot(unValidRoot) ? unValidRoot : process.cwd();

  return {
    absoluteRoot,
    include: options?.include || [/\.([cm]?[jt]sx|vue)$/],
    exclude: options?.exclude || [/node_modules/],
    logLevel: options?.logLevel || 'warning',
  };
};

export { resolveOptions };
export type { Options, OptionsWithDefaults };

