import type { GeneratedPalette } from '../algorithms/generatePalette';
import { palette } from '../palette';
import type { MapToken, SeedToken } from './types';

/**
 * antd's ten palette slots, lightest first; slot 6 is the seed color. A Figma family fills
 * them with hand-picked Qi steps; an overridden seed fills them with `generatePalette`.
 * Map tokens read slots 1-7 only, as antd's `genColorMapToken` does. Internal.
 */
export type PaletteSlots = GeneratedPalette;

type TenSteps = Readonly<
  Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>
>;
type SevenSteps = Readonly<
  Record<50 | 100 | 200 | 300 | 400 | 500 | 600, string>
>;

/** A ten-step Qi family: slot n is the nth step, 50 through 900. */
export const tenStepSlots = (f: TenSteps): PaletteSlots => [
  f[50],
  f[100],
  f[200],
  f[300],
  f[400],
  f[500],
  f[600],
  f[700],
  f[800],
  f[900],
];

/**
 * A seven-step Qi family: slots 1-7 are steps 50, 100, 100, 200, 200, 300, 400. Slots 8-10
 * (400, 500, 600) only keep the ten-slot shape `generatePalette` returns; no token reads them.
 */
export const sevenStepSlots = (f: SevenSteps): PaletteSlots => [
  f[50],
  f[100],
  f[100],
  f[200],
  f[200],
  f[300],
  f[400],
  f[400],
  f[500],
  f[600],
];

/** Color families with an antd seed. Internal. */
export type ColorFamily = 'Primary' | 'Success' | 'Warning' | 'Error' | 'Info';

type FamilySuffix =
  | ''
  | 'Bg'
  | 'BgHover'
  | 'Border'
  | 'BorderHover'
  | 'Hover'
  | 'Active'
  | 'TextHover'
  | 'Text'
  | 'TextActive';

type FamilyTokens<F extends ColorFamily> = Pick<
  MapToken,
  Extract<`color${F}${FamilySuffix}`, keyof MapToken>
>;

/** What the default algorithm needs to know about one seeded family. Internal. */
export interface ColorFamilySpec {
  /** The seed token that controls the family. */
  seed: keyof SeedToken;
  /** Slots filled with Qi steps, used while the seed keeps its default. */
  figmaSlots: PaletteSlots;
  /** antd takes `*Hover` from slot 5 for Primary and Error, and slot 4 for the others. */
  hoverSlot: 4 | 5;
}

/** Every seeded family. Internal. */
export const colorFamilies: Readonly<Record<ColorFamily, ColorFamilySpec>> = {
  Primary: {
    seed: 'colorPrimary',
    figmaSlots: tenStepSlots(palette.digitalRed),
    hoverSlot: 5,
  },
  Success: {
    seed: 'colorSuccess',
    figmaSlots: sevenStepSlots(palette.digitalGreen),
    hoverSlot: 4,
  },
  Warning: {
    seed: 'colorWarning',
    figmaSlots: sevenStepSlots(palette.digitalYellow),
    hoverSlot: 4,
  },
  Error: {
    seed: 'colorError',
    figmaSlots: sevenStepSlots(palette.digitalCerise),
    hoverSlot: 5,
  },
  Info: {
    seed: 'colorInfo',
    figmaSlots: sevenStepSlots(palette.digitalBlue),
    hoverSlot: 4,
  },
};

/**
 * The map tokens of one family from its slots, as antd's `genColorMapToken` assigns them:
 * the `Text*` tokens reuse slots 5, 6 and 7, so `color*Text` equals the seed color.
 */
export function familyTokens<F extends ColorFamily>(
  family: F,
  slots: PaletteSlots
): FamilyTokens<F> {
  const [s1, s2, s3, s4, s5, s6, s7] = slots;
  return {
    [`color${family}Bg`]: s1,
    [`color${family}BgHover`]: s2,
    [`color${family}Border`]: s3,
    [`color${family}BorderHover`]: s4,
    [`color${family}Hover`]: colorFamilies[family].hoverSlot === 4 ? s4 : s5,
    [`color${family}`]: s6,
    [`color${family}Active`]: s7,
    [`color${family}TextHover`]: s5,
    [`color${family}Text`]: s6,
    [`color${family}TextActive`]: s7,
  } as FamilyTokens<F>;
}

type TextTokens = Pick<
  MapToken,
  | 'colorText'
  | 'colorTextSecondary'
  | 'colorTextTertiary'
  | 'colorTextQuaternary'
>;
type BgTokens = Pick<
  MapToken,
  'colorBgContainer' | 'colorBgLayout' | 'colorBorder' | 'colorBorderSecondary'
>;

/** Figma text neutrals, used while `colorTextBase` keeps its default. Internal. */
export const figmaTextTokens: Readonly<TextTokens> = {
  colorText: palette.digitalCharcoal[600],
  colorTextSecondary: palette.digitalCharcoal[500],
  colorTextTertiary: palette.digitalCharcoal[400],
  colorTextQuaternary: palette.digitalCharcoal[300],
};

/** Figma background and border neutrals, used while `colorBgBase` keeps its default. Internal. */
export const figmaBgTokens: Readonly<BgTokens> = {
  colorBgContainer: palette.monotone.white,
  colorBgLayout: palette.digitalCharcoal[50],
  colorBorder: palette.digitalCharcoal[200],
  colorBorderSecondary: palette.digitalCharcoal[100],
};

/** Map tokens no seed controls. Internal. */
export const fixedMapTokens: Readonly<
  Pick<MapToken, 'colorBgMask' | 'colorWhite'>
> = {
  colorBgMask: palette.alpha.digitalCharcoal900a50,
  colorWhite: palette.monotone.white,
};
