import type { GeneratedPalette } from '../algorithms/generatePalette';
import { palette } from '../palette';
import type { MapToken, SeedToken } from './types';

/** A palette slot that map tokens read: 1 to 7 of ten; slot 6 holds the seed color. Internal. */
export type MapSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** The colors of one family by palette slot, lightest first. Internal. */
export type PaletteSlots = Readonly<Record<MapSlot, string>>;

/** Qi steps that fill slots 1 to 7, by family size. Internal. */
const slotSteps = {
  /** Ten-step family (Digital red): slot n is step n. */
  tenStep: [50, 100, 200, 300, 400, 500, 600],
  /** Seven-step families: two steps fill two slots each. */
  sevenStep: [50, 100, 100, 200, 200, 300, 400],
} as const;

type SevenSlotSteps<S> = readonly [S, S, S, S, S, S, S];

/** A Figma family's palette slots, from the Qi steps that fill them. Internal. */
function slotsFromSteps<S extends number>(
  family: Readonly<Record<S, string>>,
  steps: SevenSlotSteps<S>
): PaletteSlots {
  const [s1, s2, s3, s4, s5, s6, s7] = steps;
  return {
    1: family[s1],
    2: family[s2],
    3: family[s3],
    4: family[s4],
    5: family[s5],
    6: family[s6],
    7: family[s7],
  };
}

/** A generated ten-color palette's palette slots; its last three colors are unused. Internal. */
export function slotsFromPalette(colors: GeneratedPalette): PaletteSlots {
  return slotsFromSteps(colors, [0, 1, 2, 3, 4, 5, 6]);
}

/**
 * The slot table: which palette slot each map token of a family reads. `Text*` reuses
 * slots 5 to 7, so `color*Text` equals the seed color; `Hover` reads the family's
 * `hoverSlot`. Internal.
 */
const mapTokenSlots = {
  'Bg': 1,
  'BgHover': 2,
  'Border': 3,
  'BorderHover': 4,
  'Hover': 'hoverSlot', // 4 or 5, per family (`ColorFamilySpec.hoverSlot`)
  '': 6, // the seed token itself, such as `colorPrimary`
  'Active': 7,
  'TextHover': 5,
  'Text': 6,
  'TextActive': 7,
} as const satisfies Record<string, MapSlot | 'hoverSlot'>;

/** Color families controlled by a seed token. Internal. */
export type ColorFamily = 'Primary' | 'Success' | 'Warning' | 'Error' | 'Info';

type FamilyTokens<F extends ColorFamily> = Pick<
  MapToken,
  Extract<`color${F}${keyof typeof mapTokenSlots}`, keyof MapToken>
>;

/** What the derivation algorithm needs to know about one seeded family. Internal. */
export interface ColorFamilySpec {
  /** The seed token that controls the family. */
  seed: keyof SeedToken;
  /** Slots filled with Qi steps, used while the seed keeps its default. */
  figmaSlots: PaletteSlots;
  /** The slot `*Hover` reads: 5 for Primary and Error, 4 for the others. */
  hoverSlot: MapSlot;
}

/** Every seeded family. Internal. */
export const colorFamilies: Readonly<Record<ColorFamily, ColorFamilySpec>> = {
  Primary: {
    seed: 'colorPrimary',
    figmaSlots: slotsFromSteps(palette.digitalRed, slotSteps.tenStep),
    hoverSlot: 5,
  },
  Success: {
    seed: 'colorSuccess',
    figmaSlots: slotsFromSteps(palette.digitalGreen, slotSteps.sevenStep),
    hoverSlot: 4,
  },
  Warning: {
    seed: 'colorWarning',
    figmaSlots: slotsFromSteps(palette.digitalYellow, slotSteps.sevenStep),
    hoverSlot: 4,
  },
  Error: {
    seed: 'colorError',
    figmaSlots: slotsFromSteps(palette.digitalCerise, slotSteps.sevenStep),
    hoverSlot: 5,
  },
  Info: {
    seed: 'colorInfo',
    figmaSlots: slotsFromSteps(palette.digitalBlue, slotSteps.sevenStep),
    hoverSlot: 4,
  },
};

/** The map tokens of one family, read from its palette slots through the slot table. Internal. */
export function familyTokens<F extends ColorFamily>(
  family: F,
  slots: PaletteSlots
): FamilyTokens<F> {
  const { hoverSlot } = colorFamilies[family];
  const tokens: Record<string, string> = {};
  for (const [suffix, slot] of Object.entries(mapTokenSlots)) {
    tokens[`color${family}${suffix}`] =
      slots[slot === 'hoverSlot' ? hoverSlot : slot];
  }
  return tokens as FamilyTokens<F>;
}

/** The text neutrals. Internal. */
export type TextTokens = Pick<
  MapToken,
  | 'colorText'
  | 'colorTextSecondary'
  | 'colorTextTertiary'
  | 'colorTextQuaternary'
>;
/** The background and border neutrals. Internal. */
export type BgTokens = Pick<
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
