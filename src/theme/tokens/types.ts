import type { TextStyle } from 'react-native';

/**
 * Public token interfaces. Seed, map and alias tokens follow the reference model
 * (docs/tokens.md § Prior art); semantic color names come from DDS `Interactive/*`, and
 * semantic typography names from Qi `AIA Typography` paths.
 * Colors come from Qi tokens – AIA (node 102-2817), type from its `AIA Typography` collection.
 * Values in `@default` were copied from Figma; docs/tokens.md lists every token.
 */

/** A font weight React Native accepts, such as `600`. */
export type FontWeight = NonNullable<TextStyle['fontWeight']>;

/**
 * A cubic Bézier easing curve as `[x1, y1, x2, y2]`, ready to spread into
 * `Easing.bezier(...curve)`.
 */
export type CubicBezier = readonly [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
];

/**
 * Seed tokens: the design decisions every other color derives from. Overriding a seed
 * regenerates its map tokens with the theme's algorithm.
 */
export interface SeedToken {
  /**
   * Brand color of actionable elements, such as a primary Button.
   * @figma DDS Interactive/Actionable; Qi Primary/Digital red/digitalred-500
   * @default palette.digitalRed[500] = #E00842
   * @interim pending design: two DDS nodes use #D31145 for Primary/Red/100.
   */
  colorPrimary: string;
  /**
   * Color of success feedback, such as a completed step.
   * @figma DDS Interactive/Success; Qi Semantic/Digital green/digitalgreen-300
   * @default palette.digitalGreen[300] = #229F64
   */
  colorSuccess: string;
  /**
   * Color of warning feedback.
   * @figma DDS interactive page, Warning swatch (no variable); Qi Semantic/Digital yellow/digitalyellow-300
   * @default palette.digitalYellow[300] = #F7C926
   */
  colorWarning: string;
  /**
   * Color of error feedback, such as a failed form field.
   * @figma DDS interactive page, Error swatch (no variable); Qi Semantic/Digital cerise/digitalcerise-300
   * @default palette.digitalCerise[300] = #D40C74
   */
  colorError: string;
  /**
   * Color of neutral information, such as an info banner.
   * @figma DDS Interactive/Informative; Qi Semantic/Digital blue/digitalblue-300
   * @default palette.digitalBlue[300] = #0C6DD2
   */
  colorInfo: string;
  /**
   * Base text color. Overriding it regenerates the colorText* tokens as alphas of this
   * color (0.88, 0.65, 0.45, 0.25).
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-600 (DDS Primary/Charcoal/100)
   * @default palette.digitalCharcoal[600] = #333D47
   */
  colorTextBase: string;
  /**
   * Base background color. Overriding it regenerates colorBgContainer, colorBgLayout,
   * colorBorder and colorBorderSecondary by darkening this color by 0, 4, 15 and 6 points.
   * @figma Qi Monotone/monotone-white
   * @default palette.monotone.white = #FFFFFF
   */
  colorBgBase: string;

  /**
   * Font family of body text: one family name, exactly as the app registers the font. The
   * default is the family Open Sans declares, so with the fonts registered as a family (see
   * docs/tokens.md § Fonts), `fontWeight` picks the face on iOS and Android. Apps that
   * register the font under another name override it through `ConfigProvider`.
   * @figma Qi AIA Typography/Family/body (stores `OpenSans`)
   * @default typography.family.body = Open Sans
   * @interim pending design: the name the health app registers is not confirmed yet.
   */
  fontFamily: string;
  /**
   * Font size of body text, in dp. Overriding it regenerates the other font sizes and line
   * heights with the theme's algorithm.
   * @figma Qi AIA Typography/Size/body2
   * @default typography.size.body2 = 14
   */
  fontSize: number;
  /**
   * Font family of code text: one system monospace family per platform.
   * @figma none; Figma defines no code font
   * @default `Menlo` on iOS, `monospace` on Android and web
   */
  fontFamilyCode: string;

  /**
   * Width of borders and dividers, in dp.
   * @figma none; the reference model's default
   * @default 1
   */
  lineWidth: number;
  /**
   * Style of borders and dividers, as React Native's `borderStyle`.
   * @figma none; the reference model's default
   * @default 'solid'
   */
  lineType: 'solid' | 'dashed' | 'dotted';

  /**
   * Base `zIndex` of components. React Native's `zIndex` orders siblings only.
   * @figma none; the reference model's default
   * @default 0
   */
  zIndexBase: number;
  /**
   * Base `zIndex` of floating components, such as a popover.
   * @figma none; the reference model's default
   * @default 1000
   */
  zIndexPopupBase: number;

