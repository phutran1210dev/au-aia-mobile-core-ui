/**
 * Public token interfaces. Names in Seed, Map and Alias come from antd; names in Semantic
 * come from DDS `Interactive/*`. Values come from Qi tokens – AIA (node 102-2817).
 * Hex values in `@default` were copied from Figma; docs/tokens.md lists every token.
 */

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
   * Base text color. Overriding it regenerates the colorText* tokens as antd does
   * (alpha 0.88, 0.65, 0.45, 0.25 of this color).
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-600 (DDS Primary/Charcoal/100)
   * @default palette.digitalCharcoal[600] = #333D47
   */
  colorTextBase: string;
  /**
   * Base background color. Overriding it regenerates colorBgContainer, colorBgLayout,
   * colorBorder and colorBorderSecondary as antd does (darkened by 0, 4, 15 and 6).
   * @figma Qi Monotone/monotone-white
   * @default palette.monotone.white = #FFFFFF
   */
  colorBgBase: string;
}

/**
 * Map tokens: antd's MapToken names and meanings. Defaults are hand-mapped Qi steps;
 * an overridden seed regenerates its family with `generatePalette`.
 *
 * antd's `*Hover` tokens are kept for compatibility. React Native has no hover, so
 * components use the semantic Pressed tokens, which reference the `*Active` tokens.
 */
export interface MapToken extends SeedToken {
  // Primary: Digital red, ten steps; slot n = step n. Text* reuse slots 5-7, as in antd.

