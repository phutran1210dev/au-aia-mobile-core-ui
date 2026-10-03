import { palette } from '../palette';
import { typography } from '../typography';
import { monospaceFamily } from './platformFonts';
import type { CubicBezier, SeedToken } from './types';

const curve = (...points: CubicBezier): CubicBezier => Object.freeze(points);

/**
 * Library default seeds: the Figma brand values, and the reference model's defaults where
 * Figma defines none (motion in ms). See `SeedToken` for sources. Internal.
 */
export const defaultSeed: Readonly<SeedToken> = Object.freeze({
  colorPrimary: palette.digitalRed[500],
  colorSuccess: palette.digitalGreen[300],
  colorWarning: palette.digitalYellow[300],
  colorError: palette.digitalCerise[300],
  colorInfo: palette.digitalBlue[300],
  colorTextBase: palette.digitalCharcoal[600],
  colorBgBase: palette.monotone.white,
  fontFamily: typography.family.body,
  fontSize: typography.size.body2,
  fontFamilyCode: monospaceFamily,
  lineWidth: 1,
  lineType: 'solid',
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  opacityImage: 1,
  motion: true,
  motionUnit: 100,
  motionBase: 0,
  motionEaseInBack: curve(0.71, -0.46, 0.88, 0.6),
  motionEaseInOut: curve(0.645, 0.045, 0.355, 1),
  motionEaseInOutCirc: curve(0.78, 0.14, 0.15, 0.86),
  motionEaseInQuint: curve(0.755, 0.05, 0.855, 0.06),
  motionEaseOut: curve(0.215, 0.61, 0.355, 1),
  motionEaseOutBack: curve(0.12, 0.4, 0.29, 1.46),
  motionEaseOutCirc: curve(0.08, 0.82, 0.17, 1),
  motionEaseOutQuint: curve(0.23, 1, 0.32, 1),
  focusOutline: true,
});

/** Names of the color seeds, such as `colorPrimary`. Internal. */
export type ColorSeed = Extract<keyof SeedToken, `color${string}`>;

/** Names of the seed tokens. Internal. */
export const seedTokenKeys: ReadonlySet<string> = new Set(
  Object.keys(defaultSeed)
);