  /**
   * Opacity of images. A dark theme may lower it.
   * @figma none; the reference model's default
   * @default 1
   */
  opacityImage: number;

  /**
   * Whether components animate. `false` sets the three `motionDuration*` tokens to 0.
   * @figma none; the reference model's default
   * @default true
   */
  motion: boolean;
  /**
   * Step between motion durations, in ms. Overriding it regenerates the durations.
   * @figma none; the reference model's default (0.1 s)
   * @default 100
   */
  motionUnit: number;
  /**
   * Base of motion durations, in ms.
   * @figma none; the reference model's default
   * @default 0
   */
  motionBase: number;
  /**
   * Easing curve that overshoots at the start.
   * @figma none; the reference model's default
   * @default [0.71, -0.46, 0.88, 0.6]
   */
  motionEaseInBack: CubicBezier;
  /**
   * Easing curve that speeds up, then slows down.
   * @figma none; the reference model's default
   * @default [0.645, 0.045, 0.355, 1]
   */
  motionEaseInOut: CubicBezier;
  /**
   * Circular easing curve that speeds up, then slows down.
   * @figma none; the reference model's default
   * @default [0.78, 0.14, 0.15, 0.86]
   */
  motionEaseInOutCirc: CubicBezier;
  /**
   * Quintic easing curve that starts slowly.
   * @figma none; the reference model's default
   * @default [0.755, 0.05, 0.855, 0.06]
   */
  motionEaseInQuint: CubicBezier;
  /**
   * Easing curve that slows down at the end.
   * @figma none; the reference model's default
   * @default [0.215, 0.61, 0.355, 1]
   */
  motionEaseOut: CubicBezier;
  /**
   * Easing curve that overshoots at the end.
   * @figma none; the reference model's default
   * @default [0.12, 0.4, 0.29, 1.46]
   */
  motionEaseOutBack: CubicBezier;
  /**
   * Circular easing curve that slows down at the end.
   * @figma none; the reference model's default
   * @default [0.08, 0.82, 0.17, 1]
   */
  motionEaseOutCirc: CubicBezier;
  /**
   * Quintic easing curve that slows down at the end.
   * @figma none; the reference model's default
   * @default [0.23, 1, 0.32, 1]
   */
  motionEaseOutQuint: CubicBezier;

  /**
   * Whether components show a visible outline while focused, such as with a keyboard.
   * @figma none; the reference model's default
   * @default true
   */
  focusOutline: boolean;
}

/**
 * Map tokens: one color for each purpose in a seed's family, read from palette slots.
 * Defaults are hand-mapped Qi steps; an overridden seed regenerates its family with
 * `generatePalette`.
 *
 * `*Hover` tokens are kept for parity with the reference model (docs/tokens.md § Prior
 * art). Touch screens have no hover, so components use
 * the semantic Pressed tokens, which reference the `*Active` tokens.
 */
export interface MapToken extends SeedToken {
  // Primary: Digital red, ten steps; slot n = step n. Text* reuse slots 5-7.

  /**
   * Lightest primary tint, for the background of a primary-tinted area.
   * @figma Qi Primary/Digital red/digitalred-50
   * @default palette.digitalRed[50] = #FFEDF1
   */
  colorPrimaryBg: string;
  /**
   * colorPrimaryBg under hover. Unused on touch.
   * @figma Qi Primary/Digital red/digitalred-100
   * @default palette.digitalRed[100] = #FADAE3
   */
  colorPrimaryBgHover: string;
  /**
   * Light primary border, such as the outline of a primary-tinted area.
   * @figma Qi Primary/Digital red/digitalred-200
   * @default palette.digitalRed[200] = #EC6B8E
   */
  colorPrimaryBorder: string;
  /**
   * colorPrimaryBorder under hover. Unused on touch.
   * @figma Qi Primary/Digital red/digitalred-300
   * @default palette.digitalRed[300] = #E84671
   */
  colorPrimaryBorderHover: string;
  /**
   * colorPrimary under hover. Unused on touch.
   * @figma Qi Primary/Digital red/digitalred-400
   * @default palette.digitalRed[400] = #E32155
   */
  colorPrimaryHover: string;
  /**
   * colorPrimary while pressed (the active state).
   * @figma Qi Primary/Digital red/digitalred-600
   * @default palette.digitalRed[600] = #B30635
   */
  colorPrimaryActive: string;
  /**
   * colorPrimaryText under hover. Unused on touch.
   * @figma Qi Primary/Digital red/digitalred-400
   * @default palette.digitalRed[400] = #E32155 (palette slot 5)
   */
  colorPrimaryTextHover: string;
  /**
   * Text in the primary family, such as a link-style label.
   * @figma Qi Primary/Digital red/digitalred-500
   * @default palette.digitalRed[500] = #E00842 (palette slot 6)
   */
  colorPrimaryText: string;
  /**
   * colorPrimaryText while pressed.
   * @figma Qi Primary/Digital red/digitalred-600
   * @default palette.digitalRed[600] = #B30635 (palette slot 7)
   */
  colorPrimaryTextActive: string;

