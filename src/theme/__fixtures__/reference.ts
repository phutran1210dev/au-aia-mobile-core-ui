/**
 * Reference output for the ported color code and the derivation algorithm, produced on
 * 2026-10-03 by the libraries credited in docs/tokens.md § Prior art (@ant-design/colors
 * 8.0.1, @ant-design/fast-color 3.0.1, antd 6.6.5) and by @ctrl/tinycolor. Never derived
 * from the code under test.
 */

/** Ten-color palettes from the palette generator, lightest first; the input is sixth. */
export const referencePalettes: Readonly<Record<string, readonly string[]>> = {
  '#1677ff': [
    '#e6f4ff',
    '#bae0ff',
    '#91caff',
    '#69b1ff',
    '#4096ff',
    '#1677ff',
    '#0958d9',
    '#003eb3',
    '#002c8c',
    '#001d66',
  ],
  '#E00842': [
    '#ffe6e8',
    '#ffadb8',
    '#ff8599',
    '#fa5a7a',
    '#ed2f5c',
    '#e00842',
    '#ba0038',
    '#940031',
    '#6e0028',
    '#47001d',
  ],
  '#229F64': [
    '#d1ded5',
    '#b2d1be',
    '#87c4a2',
    '#61b88a',
    '#3fab75',
    '#229f64',
    '#13784c',
    '#095235',
    '#032b1c',
    '#000503',
  ],
  'rgb(12, 109, 210)': [
    '#e6f6ff',
    '#b3e2ff',
    '#86c8f7',
    '#59a9eb',
    '#318ade',
    '#0c6dd2',
    '#024eab',
    '#003785',
    '#00245e',
    '#001438',
  ],
  '#abc': [
    '#f0faff',
    '#f0f9ff',
    '#e4ecf2',
    '#d8e0e6',
    '#ccd3d9',
    '#aabbcc',
    '#8192a6',
    '#5d6c80',
    '#3d4859',
    '#222833',
  ],
  '#808080': [
    '#bfbfbf',
    '#b3b3b3',
    '#a6a6a6',
    '#999999',
    '#8c8c8c',
    '#808080',
    '#595959',
    '#333333',
    '#0d0d0d',
    '#000000',
  ],
};

/** `[color, alpha, expected]` for `setAlpha`. */
export const referenceAlpha: readonly [string, number, string][] = [
  ['#333D47', 0.88, 'rgba(51,61,71,0.88)'],
  ['#1677ff', 0.25, 'rgba(22,119,255,0.25)'],
];

/** `[color, amount, expected]` for `darken`, which lowers HSL lightness. */
export const referenceDarken: readonly [string, number, string][] = [
  ['#ffffff', 4, '#f5f5f5'],
  ['#ffffff', 15, '#d9d9d9'],
  ['#F0F4FF', 0, '#f0f4ff'],
  ['#F0F4FF', 4, '#dce5ff'],
  ['#F0F4FF', 6, '#d1deff'],
  ['#F0F4FF', 15, '#a3bcff'],
  ['#FFF8E1', 4, '#fff3cd'],
  ['#333D47', 10, '#1e2329'],
];

/**
 * Primary (ten-step) and success (seven-step) map tokens the reference model derives for
 * `{ colorPrimary: '#1677ff', colorSuccess: '#52c41a' }`.
 */
export const referenceDerivedFamilies = {
  colorPrimaryBg: '#e6f4ff',
  colorPrimaryBgHover: '#bae0ff',
  colorPrimaryBorder: '#91caff',
  colorPrimaryBorderHover: '#69b1ff',
  colorPrimaryHover: '#4096ff',
  colorPrimary: '#1677ff',
  colorPrimaryActive: '#0958d9',
  colorPrimaryTextHover: '#4096ff',
  colorPrimaryText: '#1677ff',
  colorPrimaryTextActive: '#0958d9',
  colorSuccessBg: '#f6ffed',
  colorSuccessBgHover: '#d9f7be',
  colorSuccessBorder: '#b7eb8f',
  colorSuccessBorderHover: '#95de64',
  colorSuccessHover: '#95de64',
  colorSuccess: '#52c41a',
  colorSuccessActive: '#389e0d',
  colorSuccessTextHover: '#73d13d',
  colorSuccessText: '#52c41a',
  colorSuccessTextActive: '#389e0d',
} as const;

