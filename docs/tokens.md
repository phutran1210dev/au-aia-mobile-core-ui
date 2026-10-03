# Design tokens

This page lists every public token of `@au-aia/mobile-core-ui`: its code name, the Figma source of its default, the default value, and what it references. Read it with `GLOSSARY.md` for the terms and `.claude/rules/tokens-naming.md` for the rules. [Prior art](#prior-art) credits the token model this library follows, and [docs/specs/theme-parity.md](specs/theme-parity.md) tracks which of its tokens exist yet.

All values were read from Figma with the Figma MCP on 2026-10-03:

- **Qi**: [Qi tokens – AIA](https://www.figma.com/design/HxDGXJYqeMwdxg0pJNyrQf/Qi-tokens-%E2%80%93-AIA?node-id=102-2817&m=dev), node 102-2817, "AIA primitives colours", and its `AIA Typography` variable collection (mode `EN`). Source of truth for palette values, family names and typography.
- **DDS**: [DDS AU v2.0.11](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=15329-57416&m=dev), interactive node 15329-57416. Source of the interactive roles.

Tokens marked _interim_ carry `@interim pending design` in their JSDoc. Their names stay stable; only their references may change once design decides. See [Open questions for design](#open-questions-for-design).

## How the layers fit together

| Layer      | Public | Names from      | Default comes from                                                |
| ---------- | ------ | --------------- | ----------------------------------------------------------------- |
| Palette    | No     | Qi              | Raw Qi hex                                                        |
| Typography | No     | Qi              | Raw Qi `AIA Typography` values                                    |
| Seed       | Yes    | Reference model | A palette step, a Qi typography value, or the reference default   |
| Map        | Yes    | Reference model | Hand-mapped Figma values; the algorithm on override               |
| Alias      | Yes    | Reference model | A reference to a map token                                        |
| Semantic   | Yes    | DDS, Qi         | A reference to a map or alias token, a palette step or a Qi value |

With no overrides, every token equals its Figma value below; a token Figma does not define takes the reference model's default. Overriding a seed regenerates what derives from it with the derivation algorithm. Overriding a map, alias or semantic token sets that exact value, and every token that references it follows.

## Seed tokens

| Code name       | Figma source                                             | Default   | References                     |
| --------------- | -------------------------------------------------------- | --------- | ------------------------------ |
| `colorPrimary`  | DDS `Interactive/Actionable`; Qi `digitalred-500`        | `#E00842` | `palette.digitalRed[500]`      |
| `colorSuccess`  | DDS `Interactive/Success`; Qi `digitalgreen-300`         | `#229F64` | `palette.digitalGreen[300]`    |
| `colorWarning`  | DDS Warning swatch (no variable); Qi `digitalyellow-300` | `#F7C926` | `palette.digitalYellow[300]`   |
| `colorError`    | DDS Error swatch (no variable); Qi `digitalcerise-300`   | `#D40C74` | `palette.digitalCerise[300]`   |
| `colorInfo`     | DDS `Interactive/Informative`; Qi `digitalblue-300`      | `#0C6DD2` | `palette.digitalBlue[300]`     |
| `colorTextBase` | Qi `digitalcharcoal-600` (DDS `Primary/Charcoal/100`)    | `#333D47` | `palette.digitalCharcoal[600]` |
| `colorBgBase`   | Qi `monotone-white`                                      | `#FFFFFF` | `palette.monotone.white`       |

`colorPrimary` is interim: two DDS nodes use `#D31145` for `Primary/Red/100`. There is no `colorSecondary` seed; the secondary families stay in the palette.

## Map tokens

### Palette slots

Each seeded family has ten palette slots, lightest first, with the seed color in slot 6. Map tokens read slots 1 to 7, through this slot table:

| Slot | Token suffix                                      |
| ---- | ------------------------------------------------- |
| 1    | `Bg`                                              |
| 2    | `BgHover`                                         |
| 3    | `Border`                                          |
| 4    | `BorderHover`; `Hover` for Success, Warning, Info |
| 5    | `Hover` for Primary and Error; `TextHover`        |
| 6    | the seed itself; `Text`                           |
| 7    | `Active` (pressed); `TextActive`                  |

The default theme fills the slots with Qi steps:

- **Ten-step family** (Digital red): slot n is step n, so map tokens use steps 50 to 600. Steps 700 to 900 stay in the palette only.
- **Seven-step families** (green, yellow, cerise, blue): slots 1 to 7 are steps 50, 100, 100, 200, 200, 300, 400. Steps 500 and 600 stay in the palette only.

An overridden seed fills slot n with color n of `generatePalette(seed)`, and tests check the result against the reference model. `*Hover` tokens exist for API parity. Touch screens have no hover, so components use the semantic Pressed tokens, which reference the `*Active` tokens.

### Primary (Digital red)

| Code name                 | Figma path (Qi)                      | Default   |
| ------------------------- | ------------------------------------ | --------- |
| `colorPrimaryBg`          | `Primary/Digital red/digitalred-50`  | `#FFEDF1` |
| `colorPrimaryBgHover`     | `Primary/Digital red/digitalred-100` | `#FADAE3` |
| `colorPrimaryBorder`      | `Primary/Digital red/digitalred-200` | `#EC6B8E` |
| `colorPrimaryBorderHover` | `Primary/Digital red/digitalred-300` | `#E84671` |
| `colorPrimaryHover`       | `Primary/Digital red/digitalred-400` | `#E32155` |
| `colorPrimaryActive`      | `Primary/Digital red/digitalred-600` | `#B30635` |
| `colorPrimaryTextHover`   | `Primary/Digital red/digitalred-400` | `#E32155` |
| `colorPrimaryText`        | `Primary/Digital red/digitalred-500` | `#E00842` |
| `colorPrimaryTextActive`  | `Primary/Digital red/digitalred-600` | `#B30635` |

### Success (Digital green)

| Code name                 | Figma path (Qi)                           | Default   |
| ------------------------- | ----------------------------------------- | --------- |
| `colorSuccessBg`          | `Semantic/Digital green/digitalgreen-50`  | `#E9F5F0` |
| `colorSuccessBgHover`     | `Semantic/Digital green/digitalgreen-100` | `#A7D9C1` |
| `colorSuccessBorder`      | `Semantic/Digital green/digitalgreen-100` | `#A7D9C1` |
| `colorSuccessBorderHover` | `Semantic/Digital green/digitalgreen-200` | `#64BC93` |
| `colorSuccessHover`       | `Semantic/Digital green/digitalgreen-200` | `#64BC93` |
| `colorSuccessActive`      | `Semantic/Digital green/digitalgreen-400` | `#1B7F50` |
| `colorSuccessTextHover`   | `Semantic/Digital green/digitalgreen-200` | `#64BC93` |
| `colorSuccessText`        | `Semantic/Digital green/digitalgreen-300` | `#229F64` |
| `colorSuccessTextActive`  | `Semantic/Digital green/digitalgreen-400` | `#1B7F50` |

### Warning (Digital yellow)

| Code name                 | Figma path (Qi)                             | Default   |
| ------------------------- | ------------------------------------------- | --------- |
| `colorWarningBg`          | `Semantic/Digital yellow/digitalyellow-50`  | `#FEF7DF` |
| `colorWarningBgHover`     | `Semantic/Digital yellow/digitalyellow-100` | `#FCE8A1` |
| `colorWarningBorder`      | `Semantic/Digital yellow/digitalyellow-100` | `#FCE8A1` |
| `colorWarningBorderHover` | `Semantic/Digital yellow/digitalyellow-200` | `#F9D864` |
| `colorWarningHover`       | `Semantic/Digital yellow/digitalyellow-200` | `#F9D864` |
| `colorWarningActive`      | `Semantic/Digital yellow/digitalyellow-400` | `#BF9B1D` |
| `colorWarningTextHover`   | `Semantic/Digital yellow/digitalyellow-200` | `#F9D864` |
| `colorWarningText`        | `Semantic/Digital yellow/digitalyellow-300` | `#F7C926` |
| `colorWarningTextActive`  | `Semantic/Digital yellow/digitalyellow-400` | `#BF9B1D` |

### Error (Digital cerise)

| Code name               | Figma path (Qi)                             | Default   |
| ----------------------- | ------------------------------------------- | --------- |
| `colorErrorBg`          | `Semantic/Digital cerise/digitalcerise-50`  | `#FBE7F1` |
| `colorErrorBgHover`     | `Semantic/Digital cerise/digitalcerise-100` | `#EC96C3` |
| `colorErrorBorder`      | `Semantic/Digital cerise/digitalcerise-100` | `#EC96C3` |
| `colorErrorBorderHover` | `Semantic/Digital cerise/digitalcerise-200` | `#E0519B` |
| `colorErrorHover`       | `Semantic/Digital cerise/digitalcerise-200` | `#E0519B` |
| `colorErrorActive`      | `Semantic/Digital cerise/digitalcerise-400` | `#A4095A` |
| `colorErrorTextHover`   | `Semantic/Digital cerise/digitalcerise-200` | `#E0519B` |
| `colorErrorText`        | `Semantic/Digital cerise/digitalcerise-300` | `#D40C74` |
| `colorErrorTextActive`  | `Semantic/Digital cerise/digitalcerise-400` | `#A4095A` |

### Info (Digital blue)

| Code name              | Figma path (Qi)                         | Default   |
| ---------------------- | --------------------------------------- | --------- |
| `colorInfoBg`          | `Semantic/Digital blue/digitalblue-50`  | `#E7F0FB` |
| `colorInfoBgHover`     | `Semantic/Digital blue/digitalblue-100` | `#9EC5ED` |
| `colorInfoBorder`      | `Semantic/Digital blue/digitalblue-100` | `#9EC5ED` |
| `colorInfoBorderHover` | `Semantic/Digital blue/digitalblue-200` | `#3D8ADB` |
| `colorInfoHover`       | `Semantic/Digital blue/digitalblue-200` | `#3D8ADB` |
| `colorInfoActive`      | `Semantic/Digital blue/digitalblue-400` | `#0A57A8` |
| `colorInfoTextHover`   | `Semantic/Digital blue/digitalblue-200` | `#3D8ADB` |
| `colorInfoText`        | `Semantic/Digital blue/digitalblue-300` | `#0C6DD2` |
| `colorInfoTextActive`  | `Semantic/Digital blue/digitalblue-400` | `#0A57A8` |

### Neutrals (Digital charcoal)

| Code name              | Figma path (Qi)                                | Default     | Regenerated from (on override) |
| ---------------------- | ---------------------------------------------- | ----------- | ------------------------------ |
| `colorText`            | `Primary/Digital charcoal/digitalcharcoal-600` | `#333D47`   | `colorTextBase` at alpha 0.88  |
| `colorTextSecondary`   | `Primary/Digital charcoal/digitalcharcoal-500` | `#666E75`   | `colorTextBase` at alpha 0.65  |
| `colorTextTertiary`    | `Primary/Digital charcoal/digitalcharcoal-400` | `#858B91`   | `colorTextBase` at alpha 0.45  |
| `colorTextQuaternary`  | `Primary/Digital charcoal/digitalcharcoal-300` | `#ADB1B5`   | `colorTextBase` at alpha 0.25  |
| `colorBorder`          | `Primary/Digital charcoal/digitalcharcoal-200` | `#D6D8DA`   | `colorBgBase` darkened by 15   |
| `colorBorderSecondary` | `Primary/Digital charcoal/digitalcharcoal-100` | `#EBECED`   | `colorBgBase` darkened by 6    |
| `colorBgLayout`        | `Primary/Digital charcoal/digitalcharcoal-50`  | `#F5F5F6`   | `colorBgBase` darkened by 4    |
| `colorBgContainer`     | `Monotone/monotone-white`                      | `#FFFFFF`   | `colorBgBase`                  |
| `colorBgMask`          | `Alpha/digitalcharcoal-900a50`                 | `#14181C80` | fixed                          |
| `colorWhite`           | `Monotone/monotone-white`                      | `#FFFFFF`   | fixed                          |

## Alias tokens

| Code name                  | Figma path (Qi)       | Default   | References                |
| -------------------------- | --------------------- | --------- | ------------------------- |
| `colorTextDisabled`        | `digitalcharcoal-300` | `#ADB1B5` | `colorTextQuaternary`     |
| `colorTextPlaceholder`     | `digitalcharcoal-300` | `#ADB1B5` | `colorTextQuaternary`     |
| `colorTextHeading`         | `digitalcharcoal-600` | `#333D47` | `colorText`               |
| `colorTextLabel`           | `digitalcharcoal-500` | `#666E75` | `colorTextSecondary`      |
| `colorTextDescription`     | `digitalcharcoal-400` | `#858B91` | `colorTextTertiary`       |
| `colorTextLightSolid`      | `monotone-white`      | `#FFFFFF` | `colorWhite`              |
| `colorIcon`                | `digitalcharcoal-400` | `#858B91` | `colorTextTertiary`       |
| `colorIconHover`           | `digitalcharcoal-600` | `#333D47` | `colorText`               |
| `colorBorderBg`            | `monotone-white`      | `#FFFFFF` | `colorBgContainer`        |
| `controlItemBgActive`      | `digitalred-50`       | `#FFEDF1` | `colorPrimaryBg`          |
| `controlItemBgActiveHover` | `digitalred-100`      | `#FADAE3` | `colorPrimaryBgHover`     |
| `colorBgContainerDisabled` | `digitalcharcoal-50`  | `#F5F5F6` | `colorBgLayout` (interim) |

## Semantic tokens

Every semantic token is interim (Checkpoint 2, decision 1): Qi has no semantic token names, so the names come from DDS `Interactive/*`. Pressed and disabled follow the reference model's derivation, because DDS defines no interaction states.

| Code name                            | Figma path                       | Default   | References                     |
| ------------------------------------ | -------------------------------- | --------- | ------------------------------ |
| `colorInteractiveActionable`         | DDS `Interactive/Actionable`     | `#E00842` | `colorPrimary`                 |
| `colorInteractiveActionablePressed`  | none (derived)                   | `#B30635` | `colorPrimaryActive`           |
| `colorInteractiveHighlighted`        | DDS `Interactive/highlighted`    | `#082065` | `palette.digitalNavyBlue[500]` |
| `colorInteractiveInformative`        | DDS `Interactive/Informative`    | `#0C6DD2` | `colorInfo`                    |
| `colorInteractiveInformativePressed` | none (derived)                   | `#0A57A8` | `colorInfoActive`              |
| `colorInteractiveSuccess`            | DDS `Interactive/Success`        | `#229F64` | `colorSuccess`                 |
| `colorInteractiveSuccessPressed`     | none (derived)                   | `#1B7F50` | `colorSuccessActive`           |
| `colorInteractiveWarning`            | DDS Warning swatch (no variable) | `#F7C926` | `colorWarning`                 |
| `colorInteractiveWarningPressed`     | none (derived)                   | `#BF9B1D` | `colorWarningActive`           |
| `colorInteractiveError`              | DDS Error swatch (no variable)   | `#D40C74` | `colorError`                   |
| `colorInteractiveErrorPressed`       | none (derived)                   | `#A4095A` | `colorErrorActive`             |
| `colorInteractiveDisabled`           | none (derived)                   | `#F5F5F6` | `colorBgContainerDisabled`     |

`colorInteractiveHighlighted` is not the selected state. There is no selected or focused token yet.

## Typography tokens

Qi's `AIA Typography` collection holds the values, in mode `EN`. The library takes its body and Mobile headline variables; Desktop sizes stay out. Line heights are ratios of their font size, as in the reference model, and `fontHeight*` hold the dp value React Native's `lineHeight` needs. For every size and ratio pair, `Math.round(size * ratio)` gives the Qi px back.

### Typography seed, map and alias tokens

| Code name            | Layer | Figma path (Qi `AIA Typography`)                         | Default                                  |
| -------------------- | ----- | -------------------------------------------------------- | ---------------------------------------- |
| `fontFamily`         | Seed  | `Family/body`                                            | `Open Sans`, interim                     |
| `fontSize`           | Seed  | `Size/body2`                                             | `14`                                     |
| `fontSizeSM`         | Map   | `Size/body3`                                             | `12`                                     |
| `fontSizeLG`         | Map   | `Size/body1`                                             | `16`                                     |
| `fontSizeXL`         | Map   | `Size/Mobile/headline6`                                  | `18`                                     |
| `fontSizeHeading1`   | Map   | `Size/Mobile/headline1`                                  | `32`                                     |
| `fontSizeHeading2`   | Map   | `Size/Mobile/headline2`                                  | `28`                                     |
| `fontSizeHeading3`   | Map   | `Size/Mobile/headline3`                                  | `24`                                     |
| `fontSizeHeading4`   | Map   | `Size/Mobile/headline4`                                  | `22`                                     |
| `fontSizeHeading5`   | Map   | `Size/Mobile/headline5`                                  | `20`                                     |
| `lineHeight`         | Map   | `Line height/body2` ÷ `Size/body2`                       | `20 / 14`                                |
| `lineHeightSM`       | Map   | `Line height/body3` ÷ `Size/body3`                       | `18 / 12`                                |
| `lineHeightLG`       | Map   | `Line height/body1` ÷ `Size/body1`                       | `24 / 16`                                |
| `lineHeightHeading1` | Map   | `Line height/Mobile/headline1` ÷ `Size/Mobile/headline1` | `40 / 32`                                |
| `lineHeightHeading2` | Map   | `Line height/Mobile/headline2` ÷ `Size/Mobile/headline2` | `36 / 28`                                |
| `lineHeightHeading3` | Map   | `Line height/Mobile/headline3` ÷ `Size/Mobile/headline3` | `32 / 24`                                |
| `lineHeightHeading4` | Map   | `Line height/Mobile/headline4` ÷ `Size/Mobile/headline4` | `30 / 22`                                |
| `lineHeightHeading5` | Map   | `Line height/Mobile/headline5` ÷ `Size/Mobile/headline5` | `26 / 20`                                |
| `fontHeight`         | Map   | `Line height/body2`                                      | `20`                                     |
| `fontHeightSM`       | Map   | `Line height/body3`                                      | `18`                                     |
| `fontHeightLG`       | Map   | `Line height/body1`                                      | `24`                                     |
| `fontWeightStrong`   | Alias | `Weight/body/strong1` (semibold)                         | `600`                                    |
| `fontFamilyCode`     | Seed  | none; a system monospace family                          | iOS `Menlo`, Android and web `monospace` |

Overriding `fontSize` regenerates the other sizes and line heights with the reference model's formula. The `fontHeight*` tokens follow overrides of their size or ratio, and an explicit `fontHeight*` override wins.

`fontFamily` and `fontFamilyHeadline` hold the family names the font files declare, `Open Sans` and `AIA Everest`. They stay interim until the health app confirms it registers the fonts under those names; [Fonts](#fonts) explains the registration.

### Semantic typography tokens

These Qi values have no reference-model name. Each name is the style property followed by Qi's words, without the `Mobile` and `default` segments.

| Code name                | Figma path (Qi `AIA Typography`)                         | Default                |
| ------------------------ | -------------------------------------------------------- | ---------------------- |
| `fontFamilyHeadline`     | `Family/headline`                                        | `AIA Everest`, interim |
| `fontWeightHeadline`     | `Weight/headline/default` (medium)                       | `500`                  |
| `fontWeightHeadlineThin` | `Weight/headline/thin` (regular)                         | `400`                  |
| `fontWeightBody`         | `Weight/body/default` (regular)                          | `400`                  |
| `fontWeightBodyStrong2`  | `Weight/body/strong2` (bold)                             | `700`                  |
| `fontSizeBody4`          | `Size/body4`                                             | `10`                   |
| `lineHeightBody4`        | `Line height/body4` ÷ `Size/body4`                       | `14 / 10`              |
| `lineHeightHeadline6`    | `Line height/Mobile/headline6` ÷ `Size/Mobile/headline6` | `24 / 18`              |
| `letterSpacingBody`      | `Letter spacing/body`                                    | `0`                    |
| `letterSpacingHeadline1` | `Letter spacing/Mobile/headline1`                        | `-0.5`                 |
| `letterSpacingHeadline2` | `Letter spacing/Mobile/headline2`                        | `0`                    |
| `letterSpacingHeadline3` | `Letter spacing/Mobile/headline3`                        | `0`                    |
| `letterSpacingHeadline4` | `Letter spacing/Mobile/headline4`                        | `0`                    |
| `letterSpacingHeadline5` | `Letter spacing/Mobile/headline5`                        | `0`                    |
| `letterSpacingHeadline6` | `Letter spacing/Mobile/headline6`                        | `0`                    |

`lineHeightHeadline6` and `letterSpacingHeadline6` pair with `fontSizeXL`, which holds Qi's headline6 size. Overriding `fontSize` leaves these tokens at their Qi values.

## Fonts

The library ships no font files: each app registers the fonts itself. The typography tokens expect these family names:

| Token                | Family name            | Faces to register                                        |
| -------------------- | ---------------------- | -------------------------------------------------------- |
| `fontFamily`         | `Open Sans`, interim   | Light (300) to ExtraBold (800), each with its italic     |
| `fontFamilyHeadline` | `AIA Everest`, interim | Regular (400), Medium (500), Bold (700), ExtraBold (800) |
| `fontFamilyCode`     | a system family        | none                                                     |

Register every face of a family under one family name. One `fontFamily` value plus `fontWeight` then picks the right file on both platforms:

- **iOS**: add the files to the app target and list them under `UIAppFonts` in `Info.plist`. iOS groups the faces by the family name inside the files.
- **Android**: describe the family in a font XML resource in `res/font`, with `app:fontWeight` and `app:fontStyle` for each file, and register it in `MainApplication.onCreate` with `ReactFontManager.getInstance().addCustomFont(this, "Open Sans", R.font.open_sans)`, imported from `com.facebook.react.common.assets`. React Native then picks the face with `Typeface.create(family, weight, italic)` on Android 9 (API 28) and later. Earlier versions only have regular and bold.
- **Bare React Native**: list the font folders under `assets` in `react-native.config.js` and run `npx @callstack/react-native-asset@3.1.0`. It writes the iOS entries, the Android font XML and the `addCustomFont` call. The example app links Open Sans this way.
- **Expo**: use the `expo-font` config plugin. On Android, its object syntax takes a `fontFamily` and `fontDefinitions` with a `weight` for each file.

Two faces with the same family name and weight make the choice ambiguous, so register only the faces above: AIA Everest Condensed reports the family `AIA Everest` and weights 400 and 500 too. Naming each file after its PostScript name, such as `OpenSans-SemiBold.ttf`, keeps iOS and Android in step.

AIA Everest has no 600 face, so `fontWeight: 600` draws Medium (500). An app that registers a family under another name sets `fontFamily` or `fontFamilyHeadline` through `ConfigProvider`. A family the app has not registered falls back to the system font; iOS logs it, Android does not.

## Motion tokens

Figma defines no motion, so every value is the reference model's default, in ms instead of seconds. Curves are `[x1, y1, x2, y2]` arrays for `Easing.bezier(...curve)`.

| Code name             | Layer | Default                      | Derived from                  |
| --------------------- | ----- | ---------------------------- | ----------------------------- |
| `motion`              | Seed  | `true`                       |                               |
| `motionUnit`          | Seed  | `100`                        |                               |
| `motionBase`          | Seed  | `0`                          |                               |
| `motionDurationFast`  | Map   | `100`                        | `motionBase + motionUnit`     |
| `motionDurationMid`   | Map   | `200`                        | `motionBase + 2 × motionUnit` |
| `motionDurationSlow`  | Map   | `300`                        | `motionBase + 3 × motionUnit` |
| `motionEaseInBack`    | Seed  | `[0.71, -0.46, 0.88, 0.6]`   |                               |
| `motionEaseInOut`     | Seed  | `[0.645, 0.045, 0.355, 1]`   |                               |
| `motionEaseInOutCirc` | Seed  | `[0.78, 0.14, 0.15, 0.86]`   |                               |
| `motionEaseInQuint`   | Seed  | `[0.755, 0.05, 0.855, 0.06]` |                               |
| `motionEaseOut`       | Seed  | `[0.215, 0.61, 0.355, 1]`    |                               |
| `motionEaseOutBack`   | Seed  | `[0.12, 0.4, 0.29, 1.46]`    |                               |
| `motionEaseOutCirc`   | Seed  | `[0.08, 0.82, 0.17, 1]`      |                               |
| `motionEaseOutQuint`  | Seed  | `[0.23, 1, 0.32, 1]`         |                               |

`motion: false` sets the three durations to 0 after the algorithm runs. An explicit duration override still applies, as in the reference model.

## Line, layer and opacity tokens

Figma defines none of these, so each takes the reference model's default.

| Code name         | Layer | Default   | Derived from    |
| ----------------- | ----- | --------- | --------------- |
| `lineWidth`       | Seed  | `1`       |                 |
| `lineType`        | Seed  | `'solid'` |                 |
| `lineWidthBold`   | Map   | `2`       | `lineWidth + 1` |
| `zIndexBase`      | Seed  | `0`       |                 |
| `zIndexPopupBase` | Seed  | `1000`    |                 |
| `opacityImage`    | Seed  | `1`       |                 |
| `focusOutline`    | Seed  | `true`    |                 |

## Component tokens (experimental)

`theme.components.<Name>` overrides apply to one component's token, and a component reads that token through `createStyles(factory, { component: '<Name>' })`.

- The `component` option is **experimental** (`@experimental` in JSDoc): it may change while the UI kit takes shape.
- `algorithm: false` (the default) applies the component's keys exactly; alias and semantic tokens that reference them re-resolve.
- `algorithm: true` re-runs the theme's algorithm with the component's seeds, so the family is regenerated.

## Palette (internal)

The palette is internal: apps and components never read it (hard rule 4). Keys are `palette.<family>[<step>]`, with Qi's family names in lowerCamelCase. Each cell shows the Qi hex, then the DDS label where DDS has one.

| Family (Qi group)             | 50            | 100           | 200           | 300            | 400            | 500            | 600            | 700            | 800            | 900            |
| ----------------------------- | ------------- | ------------- | ------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
| `digitalCharcoal` (Primary)   | `#F5F5F6` 5%  | `#EBECED` 10% | `#D6D8DA` 20% | `#ADB1B5` 40%  | `#858B91` 60%  | `#666E75` 80%  | `#333D47` 100% | `#293139` 110% | `#1F252B` 120% | `#14181C` 130% |
| `digitalRed` (Primary)        | `#FFEDF1` 5%  | `#FADAE3`     | `#EC6B8E` 40% | `#E84671` 60%  | `#E32155` 80%  | `#E00842` 100% | `#B30635` 115% | `#860528` 130% | `#5A031A`      | `#2D020D`      |
| `digitalSalmon` (Secondary)   | `#FFE4E7`     | `#FFCFD3` 25% | `#FFBAC0` 75% | `#FF7A85` 100% | `#E26276`      | `#C64A67`      | `#982D4F` 125% |                |                |                |
| `digitalPurple` (Secondary)   | `#DEDDF7`     | `#BCBBEF` 25% | `#9B9AE6` 75% | `#7978DE`      | `#5856D6` 100% | `#4645AB`      | `#353480` 128% |                |                |                |
| `digitalWarmGrey` (Secondary) | `#E9E5E1`     | `#DED7D2` 25% | `#D3CAC3` 75% | `#97908B` 100% | `#79736F`      | `#5A5754` 140% | `#3C3A38`      |                |                |                |
| `digitalLavender` (Tertiary)  | `#E7E6F3`     | `#CFCDE7` 25% | `#B7B4DC` 75% | `#9F9BD0` 100% | `#8782C4`      | `#6C689D` 125% | `#514E76`      |                |                |                |
| `digitalOrange` (Tertiary)    | `#FFDFCC` 25% | `#FFBF99`     | `#FF9F66` 75% | `#FF7F33` 100% | `#FF5F00`      | `#CC4C00` 125% | `#993900`      |                |                |                |
| `digitalGold` (Tertiary)      | `#EFE9DB`     | `#DFD2B7`     | `#CEBC94`     | `#BEA570`      | `#AE8F4C`      | `#8B723D`      | `#68562E`      |                |                |                |
| `digitalNavyBlue` (Semantic)  | `#EBEDF3`     | `#DADEE8`     | `#C1C7D9`     | `#5E6E9B`      | `#1B3171`      | `#082065`      | `#061A51`      |                |                |                |
| `digitalGreen` (Semantic)     | `#E9F5F0`     | `#A7D9C1` 20% | `#64BC93` 50% | `#229F64` 100% | `#1B7F50`      | `#115032` 132% | `#0A301E`      |                |                |                |
| `digitalYellow` (Semantic)    | `#FEF7DF` 25% | `#FCE8A1`     | `#F9D864` 75% | `#F7C926` 100% | `#BF9B1D`      | `#866D15` 144% | `#4E400C`      |                |                |                |
| `digitalBlue` (Semantic)      | `#E7F0FB` 5%  | `#9EC5ED` 10% | `#3D8ADB` 50% | `#0C6DD2` 100% | `#0A57A8` 110% | `#063769` 120% | `#04213F` 130% |                |                |                |
| `digitalCerise` (Semantic)    | `#FBE7F1` 10% | `#EC96C3` 25% | `#E0519B` 75% | `#D40C74` 100% | `#A4095A`      | `#73073F` 112% | `#430425`      |                |                |                |
| `digitalLightGreen` (unknown) | `#F1F6E8`     | `#D4E3BB`     | `#A9C877`     | `#8DB549`      | `#70A31C`      | `#5A8216`      | `#436211`      |                |                |                |

- **Monotone**: `palette.monotone.white` `#FFFFFF`, `palette.monotone.black` `#000000`.
- **Alpha**: `palette.alpha.digitalCharcoal900a70` `#14181CB2`, `digitalCharcoal900a50` `#14181C80`, `digitalCharcoal900a08` `#14181C14`, `digitalCharcoal900a00` `#14181C00`, `monotoneBlacka15` `#00000026`, `monotoneWhitea15` `#FFFFFF26`, `monotoneWhitea00` `#FFFFFF00`.
- DDS marks steps deeper than 100% as web-only. The palette keeps them, because Qi defines them for every platform.

## Known Figma discrepancies

Six DDS variables hold a different hex from the label printed on their swatch. The labels match Qi, and Qi values win (Checkpoint 2, decision 4).

| DDS swatch label | DDS variable value | Label value (used) | Qi variable           |
| ---------------- | ------------------ | ------------------ | --------------------- |
| Red 80%          | `#E53061`          | `#E32155`          | `digitalred-400`      |
| Red 115%         | `#B30E3B`          | `#B30635`          | `digitalred-600`      |
| Charcoal 80%     | `#5B636B`          | `#666E75`          | `digitalcharcoal-500` |
| Yellow 25%       | `#FCE8A1`          | `#FEF7DF`          | `digitalyellow-50`    |
| Purple 128%      | `#37346C`          | `#353480`          | `digitalpurple-600`   |
| Green 132%       | `#406E3B`          | `#115032`          | `digitalgreen-500`    |

Other naming issues:

- Salmon's deepest swatch is labeled 125%, but its DDS variable is named `Salmon/130`. Its value is `#982D4F` (`digitalsalmon-600`).
- `Primary/Red/100` is `#E00842` in the DDS primary node but `#D31145` in the secondary and interactive nodes. `#E00842` is used.
- In Qi, the swatch layer `Alpha/monotone-white15` shows the variable `$monotone-whitea15`, and `Alpha/digitalcharcoal-900a00` is the only alpha variable without a `$` code syntax.

Typography differs between Qi and DDS text styles too. Qi values win:

| What                | Qi                                                 | DDS                                                                                     | Used                                    |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------- |
| Body letter spacing | `Letter spacing/body` is 0                         | Body styles use 0.1                                                                     | 0                                       |
| Body family name    | `Family/body` is `OpenSans`                        | Text styles name `Open Sans`                                                            | `Open Sans`, the name the font declares |
| Heading numbering   | Desktop `headline4` is 28/36, `headline5` is 24/32 | Desktop `Heading 4` is 24/32                                                            | Qi                                      |
| Weight binding      | none                                               | `EN/Desktop/Body/Body 2 Regular` binds `Typography/Weight/medium` (500) but renders 400 | unused                                  |

## Values dropped from the palette

These exist only in DDS, with no Qi step, so the palette leaves them out (Checkpoint 2, decision 5):

| DDS name           | Hex       | Where                       |
| ------------------ | --------- | --------------------------- |
| Red 20%            | `#F39CB3` | DDS primary node swatch     |
| `Primary/Blue/125` | `#175A82` | DDS variable with no swatch |

## Prior art

The seed, map and alias token model, the palette slots and the derivation algorithm follow [Ant Design's theme system](https://ant.design/docs/react/customize-theme#theme) and its [ConfigProvider](https://ant.design/components/config-provider#config); the rest of this page calls it the reference model. `generatePalette`, `generateFontTokens` and `utils/color.ts` port code from `@ant-design/colors`, `antd` and `@ant-design/fast-color` under the MIT License, and the notices stay in those files. Tests compare the output with the reference libraries through `src/theme/__fixtures__/reference.ts` and `src/theme/__fixtures__/defaults.ts`.

This library differs from the reference model in these ways:

- **`darken`**: `@ant-design/fast-color` passes the HSV saturation into an HSL conversion, which shifts tinted backgrounds even at `darken(0)`. This library darkens in HSL, as `@ctrl/tinycolor` does.
- **`colorBgContainerDisabled`**: it references `colorBgLayout`, because its source in the reference model, `colorFillTertiary`, is not defined yet.
- **Component overrides**: with `algorithm: false`, alias and semantic tokens that reference an overridden key re-resolve. The reference model applies component keys without re-resolving.
- **`componentSize`**: `'small' | 'medium' | 'large'`, where the reference model says `middle`.
- **Motion in ms**: `motionUnit`, `motionBase` and the `motionDuration*` tokens are numbers of ms, not seconds and `0.1s` strings, so `motionUnit` is `100`, not `0.1`.
- **Easing curves**: each `motionEase*` token is a `[x1, y1, x2, y2]` array for `Easing.bezier`, not a `cubic-bezier()` string.
- **Line heights**: the `lineHeight*` tokens stay ratios, as in the reference model, with Figma values. `fontHeight`, `fontHeightSM` and `fontHeightLG`, internal in the reference model, are public here, because React Native's `lineHeight` takes dp.
- **Font families**: `fontFamily` holds one family name, not a CSS font stack. `fontFamilyCode` is a system monospace family per platform: `Menlo` on iOS, `monospace` elsewhere.
- **`lineType`**: limited to React Native's `borderStyle` values, `solid`, `dashed` and `dotted`.
- **`fontWeightStrong`**: Qi's `Weight/body/strong1`, which equals the reference model's 600.
- **Not defined yet**: `colorFill*`, `colorBgElevated`, `colorBgSpotlight`, `colorBgSolid*`, `colorBgBlur`, `colorSplit`, `colorLink*`, `colorBorderDisabled`, `colorErrorBgActive`, `colorErrorBgFilledHover`, the radius, size, control-height, spacing and screen tokens, the shadows and the other alias tokens. [docs/specs/theme-parity.md](specs/theme-parity.md) plans each one.
- **Left out**: the preset colors and their palettes (they would make the palette public, against hard rule 4), `wireframe`, and the `cssVar` and `hashed` theme options, which only mean something with CSS.
- **No dark or compact algorithm**: Figma defines no dark values or compact sizes. `ThemeConfig['algorithm']` already accepts an array, ready for them.

## Open questions for design

1. **Semantic token names.** Qi has no semantic layer, so the names come from DDS `Interactive/*`. Will Qi publish semantic token names?
2. **Interaction states.** DDS defines no pressed, focused, disabled or selected colors. Pressed is the `*Active` map token (slot 7, such as `digitalred-600`), and disabled from neutral tokens (`digitalcharcoal-50` fill, `digitalcharcoal-300` text). Focused and selected are not defined.
3. **Brand red.** Is `Primary/Red/100` `#E00842` or `#D31145`?
4. **Highlight.** DDS calls AIA Blue `#0C6DD2` the highlight color, but `Interactive/highlighted` is navy `#082065`. Which is right, and is Highlighted the selected state?
5. **Warning and Error.** Both have swatches on the interactive page but no `Interactive/*` variables. Will they get variables?
6. **Digital light green.** Qi has variables but no swatch, so its palette group is unknown.
7. **Disabled container.** It borrows `colorBgLayout` because Figma defines no fill tokens, such as `colorFillTertiary`. Should there be fill tokens?
8. **Dark mode.** No dark values exist in Figma.
9. **Secondary seed.** There is no `colorSecondary` seed. Should one secondary family become a brand seed?
10. **Font names.** Does the health app register the fonts as the families `Open Sans` and `AIA Everest`, as [Fonts](#fonts) describes? The tokens use those names, interim until it does.
11. **Android 7 and 8.** Android before version 9 (API 28) draws only regular and bold from a font family, so weights 500 and 600 look regular there. Is that acceptable for the apps' minimum Android version?
12. **Missing Figma links.** Part 2b and Part 3 need the DDS: Components v3.2.1 link with a node that uses its spacing and radius variables, a DDS AU node that uses the `Box Shadow` styles, and a node that uses `Headings/Mobile/*` and `Body/* - Link`.