  // Success: Digital green, seven steps; slots 1-7 = steps 50, 100, 100, 200, 200, 300, 400.

  /**
   * Lightest success tint, for the background of success feedback.
   * @figma Qi Semantic/Digital green/digitalgreen-50
   * @default palette.digitalGreen[50] = #E9F5F0
   */
  colorSuccessBg: string;
  /**
   * colorSuccessBg under hover. Unused on touch.
   * @figma Qi Semantic/Digital green/digitalgreen-100
   * @default palette.digitalGreen[100] = #A7D9C1
   */
  colorSuccessBgHover: string;
  /**
   * Light success border.
   * @figma Qi Semantic/Digital green/digitalgreen-100
   * @default palette.digitalGreen[100] = #A7D9C1
   */
  colorSuccessBorder: string;
  /**
   * colorSuccessBorder under hover. Unused on touch.
   * @figma Qi Semantic/Digital green/digitalgreen-200
   * @default palette.digitalGreen[200] = #64BC93
   */
  colorSuccessBorderHover: string;
  /**
   * colorSuccess under hover (palette slot 4). Unused on touch.
   * @figma Qi Semantic/Digital green/digitalgreen-200
   * @default palette.digitalGreen[200] = #64BC93
   */
  colorSuccessHover: string;
  /**
   * colorSuccess while pressed.
   * @figma Qi Semantic/Digital green/digitalgreen-400
   * @default palette.digitalGreen[400] = #1B7F50
   */
  colorSuccessActive: string;
  /**
   * colorSuccessText under hover. Unused on touch.
   * @figma Qi Semantic/Digital green/digitalgreen-200
   * @default palette.digitalGreen[200] = #64BC93 (palette slot 5)
   */
  colorSuccessTextHover: string;
  /**
   * Text in the success family.
   * @figma Qi Semantic/Digital green/digitalgreen-300
   * @default palette.digitalGreen[300] = #229F64 (palette slot 6)
   */
  colorSuccessText: string;
  /**
   * colorSuccessText while pressed.
   * @figma Qi Semantic/Digital green/digitalgreen-400
   * @default palette.digitalGreen[400] = #1B7F50 (palette slot 7)
   */
  colorSuccessTextActive: string;

  // Warning: Digital yellow, seven steps (same slots as Success).

  /**
   * Lightest warning tint, for the background of warning feedback.
   * @figma Qi Semantic/Digital yellow/digitalyellow-50
   * @default palette.digitalYellow[50] = #FEF7DF
   */
  colorWarningBg: string;
  /**
   * colorWarningBg under hover. Unused on touch.
   * @figma Qi Semantic/Digital yellow/digitalyellow-100
   * @default palette.digitalYellow[100] = #FCE8A1
   */
  colorWarningBgHover: string;
  /**
   * Light warning border.
   * @figma Qi Semantic/Digital yellow/digitalyellow-100
   * @default palette.digitalYellow[100] = #FCE8A1
   */
  colorWarningBorder: string;
  /**
   * colorWarningBorder under hover. Unused on touch.
   * @figma Qi Semantic/Digital yellow/digitalyellow-200
   * @default palette.digitalYellow[200] = #F9D864
   */
  colorWarningBorderHover: string;
  /**
   * colorWarning under hover (palette slot 4). Unused on touch.
   * @figma Qi Semantic/Digital yellow/digitalyellow-200
   * @default palette.digitalYellow[200] = #F9D864
   */
  colorWarningHover: string;
  /**
   * colorWarning while pressed.
   * @figma Qi Semantic/Digital yellow/digitalyellow-400
   * @default palette.digitalYellow[400] = #BF9B1D
   */
  colorWarningActive: string;
  /**
   * colorWarningText under hover. Unused on touch.
   * @figma Qi Semantic/Digital yellow/digitalyellow-200
   * @default palette.digitalYellow[200] = #F9D864 (palette slot 5)
   */
  colorWarningTextHover: string;
  /**
   * Text in the warning family.
   * @figma Qi Semantic/Digital yellow/digitalyellow-300
   * @default palette.digitalYellow[300] = #F7C926 (palette slot 6)
   */
  colorWarningText: string;
  /**
   * colorWarningText while pressed.
   * @figma Qi Semantic/Digital yellow/digitalyellow-400
   * @default palette.digitalYellow[400] = #BF9B1D (palette slot 7)
   */
  colorWarningTextActive: string;

