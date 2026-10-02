---
paths:
  - 'src/theme/**/*.{ts,tsx}'
  - 'src/index.tsx'
---

# Theme system

Mirror antd v5 behavior, adapted to React Native. When unsure, check what antd does
([theme](https://ant.design/docs/react/customize-theme#theme),
[ConfigProvider](https://ant.design/components/config-provider#config)) and call out any deviation.
Token model and resolution order live in `tokens-naming.md`.

## Folder layout

```text
src/
  index.tsx              public API; the only entry point ("exports": ".")
  theme/
    index.ts             the `theme` object and type re-exports
    types.ts             ThemeConfig, MappingAlgorithm, ComponentThemeConfig, ComponentSize
    palette/             Qi values, INTERNAL. One file per Qi group: monotone, primary,
                         secondary, tertiary, semantic (Qi's group name, not semantic
                         tokens), alpha; ungrouped.ts for light green. index.ts builds `palette`
    tokens/              types.ts (public token interfaces), seed.ts, map.ts (slots,
                         colorFamilies), alias.ts, semantic.ts, references.ts
    algorithms/          default.ts, generatePalette.ts (dark.ts, compact.ts once Figma has values)
    config-provider/     ConfigProvider.tsx, context.ts (two contexts), useConfig.ts
    resolver.ts          the one pure resolver: config merge, token and component caches
    hooks.ts             useToken; useComponentToken (internal)
    getDesignToken.ts    token resolution outside React
    createStyles.ts      token-aware StyleSheet factory
    utils/               color.ts, deepMerge.ts, stableKey.ts, createCache.ts
    __fixtures__/        Figma and antd reference values for tests
    __tests__/           theme tests through the public API
  components/            UI kit (later phase)
docs/tokens.md           every public token; Figma discrepancies; open questions for design
GLOSSARY.md              domain terms
example/src/             App.tsx shell, Playground.tsx tabs, screens/<feature>/
```

Unit tests for internals sit next to their subject, such as `utils/__tests__/` and
`algorithms/__tests__/`.

## Public API (exported from `src/index.tsx` only)

```tsx
import { ConfigProvider, theme } from '@au-aia/mobile-core-ui';

<ConfigProvider
  theme={{
    token,
    algorithm: [theme.defaultAlgorithm],
    components: { Button: { colorPrimary } },
    inherit: true,
  }}
  componentSize="medium"
  componentDisabled={false}
>
  <App />
</ConfigProvider>;

const { token } = theme.useToken();
const { componentSize, componentDisabled } = ConfigProvider.useConfig();
const t = theme.getDesignToken({ token: { colorPrimary: '#RRGGBB' } });
```

- `componentSize` is `'small' | 'medium' | 'large'`. antd says `middle`; this library says `medium`.
- Exported types: `ThemeConfig`, `SeedToken`, `MapToken`, `AliasToken`, `SemanticColorToken`, `GlobalToken`, plus prop types such as `ConfigProviderProps`.
- `SeedToken` ⊂ `MapToken` ⊂ `AliasToken`, as in antd. `GlobalToken` is `AliasToken & SemanticColorToken` plus the augmentable custom-token interface. `ThemeConfig['token']` is `Partial<GlobalToken>`.
- Interfaces that apps may augment are declared with `interface`, never `type`.
- Never export the palette, resolver internals or React contexts.

## Resolver

- One pure function turns a theme config, plus its parent config, into a `GlobalToken`. `ConfigProvider`, `useToken` and `getDesignToken` all call it, so `getDesignToken(config)` deep-equals `useToken()` under `<ConfigProvider theme={config}>`.
- Memoize per config with a structural key: token values, algorithm identity and components. Apps pass inline `theme={{...}}` objects, so object identity cannot be the cache key.
- Resolved tokens are immutable. The same config values return the same object, so memoized consumers do not re-render.
- A seed set to exactly its default value counts as not overridden: Figma map, no algorithm.
- `generatePalette` and `utils/color.ts` are our own code, with no color packages (zero runtime deps). When porting from `@ant-design/colors` (MIT), keep its license notice in the file header.
- `deepMerge` never mutates its inputs. Arrays replace; they never concatenate.
- Never ship a `darkAlgorithm` with invented colors. The algorithm array is ready for one; ask before adding values Figma does not define. The same applies to `compactAlgorithm` sizes.
- No `PlatformColor`, `DynamicColorIOS` or `useColorScheme`-driven palette unless Figma defines it. `/expo-design-system` suggests these, and the hard rules win.

## ConfigProvider

- `theme={undefined}` behaves exactly like `theme={}`. Always render the same element tree and never wrap children conditionally; antd's FAQ explains that switching between `undefined` and an object re-mounts the subtree.
- Use two contexts: one for resolved tokens, one for `componentSize` and `componentDisabled`. Memoize each value, so a size change does not re-render token consumers and the reverse.
- Nesting follows `inherit` as described in `tokens-naming.md`. `componentSize` and `componentDisabled` come from the nearest provider that sets them.
- With no provider at all, hooks return library defaults instead of throwing.
- `ConfigProvider.useConfig` is a static on the component, as in antd.

## createStyles

- `createStyles((token, config) => styles)` returns a `useStyles()` hook. It builds the `StyleSheet` once per resolved token object and size, cached in a `WeakMap`, never once per render.
- Components get every theme-dependent style through it.
- `createStyles(factory, { component: 'Button' })` styles with `theme.components.Button` applied. The option is `@experimental` until the UI kit settles it.

## Performance

The brief requires memoized token resolution and stable context values, which wins over the
"profile before memoizing" advice in `/react-native-best-practices`. Everywhere else, follow
the skill: measure before adding `useMemo` or `useCallback`.
