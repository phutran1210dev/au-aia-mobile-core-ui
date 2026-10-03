---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'docs/**/*.md'
  - 'example/src/**/*.{ts,tsx}'
---

# Token model, naming and override priority

## The four layers

| #   | Layer               | Examples                                                                                                                                                                    | Edited by                              | Default value comes from                                                  | Public |
| --- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------- | ------ |
| 1   | Palette (primitive) | `palette.digitalRed[50..900]`, `palette.digitalCharcoal[..]`, `palette.monotone.white`, `palette.alpha.*`                                                                   | Design team only, synced from Qi Figma | Raw hex in Qi tokens – AIA                                                | No     |
| 2   | Seed                | `colorPrimary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`, `colorTextBase`, `colorBgBase`                                                                   | Apps, by override                      | A palette step: the Figma brand value                                     | Yes    |
| 3   | Map                 | `colorPrimaryBg`, `colorPrimaryHover`, `colorPrimaryActive`, `colorPrimaryBorder`, `colorPrimaryText`, `colorText`, `colorTextSecondary`, `colorBgContainer`, `colorBorder` | Apps, by override                      | Hand-mapped palette steps; the algorithm only when the seed is overridden | Yes    |
| 4   | Semantic (AIA)      | `colorInteractiveActionable`, `colorInteractiveActionablePressed`, `colorInteractiveDisabled`                                                                               | Apps, by override                      | A reference to a Map/Alias token or a palette step                        | Yes    |

- Layer 3 also holds Alias tokens (`alias.ts`, e.g. `colorTextDisabled`, `colorBgContainerDisabled`): named roles that reference Map tokens, as the reference model defines them.
- Typography follows the same layers. Qi `AIA Typography` values (mode `EN`, body and Mobile only) live in `src/theme/typography/`, internal like the palette. Seeds (`fontSize`), maps (`fontSizeHeading1`, `lineHeight`) and semantic typography tokens (`fontFamilyHeadline`) read them.
- Tokens Figma does not define take the reference model's default, converted for React Native (motion in ms, curves as `[x1, y1, x2, y2]`). Colors never do: a missing color maps to the nearest Qi value, marked interim (docs/specs/theme-parity.md, D5).
- Names in layers 2 and 3 come from the reference model (`docs/tokens.md` § Prior art). Names in layer 4 come from DDS `Interactive/*` until Qi publishes semantic names (interim). Palette values and family names come from Qi; on a mismatch with DDS, Qi wins.
- A raw hex literal is allowed only in `src/theme/palette/`. A hex literal in `tokens/semantic.ts` is a bug.

## Resolution order

One pure resolver, shared by `ConfigProvider`, `theme.useToken` and `theme.getDesignToken`:

1. **Seed**: default seeds merged with the seed keys in `token`.
2. **Map**: per color family, a seed equal to its default uses the Figma-tuned map. An overridden seed runs the algorithm (`generatePalette`, a ten-color palette). Other families keep their Figma values. `fontSize` works the same way with `generateFontTokens`. After every algorithm, `motion: false` sets the three durations to 0.
3. **Map overrides**: Map and Alias keys in `token` apply exactly. Nothing is regenerated from them.
4. **References**: `fontHeight*`, Alias and Semantic tokens resolve against the result of step 3.
5. **Semantic overrides**: Semantic keys in `token` apply exactly. Unknown (custom) keys pass through untouched.

Consequence of step 4: overriding `colorPrimaryActive` also moves every semantic token that references it, unless that semantic token is overridden too.

## Algorithm rules

- No overrides: the default theme outputs EXACTLY the Figma values, never algorithm-generated colors.
- Seed override, e.g. `colorPrimary`: regenerate that color's Map + Semantic tokens with the algorithm, so the family stays consistent.
- Map or Semantic override: that exact value wins, and nothing is regenerated from it.
- The slot table: `Bg` 1, `BgHover` 2, `Border` 3, `BorderHover` 4, `Hover` 5 (4 for Success, Warning and Info), seed 6, `Active` 7, and `TextHover`, `Text`, `TextActive` reuse 5, 6 and 7. A ten-step Qi family fills slot n with step n; a seven-step family fills slots 1 to 7 with steps 50, 100, 100, 200, 200, 300, 400.
- RN has no hover. `*Hover` tokens stay for parity with the reference model; components use the Pressed and Focused semantic tokens.
- `darkAlgorithm` only if Figma defines dark values. Otherwise keep the hook ready and ask before inventing a dark palette.