  // Error: Digital cerise, seven steps (same slots as Success).

  /**
   * Lightest error tint, for the background of error feedback.
   * @figma Qi Semantic/Digital cerise/digitalcerise-50
   * @default palette.digitalCerise[50] = #FBE7F1
   */
  colorErrorBg: string;
  /**
   * colorErrorBg under hover. Unused on touch.
   * @figma Qi Semantic/Digital cerise/digitalcerise-100
   * @default palette.digitalCerise[100] = #EC96C3
   */
  colorErrorBgHover: string;
  /**
   * Light error border.
   * @figma Qi Semantic/Digital cerise/digitalcerise-100
   * @default palette.digitalCerise[100] = #EC96C3
   */
  colorErrorBorder: string;
  /**
   * colorErrorBorder under hover. Unused on touch.
   * @figma Qi Semantic/Digital cerise/digitalcerise-200
   * @default palette.digitalCerise[200] = #E0519B
   */
  colorErrorBorderHover: string;
  /**
   * colorError under hover (palette slot 5). Unused on touch.
   * @figma Qi Semantic/Digital cerise/digitalcerise-200
   * @default palette.digitalCerise[200] = #E0519B
   */
  colorErrorHover: string;
  /**
   * colorError while pressed.
   * @figma Qi Semantic/Digital cerise/digitalcerise-400
   * @default palette.digitalCerise[400] = #A4095A
   */
  colorErrorActive: string;
  /**
   * colorErrorText under hover. Unused on touch.
   * @figma Qi Semantic/Digital cerise/digitalcerise-200
   * @default palette.digitalCerise[200] = #E0519B (palette slot 5)
   */
  colorErrorTextHover: string;
  /**
   * Text in the error family, such as a field's error message.
   * @figma Qi Semantic/Digital cerise/digitalcerise-300
   * @default palette.digitalCerise[300] = #D40C74 (palette slot 6)
   */
  colorErrorText: string;
  /**
   * colorErrorText while pressed.
   * @figma Qi Semantic/Digital cerise/digitalcerise-400
   * @default palette.digitalCerise[400] = #A4095A (palette slot 7)
   */
  colorErrorTextActive: string;

  // Info: Digital blue, seven steps (same slots as Success).

  /**
   * Lightest info tint, for the background of informative content.
   * @figma Qi Semantic/Digital blue/digitalblue-50
   * @default palette.digitalBlue[50] = #E7F0FB
   */
  colorInfoBg: string;
  /**
   * colorInfoBg under hover. Unused on touch.
   * @figma Qi Semantic/Digital blue/digitalblue-100
   * @default palette.digitalBlue[100] = #9EC5ED
   */
  colorInfoBgHover: string;
  /**
   * Light info border.
   * @figma Qi Semantic/Digital blue/digitalblue-100
   * @default palette.digitalBlue[100] = #9EC5ED
   */
  colorInfoBorder: string;
  /**
   * colorInfoBorder under hover. Unused on touch.
   * @figma Qi Semantic/Digital blue/digitalblue-200
   * @default palette.digitalBlue[200] = #3D8ADB
   */
  colorInfoBorderHover: string;
  /**
   * colorInfo under hover (palette slot 4). Unused on touch.
   * @figma Qi Semantic/Digital blue/digitalblue-200
   * @default palette.digitalBlue[200] = #3D8ADB
   */
  colorInfoHover: string;
  /**
   * colorInfo while pressed.
   * @figma Qi Semantic/Digital blue/digitalblue-400
   * @default palette.digitalBlue[400] = #0A57A8
   */
  colorInfoActive: string;
  /**
   * colorInfoText under hover. Unused on touch.
   * @figma Qi Semantic/Digital blue/digitalblue-200
   * @default palette.digitalBlue[200] = #3D8ADB (palette slot 5)
   */
  colorInfoTextHover: string;
  /**
   * Text in the info family.
   * @figma Qi Semantic/Digital blue/digitalblue-300
   * @default palette.digitalBlue[300] = #0C6DD2 (palette slot 6)
   */
  colorInfoText: string;
  /**
   * colorInfoText while pressed.
   * @figma Qi Semantic/Digital blue/digitalblue-400
   * @default palette.digitalBlue[400] = #0A57A8 (palette slot 7)
   */
  colorInfoTextActive: string;

  // Neutrals: Digital charcoal, from colorTextBase and colorBgBase.

