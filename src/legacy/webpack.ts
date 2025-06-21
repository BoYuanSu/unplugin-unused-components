import fs from 'node:fs';
import path from 'node:path';
import { type Options, type OptionsWithDefaults, resolveOptions } from '../core/options';

import { type Compiler } from 'webpack';
import findAllMatchedFiles from '../core/findAllMatchedFiles';
import outputUnusedFiles from '../core/outputUnusedFiles';

const PLUGIN_NAME = 'UnusedComponentsPlugin';


const resolveAlias = (request: string, alias: Record<string, string>): string => {
  if (!alias || typeof alias !== 'object') return request;
  const keys = Object.keys(alias);

  let tempPath = null;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (request === key || request.startsWith(key + '/')) {
      tempPath = request.replace(key, alias[key]);
      break;
    }
  }

  if (tempPath) return tempPath;
  return request;
};

const resolveAbsolutePath = (request: string, context: string): string => {
  if (path.isAbsolute(request)) return request;

  if (context) {
    return path.resolve(context, request);
  }
  return path.resolve(process.cwd(), request);
};

const resolveIndexFile = (filePath: string, extensions: string[]): string | null => {
  for (let i = 0; i < extensions.length; i += 1) {
    const ext = extensions[i];
    const filePathWithExt = filePath + ext;
    if (fs.existsSync(filePathWithExt)) return filePathWithExt;

    const filePathWithIndex = path.join(filePath, 'index' + ext);
    if (fs.existsSync(filePathWithIndex)) return filePathWithIndex;

    const filePathWithIndex2 = path.join(filePath, 'Index' + ext);
    if (fs.existsSync(filePathWithIndex2)) return filePathWithIndex2;
  }
  return null;
};

const resolveExistFilePath = (filePath: string, extensions: string[]): string | null => {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;

  return resolveIndexFile(filePath, extensions);
};


class UnusedComponentsPlugin {
  options: OptionsWithDefaults;
  store: Set<string> | null;
  constructor(options: Options) {
    this.options = resolveOptions(options);
    this.store = null;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.beforeRun.tap(PLUGIN_NAME, () => {
      const allFiles = findAllMatchedFiles(
        this.options.absoluteRoot,
        this.options.include,
        this.options.exclude);
      this.store = new Set(allFiles);
    });


    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (factory) => {
      factory.hooks.beforeResolve.tap(PLUGIN_NAME, (data) => {
        if (!data) return; 
        if (data.context.includes('node_modules') || data.request.includes('node_modules')) return;

        const alias = compiler.options.resolve?.alias ?? {};
        const extensions = compiler.options.resolve?.extensions ?? [];
        const request = data.request;
        const context = data.context;
        const resolvedAlias = resolveAlias(request, alias);
        const absolutePath = resolveAbsolutePath(resolvedAlias, context);

        const existFilePath = resolveExistFilePath(absolutePath, extensions);
        if (existFilePath) {
          this.store?.delete(existFilePath);
        }
      });
    });
    // Hook into the 'done' phase
    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      const unusedFiles = Array.from(this.store ?? []);
      outputUnusedFiles(unusedFiles);
    });
  }
}

export default UnusedComponentsPlugin;
