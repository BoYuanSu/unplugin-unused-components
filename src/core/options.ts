import { FilterPattern } from "unplugin";

interface Options {
  root?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
  logLevel?: 'warning' | 'error';
}

export type { Options };