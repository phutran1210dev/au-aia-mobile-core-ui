/**
 * Qi variables that have no swatch on the Qi primitives page, so their palette group is
 * unknown (Qi tokens – AIA, node 102-2817). Listed under "Open questions for design".
 * Internal: never exported from the package (hard rule 4).
 */
export const ungrouped = {
  /**
   * Digital light green. Qi variables only: no Qi swatch and no DDS swatch.
   * @figma $digitallightgreen-{step} (code syntax; group unknown)
   */
  digitalLightGreen: {
    50: '#F1F6E8',
    100: '#D4E3BB',
    200: '#A9C877',
    300: '#8DB549',
    400: '#70A31C',
    500: '#5A8216',
    600: '#436211',
  },
} as const;