## Naming: Figma path to code name

1. Take the variable path inside its collection, e.g. DDS `Interactive/Actionable` today, or a Qi semantic path once Qi publishes one. Collection and mode names are not part of the name.
2. Drop a leading `color`, `colour` or `colors` segment; step 4 adds the prefix back.
3. Split segments on `/`, spaces, `-`, `_` and `.`. Lowercase each word, then capitalize its first letter. Digits stay as written.
4. Join as `color` + words.
5. Keep Figma's words and order: no abbreviating (`background` stays `Background`), no expanding (`bg` stays `Bg`), no reordering.

The first row is a real DDS path; the others illustrate the rule (verify every path in Figma):

| Figma path                    | Code name                        |
| ----------------------------- | -------------------------------- |
| `Interactive/Actionable`      | `colorInteractiveActionable`     |
| `interactive/primary/pressed` | `colorInteractivePrimaryPressed` |
| `color/surface/default`       | `colorSurfaceDefault`            |
| `text/on-primary`             | `colorTextOnPrimary`             |
| `border/focus ring`           | `colorBorderFocusRing`           |

- Palette keys: `palette.<family>[<step>]`. Family in lowerCamelCase; steps numbered exactly as in Figma, never renumbered to palette slots.
- Collisions: if a converted name equals a Seed, Map or Alias name (`text/secondary` gives `colorTextSecondary`), it must mean the same thing, and the existing key is kept once. If the meanings differ, STOP and ask. Never rename silently.
- Non-color tokens with a reference-model name keep that name. A Qi typography value without one becomes a semantic typography token, named from its Qi path (docs/specs/theme-parity.md, D7):
  1. The first segment becomes the style property: `Family` gives `fontFamily`, `Size` gives `fontSize`, `Weight` gives `fontWeight`, `Line height` gives `lineHeight`, `Letter spacing` gives `letterSpacing`.
  2. Qi's other words follow, without the `Mobile` and `default` segments: `Family/headline` gives `fontFamilyHeadline`, `Weight/headline/default` gives `fontWeightHeadline`, `Letter spacing/Mobile/headline1` gives `letterSpacingHeadline1`.
  3. A Qi value that already has a reference name is not added twice: `Weight/body/strong1` is `fontWeightStrong`.
- Spacing and radius names follow once their Figma source is linked (Part 2b).
- Renaming or removing a public token is a breaking change.

## JSDoc on every token

```ts
/**
 * Fill of an actionable element while pressed.
 * @figma none; the `*Active` map token (palette slot 7) for DDS Interactive/Actionable
 * @default colorPrimaryActive, i.e. palette.digitalRed[600] = #B30635
 * @interim pending design: DDS defines no pressed state.
 */
colorInteractiveActionablePressed: string;
```

Each comment says what the token styles in plain words, its Figma path (or `none; the reference
model's default`), and its default value with what it references. The value in `@default` is
copied from Figma or the reference model, never typed from memory.
A value design has not decided carries `@interim pending design: <reason>` and an entry under
"Open questions for design" in `docs/tokens.md`.

## Override priority (low to high)

1. Library defaults (Figma values).
2. `<ConfigProvider theme={{ token }}>`: global.
3. Nested `<ConfigProvider theme={{ token }}>`: a local section. `inherit: true` (default) merges the parent's theme config (token, components, algorithm) with its own, then resolves. `inherit: false` starts again from library defaults. Never merge resolved token objects.
4. `theme.components.Button = { colorPrimary, algorithm? }`: per component. `algorithm: false` (default) applies the keys exactly, while references still re-resolve as in step 4 above. `true` re-runs the theme's algorithm with the component's seeds. A function is used as that component's algorithm.
5. Component `style` prop: one instance, merged last.

## Custom tokens and docs

- Apps add custom tokens by TypeScript module augmentation of the exported token interface. Custom names must not shadow library names.
- `docs/tokens.md` lists every public token: Figma path, code name, default value, layer. Update it in the same change as the code.
