import { alpha } from './alpha';
import { monotone } from './monotone';
import { primary } from './primary';
import { secondary } from './secondary';
import { semantic } from './semantic';
import { tertiary } from './tertiary';
import { ungrouped } from './ungrouped';

/**
 * Raw AIA colors from Qi tokens – AIA (node 102-2817), keyed `palette.<family>[<step>]`
 * with Qi's family names and step numbers. The only place in `src/` that holds hex values.
 *
 * INTERNAL: never export this from `src/index.tsx` (hard rule 4). Components and apps read
 * seed, map or semantic tokens instead.
 */
export const palette = {
  ...monotone,
  ...primary,
  ...secondary,
  ...tertiary,
  ...semantic,
  ...ungrouped,
  ...alpha,
} as const;
