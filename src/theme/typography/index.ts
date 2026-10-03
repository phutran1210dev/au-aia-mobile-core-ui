/**
 * Raw AIA typography from Qi tokens – AIA, collection `AIA Typography`, mode `EN` (the
 * default), read on 2026-10-03. Mobile and body variables only: Desktop sizes stay out
 * (docs/specs/theme-parity.md, D6). Sizes and line heights are dp; weights are the numeric
 * value of Qi's weight name.
 *
 * INTERNAL, like the palette: components and apps read seed, map or semantic tokens.
 */
export const typography = {
  family: {
    /** Qi `Family/headline`. */
    headline: 'AIA Everest',
    /** Qi `Family/body`. */
    body: 'OpenSans',
  },
  size: {
    /** Qi `Size/body1`. */
    body1: 16,
    /** Qi `Size/body2`. */
    body2: 14,
    /** Qi `Size/body3`. */
    body3: 12,
    /** Qi `Size/body4`. */
    body4: 10,
    /** Qi `Size/Mobile/headline1`. */
    headline1: 32,
    /** Qi `Size/Mobile/headline2`. */
    headline2: 28,
    /** Qi `Size/Mobile/headline3`. */
    headline3: 24,
    /** Qi `Size/Mobile/headline4`. */
    headline4: 22,
    /** Qi `Size/Mobile/headline5`. */
    headline5: 20,
    /** Qi `Size/Mobile/headline6`. */
    headline6: 18,
  },
  lineHeight: {
    /** Qi `Line height/body1`. */
    body1: 24,
    /** Qi `Line height/body2`. */
    body2: 20,
    /** Qi `Line height/body3`. */
    body3: 18,
    /** Qi `Line height/body4`. */
    body4: 14,
    /** Qi `Line height/Mobile/headline1`. */
    headline1: 40,
    /** Qi `Line height/Mobile/headline2`. */
    headline2: 36,
    /** Qi `Line height/Mobile/headline3`. */
    headline3: 32,
    /** Qi `Line height/Mobile/headline4`. */
    headline4: 30,
    /** Qi `Line height/Mobile/headline5`. */
    headline5: 26,
    /** Qi `Line height/Mobile/headline6`. */
    headline6: 24,
  },
  letterSpacing: {
    /** Qi `Letter spacing/body`. */
    body: 0,
    /** Qi `Letter spacing/Mobile/headline1`. */
    headline1: -0.5,
    /** Qi `Letter spacing/Mobile/headline2`. */
    headline2: 0,
    /** Qi `Letter spacing/Mobile/headline3`. */
    headline3: 0,
    /** Qi `Letter spacing/Mobile/headline4`. */
    headline4: 0,
    /** Qi `Letter spacing/Mobile/headline5`. */
    headline5: 0,
    /** Qi `Letter spacing/Mobile/headline6`. */
    headline6: 0,
  },
  weight: {
    /** Qi `Weight/headline/default`: medium. */
    headline: 500,
    /** Qi `Weight/headline/thin`: regular. */
    headlineThin: 400,
    /** Qi `Weight/body/default`: regular. */
    body: 400,
    /** Qi `Weight/body/strong1`: semibold. */
    bodyStrong1: 600,
    /** Qi `Weight/body/strong2`: bold. */
    bodyStrong2: 700,
  },
} as const;
