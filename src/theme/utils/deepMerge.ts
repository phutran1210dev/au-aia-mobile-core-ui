type PlainObject = Record<string, unknown>;

/** Whether `value` is a plain object literal (not an array, function or class instance). */
export function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Merges `source` into `target` and returns a new object; neither input is mutated.
 * Plain objects merge key by key, arrays and every other value replace, and `undefined`
 * in `source` counts as "not set", so it never erases a value from `target`.
 */
export function deepMerge<T extends object>(target: T, source: object): T {
  const result: PlainObject = { ...(target as PlainObject) };
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) {
      continue;
    }
    const current = result[key];
    result[key] =
      isPlainObject(current) && isPlainObject(value)
        ? deepMerge(current, value)
        : value;
  }
  return result as T;
}
