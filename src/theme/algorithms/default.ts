import {
  colorFamilies,
  familyTokens,
  figmaBgTokens,
  figmaFontTokens,
  figmaTextTokens,
  fixedMapTokens,
  motionTokens,
  slotsFromPalette,
  type BgTokens,
  type ColorFamily,
  type PaletteSlots,
  type TextTokens,
} from '../tokens/map';
import { defaultSeed, type ColorSeed } from '../tokens/seed';
import type { MapToken, SeedToken } from '../tokens/types';
import type { MappingAlgorithm } from '../types';
import { darken, isSameColor, setAlpha } from '../utils/color';
import { generateFontTokens } from './generateFontTokens';
import { generatePalette } from './generatePalette';

/** Alpha of an overridden `colorTextBase` for each text neutral. */
const textBaseAlpha: Readonly<Record<keyof TextTokens, number>> = {
  colorText: 0.88,
  colorTextSecondary: 0.65,
  colorTextTertiary: 0.45,
  colorTextQuaternary: 0.25,
};

/** HSL lightness, in points, taken off an overridden `colorBgBase` for each neutral. */
const bgBaseDarken: Readonly<Record<keyof BgTokens, number>> = {
  colorBgContainer: 0,
  colorBgLayout: 4,
  colorBorder: 15,
  colorBorderSecondary: 6,
};

/** Seeds whose default keeps Figma-tuned map tokens. */
type FigmaTunedSeed = ColorSeed | 'fontSize';

/** Whether `seed[key]` equals its default. Colors compare by value, not format or case. */
function keepsDefault(seed: SeedToken, key: FigmaTunedSeed): boolean {
  return key === 'fontSize'
    ? seed.fontSize === defaultSeed.fontSize
    : isSameColor(seed[key], defaultSeed[key]);
}

/**
 * The Figma value while `seed[key]` equals its default; otherwise the value derived from
 * the overridden seed.
 */
function figmaUnlessOverridden<K extends FigmaTunedSeed, T>(
  seed: SeedToken,
  key: K,
  figma: T,
  derive: (value: SeedToken[K]) => T
): T {
  return keepsDefault(seed, key) ? figma : derive(seed[key]);
}

function mapValues<K extends string>(
  table: Readonly<Record<K, number>>,
  toColor: (value: number) => string
): Record<K, string> {
  const result = {} as Record<K, string>;
  for (const key of Object.keys(table) as K[]) {
    result[key] = toColor(table[key]);
  }
  return result;
}

function slotsFor(family: ColorFamily, seed: SeedToken): PaletteSlots {
  const { seed: key, figmaSlots } = colorFamilies[family];
  return figmaUnlessOverridden(seed, key, figmaSlots, (color) =>
    slotsFromPalette(generatePalette(color))
  );
}

/**
 * The default (light) derivation algorithm. A seed equal to its default keeps the
 * Figma-tuned map tokens, so the default theme outputs exactly the Figma values. An
 * overridden seed regenerates its family: seeded colors through `generatePalette`, text
 * neutrals as alphas of `colorTextBase`, background neutrals by darkening `colorBgBase`,
 * and font sizes and line heights through `generateFontTokens`. Motion durations and
 * `lineWidthBold` always follow their seeds, because Figma defines none.
 *
 * The five family lines stay explicit: a loop would need an untyped accumulator and a
 * cast, and would lose the per-family type check.
 */
export const defaultAlgorithm: MappingAlgorithm = (seed): MapToken => ({
  ...seed,
  ...familyTokens('Primary', slotsFor('Primary', seed)),
  ...familyTokens('Success', slotsFor('Success', seed)),
  ...familyTokens('Warning', slotsFor('Warning', seed)),
  ...familyTokens('Error', slotsFor('Error', seed)),
  ...familyTokens('Info', slotsFor('Info', seed)),
  ...figmaUnlessOverridden(seed, 'colorTextBase', figmaTextTokens, (color) =>
    mapValues(textBaseAlpha, (alpha) => setAlpha(color, alpha))
  ),
  ...figmaUnlessOverridden(seed, 'colorBgBase', figmaBgTokens, (color) =>
    mapValues(bgBaseDarken, (amount) => darken(color, amount))
  ),
  ...figmaUnlessOverridden(
    seed,
    'fontSize',
    figmaFontTokens,
    generateFontTokens
  ),
  ...motionTokens(seed),
  lineWidthBold: seed.lineWidth + 1,
  ...fixedMapTokens,
});