  /**
   * Default text color.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-600
   * @default palette.digitalCharcoal[600] = #333D47
   */
  colorText: string;
  /**
   * Secondary text, such as a subtitle.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-500
   * @default palette.digitalCharcoal[500] = #666E75
   */
  colorTextSecondary: string;
  /**
   * Tertiary text, such as a description or helper text.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-400
   * @default palette.digitalCharcoal[400] = #858B91
   */
  colorTextTertiary: string;
  /**
   * Quaternary text, the faintest, such as a placeholder or disabled label.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-300
   * @default palette.digitalCharcoal[300] = #ADB1B5
   */
  colorTextQuaternary: string;
  /**
   * Default border, such as the outline of an input.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-200
   * @default palette.digitalCharcoal[200] = #D6D8DA
   */
  colorBorder: string;
  /**
   * Lighter border, such as a divider between list rows.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-100
   * @default palette.digitalCharcoal[100] = #EBECED
   */
  colorBorderSecondary: string;
  /**
   * Background of the screen behind containers.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-50
   * @default palette.digitalCharcoal[50] = #F5F5F6
   */
  colorBgLayout: string;
  /**
   * Background of containers, such as cards and inputs.
   * @figma Qi Monotone/monotone-white
   * @default palette.monotone.white = #FFFFFF
   */
  colorBgContainer: string;
  /**
   * Translucent overlay behind modals and sheets.
   * @figma Qi Alpha/digitalcharcoal-900a50
   * @default palette.alpha.digitalCharcoal900a50 = #14181C80
   */
  colorBgMask: string;
  /**
   * Pure white, such as text on a solid brand fill.
   * @figma Qi Monotone/monotone-white
   * @default palette.monotone.white = #FFFFFF
   */
  colorWhite: string;

  // Typography: Qi body and Mobile headline sizes, from fontSize. Line heights are ratios of
  // their font size; fontHeight* hold the dp value React Native's `lineHeight` needs.

  /**
   * Small body text, such as a caption.
   * @figma Qi AIA Typography/Size/body3
   * @default typography.size.body3 = 12
   */
  fontSizeSM: number;
  /**
   * Large body text, such as a paragraph (DDS Body/Paragraph).
   * @figma Qi AIA Typography/Size/body1
   * @default typography.size.body1 = 16
   */
  fontSizeLG: number;
  /**
   * Extra-large text, such as a small heading. Its line height is `lineHeightHeadline6`.
   * @figma Qi AIA Typography/Size/Mobile/headline6
   * @default typography.size.headline6 = 18
   */
  fontSizeXL: number;
  /**
   * Heading level 1.
   * @figma Qi AIA Typography/Size/Mobile/headline1
   * @default typography.size.headline1 = 32
   */
  fontSizeHeading1: number;
  /**
   * Heading level 2.
   * @figma Qi AIA Typography/Size/Mobile/headline2
   * @default typography.size.headline2 = 28
   */
  fontSizeHeading2: number;
  /**
   * Heading level 3.
   * @figma Qi AIA Typography/Size/Mobile/headline3
   * @default typography.size.headline3 = 24
   */
  fontSizeHeading3: number;
  /**
   * Heading level 4.
   * @figma Qi AIA Typography/Size/Mobile/headline4
   * @default typography.size.headline4 = 22
   */
  fontSizeHeading4: number;
  /**
   * Heading level 5.
   * @figma Qi AIA Typography/Size/Mobile/headline5
   * @default typography.size.headline5 = 20
   */
  fontSizeHeading5: number;
  /**
   * Line height of `fontSize` text as a ratio of the size. React Native needs dp: use
   * `fontHeight`, or `Math.round(fontSize * lineHeight)`.
   * @figma Qi AIA Typography/Line height/body2 ÷ Size/body2
   * @default 20 / 14
   */
  lineHeight: number;
  /**
   * Line height of `fontSizeSM` text as a ratio of the size.
   * @figma Qi AIA Typography/Line height/body3 ÷ Size/body3
   * @default 18 / 12
   */
  lineHeightSM: number;
  /**
   * Line height of `fontSizeLG` text as a ratio of the size.
   * @figma Qi AIA Typography/Line height/body1 ÷ Size/body1
   * @default 24 / 16
   */
  lineHeightLG: number;
  /**
   * Line height of heading level 1 as a ratio of its size.
   * @figma Qi AIA Typography/Line height/Mobile/headline1 ÷ Size/Mobile/headline1
   * @default 40 / 32
   */
  lineHeightHeading1: number;
  /**
   * Line height of heading level 2 as a ratio of its size.
   * @figma Qi AIA Typography/Line height/Mobile/headline2 ÷ Size/Mobile/headline2
   * @default 36 / 28
   */
  lineHeightHeading2: number;
  /**
   * Line height of heading level 3 as a ratio of its size.
   * @figma Qi AIA Typography/Line height/Mobile/headline3 ÷ Size/Mobile/headline3
   * @default 32 / 24
   */
  lineHeightHeading3: number;
  /**
   * Line height of heading level 4 as a ratio of its size.
   * @figma Qi AIA Typography/Line height/Mobile/headline4 ÷ Size/Mobile/headline4
   * @default 30 / 22
   */
  lineHeightHeading4: number;
  /**
   * Line height of heading level 5 as a ratio of its size.
   * @figma Qi AIA Typography/Line height/Mobile/headline5 ÷ Size/Mobile/headline5
   * @default 26 / 20
   */
  lineHeightHeading5: number;
  /**
   * Line height of `fontSize` text in dp: `Math.round(fontSize * lineHeight)`. It follows
   * overrides of either token.
   * @figma Qi AIA Typography/Line height/body2
   * @default 20
   */
  fontHeight: number;
  /**
   * Line height of `fontSizeSM` text in dp: `Math.round(fontSizeSM * lineHeightSM)`.
   * @figma Qi AIA Typography/Line height/body3
   * @default 18
   */
  fontHeightSM: number;
  /**
   * Line height of `fontSizeLG` text in dp: `Math.round(fontSizeLG * lineHeightLG)`.
   * @figma Qi AIA Typography/Line height/body1
   * @default 24
   */
  fontHeightLG: number;