  /**
   * Lightest primary tint, for the background of a primary-tinted area.
   * @figma Qi Primary/Digital red/digitalred-50
   * @default palette.digitalRed[50] = #FFEDF1
   */
  colorPrimaryBg: string;
  /**
   * colorPrimaryBg under hover. antd compatibility only.
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
   * colorPrimaryBorder under hover. antd compatibility only.
   * @figma Qi Primary/Digital red/digitalred-300
   * @default palette.digitalRed[300] = #E84671
   */
  colorPrimaryBorderHover: string;
  /**
   * colorPrimary under hover. antd compatibility only.
   * @figma Qi Primary/Digital red/digitalred-400
   * @default palette.digitalRed[400] = #E32155
   */
  colorPrimaryHover: string;
  /**
   * colorPrimary while pressed (antd's active state).
   * @figma Qi Primary/Digital red/digitalred-600
   * @default palette.digitalRed[600] = #B30635
   */
  colorPrimaryActive: string;
  /**
   * colorPrimaryText under hover. antd compatibility only.
   * @figma Qi Primary/Digital red/digitalred-400
   * @default palette.digitalRed[400] = #E32155 (slot 5, as in antd)
   */
  colorPrimaryTextHover: string;
  /**
   * Text in the primary family, such as a link-style label.
   * @figma Qi Primary/Digital red/digitalred-500
   * @default palette.digitalRed[500] = #E00842 (slot 6, as in antd)
   */
  colorPrimaryText: string;
  /**
   * colorPrimaryText while pressed.
   * @figma Qi Primary/Digital red/digitalred-600
   * @default palette.digitalRed[600] = #B30635 (slot 7, as in antd)
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
   * colorSuccessBg under hover. antd compatibility only.
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
   * colorSuccessBorder under hover. antd compatibility only.
   * @figma Qi Semantic/Digital green/digitalgreen-200
   * @default palette.digitalGreen[200] = #64BC93
   */
  colorSuccessBorderHover: string;
  /**
   * colorSuccess under hover (slot 4, as in antd). antd compatibility only.
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
   * colorSuccessText under hover. antd compatibility only.
   * @figma Qi Semantic/Digital green/digitalgreen-200
   * @default palette.digitalGreen[200] = #64BC93 (slot 5, as in antd)
   */
  colorSuccessTextHover: string;
  /**
   * Text in the success family.
   * @figma Qi Semantic/Digital green/digitalgreen-300
   * @default palette.digitalGreen[300] = #229F64 (slot 6, as in antd)
   */
  colorSuccessText: string;
  /**
   * colorSuccessText while pressed.
   * @figma Qi Semantic/Digital green/digitalgreen-400
   * @default palette.digitalGreen[400] = #1B7F50 (slot 7, as in antd)
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
   * colorWarningBg under hover. antd compatibility only.
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
   * colorWarningBorder under hover. antd compatibility only.
   * @figma Qi Semantic/Digital yellow/digitalyellow-200
   * @default palette.digitalYellow[200] = #F9D864
   */
  colorWarningBorderHover: string;
  /**
   * colorWarning under hover (slot 4, as in antd). antd compatibility only.
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
   * colorWarningText under hover. antd compatibility only.
   * @figma Qi Semantic/Digital yellow/digitalyellow-200
   * @default palette.digitalYellow[200] = #F9D864 (slot 5, as in antd)
   */
  colorWarningTextHover: string;
  /**
   * Text in the warning family.
   * @figma Qi Semantic/Digital yellow/digitalyellow-300
   * @default palette.digitalYellow[300] = #F7C926 (slot 6, as in antd)
   */
  colorWarningText: string;
  /**
   * colorWarningText while pressed.
   * @figma Qi Semantic/Digital yellow/digitalyellow-400
   * @default palette.digitalYellow[400] = #BF9B1D (slot 7, as in antd)
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
   * colorErrorBg under hover. antd compatibility only.
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
   * colorErrorBorder under hover. antd compatibility only.
   * @figma Qi Semantic/Digital cerise/digitalcerise-200
   * @default palette.digitalCerise[200] = #E0519B
   */
  colorErrorBorderHover: string;
  /**
   * colorError under hover (slot 5, as in antd). antd compatibility only.
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
   * colorErrorText under hover. antd compatibility only.
   * @figma Qi Semantic/Digital cerise/digitalcerise-200
   * @default palette.digitalCerise[200] = #E0519B (slot 5, as in antd)
   */
  colorErrorTextHover: string;
  /**
   * Text in the error family, such as a field's error message.
   * @figma Qi Semantic/Digital cerise/digitalcerise-300
   * @default palette.digitalCerise[300] = #D40C74 (slot 6, as in antd)
   */
  colorErrorText: string;
  /**
   * colorErrorText while pressed.
   * @figma Qi Semantic/Digital cerise/digitalcerise-400
   * @default palette.digitalCerise[400] = #A4095A (slot 7, as in antd)
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
   * colorInfoBg under hover. antd compatibility only.
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
   * colorInfoBorder under hover. antd compatibility only.
   * @figma Qi Semantic/Digital blue/digitalblue-200
   * @default palette.digitalBlue[200] = #3D8ADB
   */
  colorInfoBorderHover: string;
  /**
   * colorInfo under hover (slot 4, as in antd). antd compatibility only.
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
   * colorInfoText under hover. antd compatibility only.
   * @figma Qi Semantic/Digital blue/digitalblue-200
   * @default palette.digitalBlue[200] = #3D8ADB (slot 5, as in antd)
   */
  colorInfoTextHover: string;
  /**
   * Text in the info family.
   * @figma Qi Semantic/Digital blue/digitalblue-300
   * @default palette.digitalBlue[300] = #0C6DD2 (slot 6, as in antd)
   */
  colorInfoText: string;
  /**
   * colorInfoText while pressed.
   * @figma Qi Semantic/Digital blue/digitalblue-400
   * @default palette.digitalBlue[400] = #0A57A8 (slot 7, as in antd)
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
}

/**
 * Alias tokens: antd's AliasToken names and meanings, derived from map tokens the way antd
 * derives them. They re-resolve when the map token they reference is overridden.
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
   * Icon color under hover. antd compatibility only.
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
   * controlItemBgActive under hover. antd compatibility only.
   * @figma Qi Primary/Digital red/digitalred-100
   * @default colorPrimaryBgHover, i.e. palette.digitalRed[100] = #FADAE3
   */
  controlItemBgActiveHover: string;
  /**
   * Background of a disabled container, such as a disabled input.
   * Deviation: antd derives it from colorFillTertiary, a fill token this library does not
   * define yet, so it references colorBgLayout, the closest Figma value.
   * @figma Qi Primary/Digital charcoal/digitalcharcoal-50
   * @default colorBgLayout, i.e. palette.digitalCharcoal[50] = #F5F5F6
   * @interim pending design: no disabled color in DDS.
   */
  colorBgContainerDisabled: string;
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
   * @figma none; derived antd-style from DDS Interactive/Actionable
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
   * @figma none; derived antd-style from DDS Interactive/Informative
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
   * @figma none; derived antd-style from DDS Interactive/Success
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
   * @figma none; derived antd-style from the DDS Warning swatch
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
   * @figma none; derived antd-style from the DDS Error swatch
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
  extends AliasToken, SemanticColorToken, CustomToken {}
