/**
 * Qi palette group "Semantic" (Qi tokens – AIA, node 102-2817): raw colors that carry
 * meaning, such as green and cerise. Not to be confused with semantic tokens
 * (`tokens/semantic.ts`), which reference these colors through map tokens.
 * Internal: never exported from the package (hard rule 4).
 */
export const semantic = {
  /**
   * Digital navy blue. Qi only: DDS has no navy blue swatches.
   * @figma Semantic/Digital navy blue/digitalnavyblue-{step}
   */
  digitalNavyBlue: {
    50: '#EBEDF3',
    100: '#DADEE8',
    200: '#C1C7D9',
    300: '#5E6E9B',
    400: '#1B3171',
    500: '#082065',
    600: '#061A51',
  },
  /**
   * Digital green.
   * @figma Semantic/Digital green/digitalgreen-{step}
   */
  digitalGreen: {
    50: '#E9F5F0',
    100: '#A7D9C1',
    200: '#64BC93',
    300: '#229F64',
    400: '#1B7F50',
    500: '#115032',
    600: '#0A301E',
  },
  /**
   * Digital yellow.
   * @figma Semantic/Digital yellow/digitalyellow-{step}
   */
  digitalYellow: {
    50: '#FEF7DF',
    100: '#FCE8A1',
    200: '#F9D864',
    300: '#F7C926',
    400: '#BF9B1D',
    500: '#866D15',
    600: '#4E400C',
  },
  /**
   * Digital blue.
   * @figma Semantic/Digital blue/digitalblue-{step}
   */
  digitalBlue: {
    50: '#E7F0FB',
    100: '#9EC5ED',
    200: '#3D8ADB',
    300: '#0C6DD2',
    400: '#0A57A8',
    500: '#063769',
    600: '#04213F',
  },
  /**
   * Digital cerise.
   * @figma Semantic/Digital cerise/digitalcerise-{step}
   */
  digitalCerise: {
    50: '#FBE7F1',
    100: '#EC96C3',
    200: '#E0519B',
    300: '#D40C74',
    400: '#A4095A',
    500: '#73073F',
    600: '#430425',
  },
} as const;
