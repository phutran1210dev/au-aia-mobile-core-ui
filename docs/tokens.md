# Color tokens

This page lists every public color token of `@au-aia/mobile-core-ui`: its code name, the Figma source of its default, the default value, and what it references. Read it with `GLOSSARY.md` for the terms and `.claude/rules/tokens-naming.md` for the rules.

All hex values were read from Figma with the Figma MCP on 2026-10-03:

- **Qi**: [Qi tokens – AIA](https://www.figma.com/design/HxDGXJYqeMwdxg0pJNyrQf/Qi-tokens-%E2%80%93-AIA?node-id=102-2817&m=dev), node 102-2817, "AIA primitives colours". Source of truth for palette values and family names.
- **DDS**: [DDS AU v2.0.11](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=15329-57416&m=dev), interactive node 15329-57416. Source of the interactive roles.

Tokens marked _interim_ carry `@interim pending design` in their JSDoc. Their names stay stable; only their references may change once design decides. See [Open questions for design](#open-questions-for-design).

## How the layers fit together

| Layer    | Public | Names from | Default comes from                                     |
| -------- | ------ | ---------- | ------------------------------------------------------ |
| Palette  | No     | Qi         | Raw Qi hex                                             |
| Seed     | Yes    | antd       | A palette step                                         |
| Map      | Yes    | antd       | Hand-mapped palette steps; the algorithm on override   |
| Alias    | Yes    | antd       | A reference to a map token                             |
| Semantic | Yes    | DDS        | A reference to a map or alias token, or a palette step |

With no overrides, every token equals its Figma value below. Overriding a seed regenerates that seed's family with antd's palette algorithm. Overriding a map, alias or semantic token sets that exact value, and every token that references it follows.

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

### Slots

antd fills ten palette slots per seeded family, lightest first, with the seed color in slot 6. Map tokens read slots 1 to 7, as antd's `genColorMapToken` does:

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

An overridden seed fills slot n with color n of `generatePalette(seed)`; the result matches antd 6.6.5's own `getDesignToken`. `*Hover` tokens exist for antd compatibility; React Native has no hover, so components use the semantic Pressed tokens, which reference the `*Active` tokens.

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

Every semantic token is interim (Checkpoint 2, decision 1): Qi has no semantic token names, so the names come from DDS `Interactive/*`. Pressed and disabled are derived antd-style because DDS defines no interaction states.

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

## Component tokens (experimental)

`theme.components.<Name>` overrides apply to one component's token, and a component reads that token through `createStyles(factory, { component: '<Name>' })`.

- The `component` option is **experimental** (`@experimental` in JSDoc): it is not in the `theme.md` API yet and may change while the UI kit takes shape.
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

## Values dropped from the palette

These exist only in DDS, with no Qi step, so the palette leaves them out (Checkpoint 2, decision 5):

| DDS name           | Hex       | Where                       |
| ------------------ | --------- | --------------------------- |
| Red 20%            | `#F39CB3` | DDS primary node swatch     |
| `Primary/Blue/125` | `#175A82` | DDS variable with no swatch |

## Deviations from antd

- **`darken`.** `@ant-design/fast-color` passes the HSV saturation into an HSL conversion, which shifts tinted backgrounds even at `darken(0)`. This library darkens in HSL, as `@ctrl/tinycolor` does.
- **`colorBgContainerDisabled`** references `colorBgLayout`, because antd's source token `colorFillTertiary` is not defined yet.
- **Component overrides.** With `algorithm: false`, alias and semantic tokens that reference an overridden key re-resolve. antd applies component keys without re-resolving.
- **`componentSize`** is `'small' | 'medium' | 'large'`; antd says `middle`.
- **Not defined yet**: `colorFill*`, `colorBgElevated`, `colorBgSpotlight`, `colorBgSolid*`, `colorBgBlur`, `colorSplit`, `colorLink*`, `colorBorderDisabled`, `colorErrorBgActive`, `colorErrorBgFilledHover`, antd's preset color palettes, and every non-color token. Each needs a Figma value first.
- **No `darkAlgorithm` or `compactAlgorithm`**: Figma defines no dark values or compact sizes. `ThemeConfig['algorithm']` already accepts an array, ready for them.

## Open questions for design

1. **Semantic token names.** Qi has no semantic layer, so the names come from DDS `Interactive/*`. Will Qi publish semantic token names?
2. **Interaction states.** DDS defines no pressed, focused, disabled or selected colors. Pressed is derived as antd's `*Active` (slot 7, e.g. `digitalred-600`), and disabled from neutral tokens (`digitalcharcoal-50` fill, `digitalcharcoal-300` text). Focused and selected are not defined.
3. **Brand red.** Is `Primary/Red/100` `#E00842` or `#D31145`?
4. **Highlight.** DDS calls AIA Blue `#0C6DD2` the highlight color, but `Interactive/highlighted` is navy `#082065`. Which is right, and is Highlighted the selected state?
5. **Warning and Error.** Both have swatches on the interactive page but no `Interactive/*` variables. Will they get variables?
6. **Digital light green.** Qi has variables but no swatch, so its palette group is unknown.
7. **Disabled container.** antd derives it from a fill token (`colorFillTertiary`) that Figma does not define. Should there be fill tokens?
8. **Dark mode.** No dark values exist in Figma.
9. **Secondary seed.** There is no `colorSecondary` seed. Should one secondary family become a brand seed?