  /**
   * Width of a bold border, in dp: `lineWidth + 1`.
   * @figma none; derived as the reference model does
   * @default 2
   */
  lineWidthBold: number;

  /**
   * Duration of small animations, in ms: `motionBase + motionUnit`. 0 when `motion` is false.
   * @figma none; derived as the reference model does
   * @default 100
   */
  motionDurationFast: number;
  /**
   * Duration of medium animations, in ms: `motionBase + 2 × motionUnit`. 0 when `motion` is false.
   * @figma none; derived as the reference model does
   * @default 200
   */
  motionDurationMid: number;
  /**
   * Duration of large animations, such as a sheet, in ms: `motionBase + 3 × motionUnit`.
   * 0 when `motion` is false.
   * @figma none; derived as the reference model does
   * @default 300
   */
  motionDurationSlow: number;
}

/**
 * Alias tokens: named roles, such as disabled text, that reference map tokens. They
 * re-resolve when the map token they reference is overridden.
 */
export interface AliasToken extends MapToken {
  /**
   * Text of a disabled element.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-300
   * @default colorTextQuaternary, i.e. palette.digitalCharcoal[300] = #ADB1B5
   */
  colorTextDisabled: string;
  /**
   * Placeholder text in an input.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-300
   * @default colorTextQuaternary, i.e. palette.digitalCharcoal[300] = #ADB1B5
   */
  colorTextPlaceholder: string;
  /**
   * Heading text.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-600
   * @default colorText, i.e. palette.digitalCharcoal[600] = #333D47
   */
  colorTextHeading: string;
  /**
   * Label text, such as a form field label.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-500
   * @default colorTextSecondary, i.e. palette.digitalCharcoal[500] = #666E75
   */
  colorTextLabel: string;
  /**
   * Description text, such as helper text under a field.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-400
   * @default colorTextTertiary, i.e. palette.digitalCharcoal[400] = #858B91
   */
  colorTextDescription: string;
  /**
   * Text on a solid colored fill, such as the label of a primary Button.
   * @figma Qi Monotone/monotone-white
   * @default colorWhite, i.e. palette.monotone.white = #FFFFFF
   */
  colorTextLightSolid: string;
  /**
   * Default icon color.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-400
   * @default colorTextTertiary, i.e. palette.digitalCharcoal[400] = #858B91
   */
  colorIcon: string;
  /**
   * Icon color under hover. Unused on touch.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-600
   * @default colorText, i.e. palette.digitalCharcoal[600] = #333D47
   */
  colorIconHover: string;
  /**
   * Border that must match the container background, such as a ring around an avatar.
   * @figma Qi Monotone/monotone-white
   * @default colorBgContainer, i.e. palette.monotone.white = #FFFFFF
   */
  colorBorderBg: string;
  /**
   * Background of an active (chosen) item in a list or menu.
   * @figma Qi Primary/Digital red/digitalred-50
   * @default colorPrimaryBg, i.e. palette.digitalRed[50] = #FFEDF1
   */
  controlItemBgActive: string;
  /**
   * controlItemBgActive under hover. Unused on touch.
   * @figma Qi Primary/Digital red/digitalred-100
   * @default colorPrimaryBgHover, i.e. palette.digitalRed[100] = #FADAE3
   */
  controlItemBgActiveHover: string;
  /**
   * Background of a disabled container, such as a disabled input.
   * It references colorBgLayout, the closest Figma value, until fill tokens exist
   * (docs/tokens.md § Prior art).
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-50
   * @default colorBgLayout, i.e. palette.digitalCharcoal[50] = #F5F5F6
   * @interim pending design: no disabled color in DDS.
   */
  colorBgContainerDisabled: string;
  /**
   * Weight of emphasized body text. A Figma value, not a reference: the reference model
   * holds it as a constant too.
   * @figma Qi AIA Typography/Weight/body/strong1 (semibold)
   * @default typography.weight.bodyStrong1 = 600
   */
  fontWeightStrong: FontWeight;
}

