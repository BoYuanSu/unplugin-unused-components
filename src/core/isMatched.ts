import escapeStringRegexp from 'escape-string-regexp';
import { type FilterPattern } from 'unplugin';

const isMatched = (fileName: string, pattern: FilterPattern): boolean => {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => {
      const reg = p instanceof RegExp ? p : new RegExp(escapeStringRegexp(p));
      return fileName.match(reg) !== null;
    });
  }
  const reg = pattern instanceof RegExp ? pattern : new RegExp(escapeStringRegexp(pattern));

  return fileName.match(reg) !== null;
};

export default isMatched;
