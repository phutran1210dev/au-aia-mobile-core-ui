---
paths:
  - '**/__tests__/**/*.{ts,tsx}'
  - '**/*.test.{ts,tsx}'
---

# Testing

Load `/react-native-testing` before writing tests.

## Setup

- Jest 29 with `@react-native/jest-preset`. The config lives under `"jest"` in the root `package.json`.
- Hooks and components use `@testing-library/react-native` v14, the React 19 line with async `render`, and its peer `test-renderer` (pinned `~1.2.0`, whose `react-reconciler` 0.33 matches React 19.2). Use its built-in matchers, not `@testing-library/jest-native`.
- Tests live in `__tests__/` next to their subject and are named `<subject>.test.ts(x)`.
- One file: `yarn test src/theme/__tests__/<file>.test.ts`. By name: `yarn test -t "<name>"`.

## Rules

- Test through the public API (`src/index.tsx`) unless the subject is internal: palette, color utils, resolver.
- Token values: assert against an explicit Figma fixture holding code name, Figma path and the hex copied from Figma. No snapshots for token values, because a snapshot cannot show where a value came from.
- Hooks: `renderHook(() => theme.useToken(), { wrapper })` with a `ConfigProvider` wrapper.
- Components: query by role or text, press with `userEvent`, assert with `toHaveStyle`.
- A bug fix starts with a failing test.
- Never weaken or skip a failing test to get green. Report it instead.

## Required theme tests

1. The default theme equals the Figma values exactly, for every palette, map and semantic token.
2. Overriding `colorPrimary` regenerates its Map + Semantic tokens, and other families keep their Figma values.
3. Overriding a semantic token directly wins and does not leak to sibling tokens, the parent provider or other subtrees.
4. Nested provider: `inherit: true` merges the parent config, and `inherit: false` resets to defaults.
5. `theme.components.Button` override with `algorithm` false (exact keys only) and true (regenerated family).
6. `theme.getDesignToken(config)` deep-equals `useToken()` under `<ConfigProvider theme={config}>`.

Also cover two brief requirements: `theme={undefined}` renders the same tree as `theme={}` without
re-mounting children, and identical config values return the same token object.
