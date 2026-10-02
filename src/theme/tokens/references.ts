/** A table of token references: each key reads its value from a source token. Internal. */
export type ReferenceTable<K extends string, S> = {
  readonly [P in K]: (source: S) => string;
};

/** Resolves every reference in `table` against `source`. Internal. */
export function resolveReferences<K extends string, S>(
  table: ReferenceTable<K, S>,
  source: S
): Record<K, string> {
  const resolved = {} as Record<K, string>;
  for (const key of Object.keys(table) as K[]) {
    resolved[key] = table[key](source);
  }
  return resolved;
}
