<!-- Maintainers: keep this file under 150 lines. Topic detail lives in .claude/rules/. -->

# @au-aia/mobile-core-ui

Core design system for AU-AIA React Native apps: design tokens, an antd-style
`ConfigProvider` + `theme` API, and a logic-free UI kit. Consumers: the AU-AIA
health app, a future super app and other teams' modules. "Verified in" names the
file a fact was checked against; re-check that file when something looks stale.

## Project matrix

| Item          | Value                                                                                                                              | Verified in                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Package, repo | `@au-aia/mobile-core-ui`, repo `au-aia-mobile-core-ui`, default branch `master`                                                    | `package.json`                 |
| Library type  | JS-only RN library (create-react-native-library, built by bob), no native code                                                     | `package.json`                 |
| Language      | TypeScript strict + `noUncheckedIndexedAccess` + `verbatimModuleSyntax`                                                            | `tsconfig.json`                |
| Dev versions  | RN 0.86.2, React 19.2.3, TypeScript 6, Node 24.13.0, Yarn 4.11.0                                                                   | `package.json`, `.nvmrc`       |
| Targets       | Expo AND bare React Native, both must work                                                                                         | brief                          |
| Peer deps     | `react`, `react-native` only (range is `*` today). Zero runtime deps                                                               | `package.json`                 |
| Example app   | `example/`, private playground, never published. Today a bare RN CLI app + web via Vite; the brief targets Expo (decision pending) | `example/package.json`         |
| Tooling       | ESLint 9 + Prettier, Jest, Lefthook + Commitlint, Release It, Turbo (CI)                                                           | `package.json`, `lefthook.yml` |

## Design sources (read with the Figma MCP, never guess values)

