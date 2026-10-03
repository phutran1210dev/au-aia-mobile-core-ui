/**
 * A table of token references: each key of `T` reads its value from a source token `S`.
 * Internal.
 */
export type ReferenceTable<T, S> = {
  readonly [P in keyof T]-?: (source: S) => T[P];
};

/** Resolves every reference in `table` against `source`. Internal. */
export function resolveReferences<T, S>(
  table: ReferenceTable<T, S>,
  source: S
): T {
  const resolved = {} as T;
  for (const key of Object.keys(table) as (keyof T)[]) {
    resolved[key] = table[key](source);
  }
  return resolved;
}
