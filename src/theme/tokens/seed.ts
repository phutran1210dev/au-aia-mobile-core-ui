import { palette } from '../palette';
import type { SeedToken } from './types';

/** Library default seeds: the Figma brand values. See `SeedToken` for sources. Internal. */
export const defaultSeed: Readonly<SeedToken> = Object.freeze({
  colorPrimary: palette.digitalRed[500],
  colorSuccess: palette.digitalGreen[300],
  colorWarning: palette.digitalYellow[300],
  colorError: palette.digitalCerise[300],
  colorInfo: palette.digitalBlue[300],
  colorTextBase: palette.digitalCharcoal[600],
  colorBgBase: palette.monotone.white,
});

/** Names of the seed tokens. Internal. */
export const seedTokenKeys: ReadonlySet<string> = new Set(
  Object.keys(defaultSeed)
);
