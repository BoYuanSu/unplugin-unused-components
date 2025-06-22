import fs from 'node:fs';
import path from 'node:path';
import { FilterPattern } from 'unplugin';
import isMatched from './isMatched';

const findAllMatchedFiles = (rootDir: string, include?: FilterPattern, exclude?: FilterPattern) => {
  const files: string[] = [];
  if (!fs.existsSync(rootDir) || fs.statSync(rootDir).isFile()) {
    console.warn(`Root directory "${rootDir}" does not exist or is a file.`);
    return files;
  } // Return empty if rootDir does not exist
  const dirs = fs.readdirSync(rootDir, { withFileTypes: true });

  const pool = dirs.map((dir) => ({ dest: dir, parentPath: rootDir }));

  while (pool.length) {
    const current = pool.shift();
    if (!current) break;
    const { dest, parentPath } = current;

    if (exclude && isMatched(dest.name, exclude)) {
      continue; // Skip excluded files
    }

    if (dest.isFile()) {
      if (include && isMatched(dest.name, include)) {
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
