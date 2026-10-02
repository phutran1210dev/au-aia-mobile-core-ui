---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'docs/**/*.md'
  - 'example/src/**/*.{ts,tsx}'
---

# Token model, naming and override priority

## The four layers

| #   | Layer               | Examples                                                                                                                                                                    | Edited by                               | Default value comes from                                                  | Public |
| --- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------- | ------ |
| 1   | Palette (primitive) | `palette.primary[50..900]`, `palette.secondary[..]`, `palette.neutral[..]`, `palette.functional`                                                                            | Design team only, synced from DDS Figma | Raw hex in DDS AU v2.0.11                                                 | No     |
| 2   | Seed                | `colorPrimary`, `colorSecondary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`, `colorTextBase`, `colorBgBase`                                                 | Apps, by override                       | A palette step: the Figma brand value                                     | Yes    |
| 3   | Map (antd)          | `colorPrimaryBg`, `colorPrimaryHover`, `colorPrimaryActive`, `colorPrimaryBorder`, `colorPrimaryText`, `colorText`, `colorTextSecondary`, `colorBgContainer`, `colorBorder` | Apps, by override                       | Hand-mapped palette steps; the algorithm only when the seed is overridden | Yes    |
| 4   | Semantic (AIA Qi)   | `colorInteractivePrimaryDefault`, `colorInteractivePrimaryPressed`, `colorInteractivePrimaryDisabled`, `colorSurfaceDefault`, `colorTextOnPrimary`                          | Apps, by override                       | A reference to a Map/Alias token or a palette step                        | Yes    |

- Layer 3 also holds antd's Alias tokens (`alias.ts`, e.g. `colorTextDisabled`, `colorBgContainerDisabled`), with antd's names and meanings, derived from Map tokens the way antd derives them.
- Names in layers 2 and 3 come from antd. Names in layer 4 come from Qi tokens. Values come from DDS.
- A raw hex literal is allowed only in `src/theme/palette/`. A hex literal in `tokens/semantic.ts` is a bug.

## Resolution order

One pure resolver, shared by `ConfigProvider`, `theme.useToken` and `theme.getDesignToken`:

1. **Seed**: default seeds merged with the seed keys in `token`.
2. **Map**: per color family, a seed equal to its default uses the Figma-tuned map. An overridden seed runs the algorithm (`generatePalette`, a 10-step palette like `@ant-design/colors`). Other families keep their Figma values.
3. **Map overrides**: Map and Alias keys in `token` apply exactly. Nothing is regenerated from them.
4. **References**: Alias and Semantic tokens resolve against the result of step 3, the way antd computes alias tokens.
5. **Semantic overrides**: Semantic keys in `token` apply exactly. Unknown (custom) keys pass through untouched.

Consequence of step 4: overriding `colorPrimaryActive` also moves every semantic token that references it, unless that semantic token is overridden too.

## Algorithm rules

- No overrides: the default theme outputs EXACTLY the Figma values, never algorithm-generated colors.
- Seed override, e.g. `colorPrimary`: regenerate that color's Map + Semantic tokens with the algorithm, so the family stays consistent.
- Map or Semantic override: that exact value wins, and nothing is regenerated from it.
- RN has no hover. `*Hover` tokens stay for antd compatibility; components use the Pressed and Focused semantic tokens.
- `darkAlgorithm` only if Figma defines dark values. Otherwise keep the hook ready and ask before inventing a dark palette.

## Naming: Figma Qi path to code name

1. Take the variable path inside its collection, e.g. `interactive/primary/pressed`. Collection and mode names are not part of the name.
2. Drop a leading `color`, `colour` or `colors` segment; step 4 adds the prefix back.
3. Split segments on `/`, spaces, `-`, `_` and `.`. Lowercase each word, then capitalize its first letter. Digits stay as written.
4. Join as `color` + words.
5. Keep Figma's words and order: no abbreviating (`background` stays `Background`), no expanding (`bg` stays `Bg`), no reordering.

Illustrations of the rule, not real Qi paths (verify every path in Figma):

| Figma path                    | Code name                        |
| ----------------------------- | -------------------------------- |
| `interactive/primary/pressed` | `colorInteractivePrimaryPressed` |
| `color/surface/default`       | `colorSurfaceDefault`            |
| `text/on-primary`             | `colorTextOnPrimary`             |
| `border/focus ring`           | `colorBorderFocusRing`           |

- Palette keys: `palette.<family>[<step>]`. Family in lowerCamelCase; steps numbered exactly as in Figma, never renumbered to antd's 1 to 10.
- Collisions: if a converted name equals an antd Seed, Map or Alias name (`text/secondary` gives `colorTextSecondary`), it must mean the same thing, and the antd key is kept once. If the meanings differ, STOP and ask. Never rename silently.
- Non-color categories (spacing, radius, typography) will use their category word as the prefix. Confirm when that phase starts.
- Renaming or removing a public token is a breaking change.

## JSDoc on every token

```ts
/**
 * Fill of a primary interactive element, such as a primary Button, while pressed.
 * @figma interactive/primary/pressed (Qi tokens – AIA, node 102-2817)
 * @default colorPrimaryActive, i.e. palette.primary[<step>] = #RRGGBB
 */
colorInteractivePrimaryPressed: string;
```

Each comment says what the token colors in plain words, its Figma path, and its default value
with what it references. The hex in `@default` is copied from Figma, never typed from memory.

## Override priority (low to high)

1. Library defaults (Figma values).
2. `<ConfigProvider theme={{ token }}>`: global.
3. Nested `<ConfigProvider theme={{ token }}>`: a local section. `inherit: true` (default) merges the parent's theme config (token, components, algorithm) with its own, then resolves. `inherit: false` starts again from library defaults. Never merge resolved token objects.
4. `theme.components.Button = { colorPrimary, algorithm? }`: per component. `algorithm: false` (default, like antd) applies the keys exactly, while references still re-resolve as in step 4 above. `true` re-runs the theme's algorithm with the component's seeds. A function is used as that component's algorithm.
5. Component `style` prop: one instance, merged last.

## Custom tokens and docs

- Apps add custom tokens by TypeScript module augmentation of the exported token interface. Custom names must not shadow library names.
- `docs/tokens.md` lists every public token: Figma path, code name, default value, layer. Update it in the same change as the code.
