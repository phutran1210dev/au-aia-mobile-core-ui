/**
 * A string-keyed cache that drops its least recently used entry beyond `limit`, so apps
 * that change theme values at runtime (a color picker) keep memory bounded while the
 * configs in use, such as the library defaults, keep their objects. Returns
 * `get(key, create)`.
 */
export function createCache<V>(limit = 64) {
  const entries = new Map<string, V>();
  return (key: string, create: () => V): V => {
    const cached = entries.get(key);
    if (cached !== undefined) {
      // Re-insert so the Map's insertion order tracks recent use.
      entries.delete(key);
      entries.set(key, cached);
      return cached;
    }
    const value = create();
    entries.set(key, value);
    if (entries.size > limit) {
      const oldest = entries.keys().next().value;
      if (oldest !== undefined) {
        entries.delete(oldest);
      }
    }
    return value;
  };
}