/**
 * Semantic tokens: named for the AIA interactive role they color. Names come from DDS
 * `Interactive/*` because Qi has no semantic names yet. Each one references a map or alias
 * token, or a palette step, never a hex value.
 *
 * Every semantic token is interim: the names stay stable, and only the references may
 * change once design publishes semantic tokens.
 */
export interface SemanticColorToken {
  /**
   * Fill of an actionable element, such as a primary Button.
   * @figma DDS Interactive/Actionable
   * @default colorPrimary, i.e. palette.digitalRed[500] = #E00842
   * @interim pending design: two DDS nodes use #D31145 for Primary/Red/100.
   */
  colorInteractiveActionable: string;
  /**
   * Fill of an actionable element while pressed.
   * @figma none; the `*Active` map token (palette slot 7) for DDS Interactive/Actionable
   * @default colorPrimaryActive, i.e. palette.digitalRed[600] = #B30635
   * @interim pending design: DDS defines no pressed state.
   */
  colorInteractiveActionablePressed: string;
  /**
   * Highlighted interactive color, as DDS defines it. Not the selected state.
   * @figma DDS Interactive/highlighted
   * @default palette.digitalNavyBlue[500] = #082065
   * @interim pending design: DDS also calls AIA Blue #0C6DD2 the highlight color.
   */
  colorInteractiveHighlighted: string;
  /**
   * Color of an informative interactive element, such as an info link.
   * @figma DDS Interactive/Informative
   * @default colorInfo, i.e. palette.digitalBlue[300] = #0C6DD2
   * @interim pending design: Qi has no semantic token names yet.
   */
  colorInteractiveInformative: string;
  /**
   * colorInteractiveInformative while pressed.
   * @figma none; the `*Active` map token (palette slot 7) for DDS Interactive/Informative
   * @default colorInfoActive, i.e. palette.digitalBlue[400] = #0A57A8
   * @interim pending design: DDS defines no pressed state.
   */
  colorInteractiveInformativePressed: string;
  /**
   * Color of a success interactive element.
   * @figma DDS Interactive/Success
   * @default colorSuccess, i.e. palette.digitalGreen[300] = #229F64
   * @interim pending design: Qi has no semantic token names yet.
   */
  colorInteractiveSuccess: string;
  /**
   * colorInteractiveSuccess while pressed.
   * @figma none; the `*Active` map token (palette slot 7) for DDS Interactive/Success
   * @default colorSuccessActive, i.e. palette.digitalGreen[400] = #1B7F50
   * @interim pending design: DDS defines no pressed state.
   */
  colorInteractiveSuccessPressed: string;
  /**
   * Color of a warning interactive element.
   * @figma DDS interactive page, Warning swatch (no variable)
   * @default colorWarning, i.e. palette.digitalYellow[300] = #F7C926
   * @interim pending design: DDS has a Warning swatch but no variable.
   */
  colorInteractiveWarning: string;
  /**
   * colorInteractiveWarning while pressed.
   * @figma none; the `*Active` map token (palette slot 7) for the DDS Warning swatch
   * @default colorWarningActive, i.e. palette.digitalYellow[400] = #BF9B1D
   * @interim pending design: DDS defines no pressed state.
   */
  colorInteractiveWarningPressed: string;
  /**
   * Color of an error interactive element.
   * @figma DDS interactive page, Error swatch (no variable)
   * @default colorError, i.e. palette.digitalCerise[300] = #D40C74
   * @interim pending design: DDS has an Error swatch but no variable.
   */
  colorInteractiveError: string;
  /**
   * colorInteractiveError while pressed.
   * @figma none; the `*Active` map token (palette slot 7) for the DDS Error swatch
   * @default colorErrorActive, i.e. palette.digitalCerise[400] = #A4095A
   * @interim pending design: DDS defines no pressed state.
   */
  colorInteractiveErrorPressed: string;
  /**
   * Fill of any disabled interactive element, whatever its role. Pair it with
   * colorTextDisabled for the label.
   * @figma none; derived from neutral tokens
   * @default colorBgContainerDisabled, i.e. palette.digitalCharcoal[50] = #F5F5F6
   * @interim pending design: DDS defines no disabled state.
   */
  colorInteractiveDisabled: string;
}

