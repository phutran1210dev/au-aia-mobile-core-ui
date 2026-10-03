/**
 * Expected defaults of tokens Figma does not define (docs/specs/theme-parity.md, D5).
 * Never derived from the code under test.
 */

/**
 * The reference model's defaults (antd 6.6.5 `theme.getDesignToken()`, read on 2026-10-03),
 * converted to React Native: seconds become ms (`motionUnit` 0.1 s is 100 ms, `0.1s` is 100)
 * and `cubic-bezier(...)` strings become `[x1, y1, x2, y2]` (D12).
 */
export const referenceDefaults: Readonly<Record<string, unknown>> = {
  lineWidth: 1,
  lineType: 'solid',
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  opacityImage: 1,
  focusOutline: true,
  motion: true,
  motionUnit: 100,
  motionBase: 0,
  motionEaseInBack: [0.71, -0.46, 0.88, 0.6],
  motionEaseInOut: [0.645, 0.045, 0.355, 1],
  motionEaseInOutCirc: [0.78, 0.14, 0.15, 0.86],
  motionEaseInQuint: [0.755, 0.05, 0.855, 0.06],
  motionEaseOut: [0.215, 0.61, 0.355, 1],
  motionEaseOutBack: [0.12, 0.4, 0.29, 1.46],
  motionEaseOutCirc: [0.08, 0.82, 0.17, 1],
  motionEaseOutQuint: [0.23, 1, 0.32, 1],
  lineWidthBold: 2,
  motionDurationFast: 100,
  motionDurationMid: 200,
  motionDurationSlow: 300,
};

/**
 * Platform defaults with no Figma or reference value. Jest runs with the iOS platform, so
 * these are the iOS values; Android and web use `monospace`.
 */
export const platformDefaults: Readonly<Record<string, unknown>> = {
  fontFamilyCode: 'Menlo',
};
