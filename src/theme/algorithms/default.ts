import {
  colorFamilies,
  familyTokens,
  figmaBgTokens,
  figmaTextTokens,
  fixedMapTokens,
  type ColorFamily,
  type PaletteSlots,
} from '../tokens/map';
import { defaultSeed } from '../tokens/seed';
import type { MapToken, SeedToken } from '../tokens/types';
import type { MappingAlgorithm } from '../types';
import { darken, isSameColor, setAlpha } from '../utils/color';
import { generatePalette } from './generatePalette';

/**
 * Figma slots while the family's seed equals its default; otherwise the generated palette.
 * Generated slot n is palette color n, the same slot scheme as the Figma ten-step family.
 */
function slotsFor(family: ColorFamily, seed: SeedToken): PaletteSlots {
  const { seed: key, figmaSlots } = colorFamilies[family];
  return isSameColor(seed[key], defaultSeed[key])
    ? figmaSlots
    : generatePalette(seed[key]);
}

function textTokens(colorTextBase: string) {
  if (isSameColor(colorTextBase, defaultSeed.colorTextBase)) {
    return figmaTextTokens;
  }
  return {
    colorText: setAlpha(colorTextBase, 0.88),
    colorTextSecondary: setAlpha(colorTextBase, 0.65),
    colorTextTertiary: setAlpha(colorTextBase, 0.45),
    colorTextQuaternary: setAlpha(colorTextBase, 0.25),
  };
}

function bgTokens(colorBgBase: string) {
  if (isSameColor(colorBgBase, defaultSeed.colorBgBase)) {
    return figmaBgTokens;
  }
  return {
    colorBgContainer: darken(colorBgBase, 0),
    colorBgLayout: darken(colorBgBase, 4),
    colorBorder: darken(colorBgBase, 15),
    colorBorderSecondary: darken(colorBgBase, 6),
  };
}

/**
 * The default (light) algorithm. A seed equal to its default keeps the Figma-tuned map
 * tokens, so the default theme outputs exactly the Figma values. An overridden seed
 * regenerates its family as antd does.
 */
export const defaultAlgorithm: MappingAlgorithm = (seed): MapToken => ({
  ...seed,
  ...familyTokens('Primary', slotsFor('Primary', seed)),
  ...familyTokens('Success', slotsFor('Success', seed)),
  ...familyTokens('Warning', slotsFor('Warning', seed)),
  ...familyTokens('Error', slotsFor('Error', seed)),
  ...familyTokens('Info', slotsFor('Info', seed)),
  ...textTokens(seed.colorTextBase),
  ...bgTokens(seed.colorBgBase),
  ...fixedMapTokens,
});