/**
 * Font sizes and line heights the reference model derives for `{ fontSize: 16 }`
 * (antd 6.6.5 `theme.getDesignToken`). `fontHeight*` are its rounded px line heights.
 */
export const referenceDerivedTypography = {
  fontSize: 16,
  fontSizeSM: 14,
  fontSizeLG: 18,
  fontSizeXL: 22,
  fontSizeHeading1: 42,
  fontSizeHeading2: 34,
  fontSizeHeading3: 28,
  fontSizeHeading4: 22,
  fontSizeHeading5: 18,
  lineHeight: 1.5,
  lineHeightSM: 1.5714285714285714,
  lineHeightLG: 1.4444444444444444,
  lineHeightHeading1: 1.1904761904761905,
  lineHeightHeading2: 1.2352941176470589,
  lineHeightHeading3: 1.2857142857142858,
  lineHeightHeading4: 1.3636363636363635,
  lineHeightHeading5: 1.4444444444444444,
  fontHeight: 24,
  fontHeightSM: 22,
  fontHeightLG: 26,
} as const;

/**
 * `fontHeight*` after map overrides (antd 6.6.5): they follow an overridden size or line
 * height, and an explicit `fontHeight` wins.
 */
export const referenceFontHeights: readonly {
  token: Record<string, number>;
  expected: Record<string, number>;
}[] = [
  { token: { lineHeight: 1.5 }, expected: { fontHeight: 21 } },
  { token: { fontSizeLG: 18 }, expected: { fontHeightLG: 27 } },
  { token: { lineHeight: 1.5, fontHeight: 30 }, expected: { fontHeight: 30 } },
];

/**
 * Motion and line tokens the reference model derives (antd 6.6.5), in ms here. For
 * `{ motionUnit: 0.2, motionBase: 0.1 }` it returns `0.3s`, `0.5s` and `0.7s`; for
 * `{ motion: false }` it returns `0s` for all three, unless a duration is overridden too.
 */
export const referenceDerivedMotion = {
  scaled: {
    token: { motionUnit: 200, motionBase: 100 },
    expected: {
      motionDurationFast: 300,
      motionDurationMid: 500,
      motionDurationSlow: 700,
    },
  },
  off: {
    token: { motion: false },
    expected: {
      motionDurationFast: 0,
      motionDurationMid: 0,
      motionDurationSlow: 0,
    },
  },
  offWithOverride: {
    token: { motion: false, motionDurationSlow: 500 },
    expected: {
      motionDurationFast: 0,
      motionDurationMid: 0,
      motionDurationSlow: 500,
    },
  },
  lineWidth: {
    token: { lineWidth: 2 },
    expected: { lineWidth: 2, lineWidthBold: 3 },
  },
} as const;

/**
 * Neutrals derived from an overridden `colorTextBase` (reference model: alpha of the base)
 * and `colorBgBase` (HSL darken by 0, 4, 15 and 6).
 */
export const referenceDerivedNeutrals = {
  colorTextBase: {
    seed: '#000000',
    tokens: {
      colorText: 'rgba(0,0,0,0.88)',
      colorTextSecondary: 'rgba(0,0,0,0.65)',
      colorTextTertiary: 'rgba(0,0,0,0.45)',
      colorTextQuaternary: 'rgba(0,0,0,0.25)',
    },
  },
  colorBgBase: {
    seed: '#F0F4FF',
    tokens: {
      colorBgContainer: '#f0f4ff',
      colorBgLayout: '#dce5ff',
      colorBorder: '#a3bcff',
      colorBorderSecondary: '#d1deff',
    },
  },
} as const;