/**
 * Semantic typography tokens: Qi `AIA Typography` values that have no reference-model name,
 * such as the headline font. Names follow the Qi path (docs/specs/theme-parity.md, D7):
 * the style property, then Qi's words, without the `Mobile` and `default` segments.
 * Each one reads a Qi value; overriding one applies it exactly, and nothing derives from it.
 */
export interface SemanticTypographyToken {
  /**
   * Font family of headings: one family name, exactly as the app registers the font. AIA
   * Everest is licensed; without it, headings fall back to the system font.
   * @figma Qi AIA Typography/Family/headline
   * @default typography.family.headline = AIA Everest
   * @interim pending design: the name the health app registers is not confirmed yet.
   */
  fontFamilyHeadline: string;
  /**
   * Weight of headings.
   * @figma Qi AIA Typography/Weight/headline/default (medium)
   * @default typography.weight.headline = 500
   */
  fontWeightHeadline: FontWeight;
  /**
   * Weight of a light heading.
   * @figma Qi AIA Typography/Weight/headline/thin (regular)
   * @default typography.weight.headlineThin = 400
   */
  fontWeightHeadlineThin: FontWeight;
  /**
   * Weight of body text.
   * @figma Qi AIA Typography/Weight/body/default (regular)
   * @default typography.weight.body = 400
   */
  fontWeightBody: FontWeight;
  /**
   * Weight of strongly emphasized body text, one step above `fontWeightStrong`. The name
   * keeps Qi's `strong2` so it traces back to the Qi path `Weight/body/strong2`.
   * @figma Qi AIA Typography/Weight/body/strong2 (bold)
   * @default typography.weight.bodyStrong2 = 700
   */
  fontWeightBodyStrong2: FontWeight;
  /**
   * The smallest body text, such as a legal footnote.
   * @figma Qi AIA Typography/Size/body4
   * @default typography.size.body4 = 10
   */
  fontSizeBody4: number;
  /**
   * Line height of `fontSizeBody4` text as a ratio of the size.
   * @figma Qi AIA Typography/Line height/body4 ÷ Size/body4
   * @default 14 / 10
   */
  lineHeightBody4: number;
  /**
   * Line height of `fontSizeXL` text (Qi headline6) as a ratio of the size.
   * @figma Qi AIA Typography/Line height/Mobile/headline6 ÷ Size/Mobile/headline6
   * @default 24 / 18
   */
  lineHeightHeadline6: number;
  /**
   * Letter spacing of body text, in dp.
   * @figma Qi AIA Typography/Letter spacing/body
   * @default typography.letterSpacing.body = 0
   */
  letterSpacingBody: number;
  /**
   * Letter spacing of heading level 1, in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline1
   * @default typography.letterSpacing.headline1 = -0.5
   */
  letterSpacingHeadline1: number;
  /**
   * Letter spacing of heading level 2, in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline2
   * @default typography.letterSpacing.headline2 = 0
   */
  letterSpacingHeadline2: number;
  /**
   * Letter spacing of heading level 3, in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline3
   * @default typography.letterSpacing.headline3 = 0
   */
  letterSpacingHeadline3: number;
  /**
   * Letter spacing of heading level 4, in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline4
   * @default typography.letterSpacing.headline4 = 0
   */
  letterSpacingHeadline4: number;
  /**
   * Letter spacing of heading level 5, in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline5
   * @default typography.letterSpacing.headline5 = 0
   */
  letterSpacingHeadline5: number;
  /**
   * Letter spacing of `fontSizeXL` text (Qi headline6), in dp.
   * @figma Qi AIA Typography/Letter spacing/Mobile/headline6
   * @default typography.letterSpacing.headline6 = 0
   */
  letterSpacingHeadline6: number;
}

/**
 * App-defined tokens. Add yours by module augmentation; names must not shadow library tokens.
 *
 * @example
 * declare module '@au-aia/mobile-core-ui' {
 *   interface CustomToken {
 *     colorBrandAccent: string;
 *   }
 * }
 */
export interface CustomToken {}

/**
 * Every resolved token: alias (which includes seed and map), semantic, and custom tokens.
 * This is what `theme.useToken()` and `theme.getDesignToken()` return.
 */
export interface GlobalToken
  extends
    AliasToken,
    SemanticColorToken,
    SemanticTypographyToken,
    CustomToken {}
