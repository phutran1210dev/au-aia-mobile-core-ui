/**
 * System font families that differ by platform. Metro picks `platformFonts.ios.ts` on iOS;
 * this file serves Android, web and Node. Kept out of `react-native` imports, so the
 * resolver still loads outside React Native. Internal.
 */

/** Monospace family for code text: a system family on Android and in browsers. */
export const monospaceFamily = 'monospace';