| Source                                                                                                                                       | Use for                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Qi tokens – AIA, node 102-2817](https://www.figma.com/design/HxDGXJYqeMwdxg0pJNyrQf/Qi-tokens-%E2%80%93-AIA?node-id=102-2817&m=dev)         | Token NAMES and hierarchy (naming source of truth)          |
| [DDS AU v2.0.11 primary, node 20765-1243](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=20765-1243&m=dev)       | Primary palette VALUES                                      |
| [DDS AU v2.0.11 secondary, node 20765-1321](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=20765-1321&m=dev)     | Secondary palette VALUES                                    |
| [DDS AU v2.0.11 interactive, node 15329-57416](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=15329-57416&m=dev) | State colors: default, pressed, focused, disabled, selected |

- Use `get_variable_defs`, `get_design_context` and `get_screenshot` on each node.
- Figma MCP unavailable, or a value missing or ambiguous: STOP and ask. Never invent a hex value.
- `.mcp.json` holds a personal Figma token and is gitignored. Never commit it.
- API to mirror, adapted to RN: antd [theme config](https://ant.design/docs/react/customize-theme#theme) and [ConfigProvider](https://ant.design/components/config-provider#config).

## Commands (all from `package.json`; do not invent scripts)

```sh
yarn                     # install all workspaces (Yarn 4 from .yarn/releases; never npm)
yarn example start       # Metro for the example app
yarn example ios         # also: yarn example android, yarn example web (Vite)
yarn typecheck           # tsc over the whole repo, example included
yarn lint                # ESLint + Prettier; yarn lint --fix formats
yarn test                # Jest; one file: yarn test <path>; by name: yarn test -t "<name>"
yarn prepare             # bob build to lib/ (ESM + .d.ts)
yarn release             # release-it: bump, tag, npm publish, GitHub release. Only with explicit approval
```

## Folder structure

`src/` holds only the scaffold today (`multiply`, to be removed). Target layout:

```text
src/
  index.tsx            public API; the only entry point ("exports": ".")
  theme/
    palette/           primary.ts secondary.ts neutral.ts functional.ts   Figma values, INTERNAL
    tokens/            seed.ts map.ts alias.ts semantic.ts types.ts
    algorithms/        default.ts dark.ts compact.ts generatePalette.ts
    config-provider/   ConfigProvider.tsx context.ts useConfig.ts
    hooks.ts           useToken
    getDesignToken.ts  token resolution outside React
    createStyles.ts    token-aware StyleSheet factory
    utils/             deepMerge.ts color.ts
    index.ts
  components/          UI kit (later phase)
docs/tokens.md         Figma path -> code name -> default value -> layer
example/src/           playground screens
```

## Color tokens in brief

Four layers, each derived from the one before:

1. **Palette**: raw hex from DDS Figma. Internal; components and apps never read it.
2. **Seed**: antd seed names (`colorPrimary`, `colorSecondary`, `colorTextBase`...). Default is the Figma brand value.
3. **Map**: antd MapToken and AliasToken names and meanings (`colorPrimaryActive`, `colorBgContainer`...).
4. **Semantic**: AIA Qi names (`colorInteractivePrimaryPressed`...). References a Map token or palette step, never hex.

Override priority, low to high: library defaults, root `ConfigProvider`, nested
`ConfigProvider`, `theme.components.<Name>`, component `style` prop. Full model,
algorithm rules and the Figma-to-camelCase rule: `.claude/rules/tokens-naming.md`.

## Hard rules (these win over any skill's advice)

1. `src/` never imports `expo`, `expo-*` or `@expo/*`. Expo only in `example/`.
2. `react` and `react-native` are peerDependencies only. Zero runtime deps unless the user approves.
3. Components never hardcode colors; they read only semantic or map tokens.
4. The palette layer is internal. Never export it as something apps style with.
5. Every public API change ships with tests + an example screen + a Conventional Commit.
6. If a skill's advice conflicts with these rules, these rules win.

## Code conventions

- Use `import type` for type-only imports (`verbatimModuleSyntax`).
- Import React Native APIs from `'react-native'` only; no deep imports (the strict API condition is on).
- Relative imports inside `src/`; no path aliases, because bob would not rewrite them.
- The public API is exactly what `src/index.tsx` exports. Every export has JSDoc.

## Rules in `.claude/rules/`

A path-scoped rule loads when Claude reads a matching file. Before creating the first
file in an area, read its rule file first.

| File                 | Loads for                       | Covers                                                          |
| -------------------- | ------------------------------- | --------------------------------------------------------------- |
| `tokens-naming.md`   | `src/`, `docs/`, `example/src/` | 4 layers, resolution order, naming, override priority, JSDoc    |
| `theme.md`           | `src/theme/`, `src/index.tsx`   | Public API, resolver, memoization, ConfigProvider, createStyles |
| `components.md`      | `src/components/`               | Token use, sizes, states, variants, accessibility               |
| `testing.md`         | `__tests__/`, `*.test.ts(x)`    | Jest + Testing Library conventions, required theme tests        |
| `example-app.md`     | `example/`                      | Playground rules                                                |
| `commits-release.md` | every session                   | Conventional Commits, hooks, Release It                         |

## Skills

| Skill                                                                      | Use for                                                                               | Ignore                                                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/expo-design-system`                                                      | Token organization; component contract (variants, sizes, states, `style` merged last) | Its `expo-router` `Color`/PlatformColor palette, `@/theme` alias, `sm/md/lg` names |
| `/react-native-best-practices`                                             | Context + memo, avoiding re-renders                                                   |                                                                                    |
| `/vercel-composition-patterns`                                             | Compound components, explicit variants, no boolean-prop sprawl                        | React 19-only APIs while the peer range allows React 18                            |
| `/vercel-react-best-practices`                                             | Re-render rules                                                                       | Next.js, server and DOM rules                                                      |
| `/react-native-testing`                                                    | Writing tests. Not installed yet; see `testing.md`                                    |                                                                                    |
| `/setup-react-native-storybook`, `/writing-react-native-storybook-stories` | Phase 3 only. Do not set up Storybook now                                             |                                                                                    |

## Working agreement

- Follow the tasks and checkpoints the user sets. At a checkpoint, show files, test output and screenshots, then stop.
- Never commit, push or run `yarn release` without explicit approval.
- Ask first before adding a runtime dependency, exporting the palette, inventing dark values or renaming public API. Name every new devDependency in the checkpoint summary.

## Definition of done

- [ ] `yarn typecheck`, `yarn lint`, `yarn test` and `yarn prepare` pass; no new skipped tests.
- [ ] Public API change: tests, example screen, JSDoc and exported types. Token change: `docs/tokens.md` too.
- [ ] No `expo` import in `src/`, no new runtime dependency, palette not exported.
- [ ] No hex or `rgb()` literal in `src/` outside `src/theme/palette/` and test fixtures.
- [ ] UI change: iOS and Android screenshots shown at the checkpoint.
- [ ] Conventional Commit message drafted; committed only after the user approves.
