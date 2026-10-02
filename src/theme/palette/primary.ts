/**
 * Qi palette group "Primary" (Qi tokens – AIA, node 102-2817).
 * Internal: never exported from the package (hard rule 4).
 */
export const primary = {
  /**
   * Digital charcoal, AIA's brand charcoal. DDS labels step 600 as 100%.
   * @figma Primary/Digital charcoal/digitalcharcoal-{step}
   */
  digitalCharcoal: {
    50: '#F5F5F6',
    100: '#EBECED',
    200: '#D6D8DA',
    300: '#ADB1B5',
    400: '#858B91',
    500: '#666E75',
    600: '#333D47',
    700: '#293139',
    800: '#1F252B',
    900: '#14181C',
  },
  /**
   * Digital red, AIA's brand red. DDS labels step 500 as 100%.
   * @figma Primary/Digital red/digitalred-{step}
   */
  digitalRed: {
    50: '#FFEDF1',
    100: '#FADAE3',
    200: '#EC6B8E',
    300: '#E84671',
    400: '#E32155',
    500: '#E00842',
    600: '#B30635',
    700: '#860528',
    800: '#5A031A',
    900: '#2D020D',
  },
} as const;
