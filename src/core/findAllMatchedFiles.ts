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

    const fullPath = path.join(parentPath, dest.name);
    if (exclude && isMatched(fullPath, exclude)) {
      continue; // Skip excluded files
    }

    if (dest.isFile()) {
      if (include && isMatched(fullPath, include)) {
        files.push(fullPath);
      } else if (include === undefined) {
        files.push(fullPath);
      }
    } else if (dest.isDirectory()) {
      const subDirs = fs.readdirSync(fullPath, {
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
