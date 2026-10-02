import { isPlainObject } from './deepMerge';

const functionIds = new WeakMap<Function, number>();
let nextFunctionId = 1;

function functionId(fn: Function): number {
  let id = functionIds.get(fn);
  if (id === undefined) {
    id = nextFunctionId++;
    functionIds.set(fn, id);
  }
  return id;
}

/**
 * A string that is equal for structurally equal values, so inline `theme={{...}}` objects
 * hit the same cache entry on every render. Object keys are sorted, `undefined` entries are
 * skipped, and functions (algorithms) are keyed by identity.
 */
export function stableKey(value: unknown): string {
  if (typeof value === 'function') {
    return `ƒ${functionId(value)}`;
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableKey).join(',')}]`;
  }
  if (isPlainObject(value)) {
    const entries = Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableKey(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  return value === undefined ? 'undefined' : JSON.stringify(value);
}
