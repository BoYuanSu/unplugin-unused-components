import fs from 'node:fs';
import path from 'node:path';
import { FilterPattern } from 'unplugin';
import escapeStringRegexp from 'escape-string-regexp';

const isMatch = (fileName: string, pattern: FilterPattern): boolean => {
  if (!pattern) return true;
  if (Array.isArray(pattern)) {
    return pattern.some((p) => fileName.match(p));
  }
  if (pattern instanceof RegExp) {
    return fileName.match(pattern) !== null;
  }
  if (typeof pattern === 'string') {
    const escapedPattern = escapeStringRegexp(pattern);
    return fileName.match(new RegExp(escapedPattern)) !== null;
  }
  return false;

}

const findAllMatchedFiles = (rootDir: string, include?: FilterPattern, exclude?: FilterPattern) => {
  const files: string[] = [];
  const dirs = fs.readdirSync(rootDir, { withFileTypes: true });

  const pool = dirs.map((dir) => ({ dest: dir, parentPath: rootDir }));

  while (pool.length) {
    const current = pool.shift();
    if (!current) break;
    const { dest, parentPath } = current;

    if (exclude && isMatch(dest.name, exclude)) {
      continue; // Skip excluded files
    }

    if (dest.isFile()) {
      if (include && isMatch(dest.name, include)) {
        files.push(path.join(parentPath, dest.name));
      } else if (include === undefined) {
        files.push(path.join(parentPath, dest.name));
      }
    } else if (dest.isDirectory()) {
      const subDirs = fs.readdirSync(path.join(parentPath, dest.name), {
        withFileTypes: true,
      });
      pool.push(
        ...subDirs.map((subDir) => ({
          dest: subDir,
          parentPath: path.join(parentPath, dest.name),
        })),
      );
    }
  }

  return files;
};

export default findAllMatchedFiles;