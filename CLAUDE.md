<!-- Maintainers: keep this file under 150 lines. Topic detail lives in .claude/rules/. -->

# @au-aia/mobile-core-ui

Core design system for AU-AIA React Native apps: design tokens, a `ConfigProvider` + `theme` API, and a logic-free UI kit. Consumers: the AU-AIA health app, a future super app and other teams' modules. "Verified in" names the file a fact was checked against; re-check that file when something looks stale.

## Project matrix

| Item              | Value                                                                                                | Verified in                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Package, repo     | `@au-aia/mobile-core-ui`, repo `au-aia-mobile-core-ui`, default branch `master`                      | `package.json`                            |
| Library type      | JS-only RN library (create-react-native-library, built by bob), no native code                       | `package.json`                            |
| Language          | TypeScript strict + `noUncheckedIndexedAccess` + `verbatimModuleSyntax`                              | `tsconfig.json`                           |
| Dev versions      | RN 0.86.2, React 19.2.3, TypeScript 6, Node 24.13.0, Yarn 4.11.0                                     | `package.json`, `.nvmrc`                  |
| Targets           | Expo AND bare React Native, both must work. An Expo smoke-test app comes later                       | brief                                     |
| Peer deps         | `react` >=19.2.0, `react-native` >=0.83.10: the lowest versions our host apps use. Zero runtime deps | `package.json`, health app `package.json` |
| Example app       | bare React Native CLI (+ web via Vite), in `example/`. Private playground, never published           | `example/package.json`                    |
| License, registry | `UNLICENSED`. The private registry URL is a TODO, so npm publishing stays off                        | `package.json`                            |
| Tooling           | ESLint 9 + Prettier, Jest, Lefthook + Commitlint, Release It, Turbo (CI)                             | `package.json`, `lefthook.yml`            |

## Design sources (read with the Figma MCP, never guess values)

| Source                                                                                                                                       | Use for                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Qi tokens – AIA, node 102-2817](https://www.figma.com/design/HxDGXJYqeMwdxg0pJNyrQf/Qi-tokens-%E2%80%93-AIA?node-id=102-2817&m=dev)         | Palette VALUES and family names (source of truth)         |
| Qi tokens – AIA, `AIA Typography` collection (read with `use_figma`; mode `EN`)                                                              | Typography VALUES: families, sizes, line heights, weights |
| DDS: Components v3.2.1 (link TBD)                                                                                                            | Spacing and radius variables (Part 2b); ask for the link  |
| [DDS AU v2.0.11 primary, node 20765-1243](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=20765-1243&m=dev)       | Cross-check of primary values; Qi wins on a mismatch      |
| [DDS AU v2.0.11 secondary, node 20765-1321](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=20765-1321&m=dev)     | Cross-check of secondary values; Qi wins on a mismatch    |
| [DDS AU v2.0.11 interactive, node 15329-57416](https://www.figma.com/design/MJBaY5fhgct1a5goBK8XLw/DDS-AU-v2.0.11?node-id=15329-57416&m=dev) | Interactive ROLES (`Interactive/*`); no state colors yet  |

- Use `get_variable_defs`, `get_design_context` and `get_screenshot` on each node.
- Figma MCP unavailable, or a value missing or ambiguous: STOP and ask. Never invent a hex value.
- `.mcp.json` holds a personal Figma token and is gitignored. Never commit it.
- The token model and theme API follow a reference model, credited with links in `docs/tokens.md` § Prior art. Check it there when behavior is unclear, and record any deviation.

## Commands (all from `package.json`; do not invent scripts)

```sh
yarn                     # install all workspaces (Yarn 4 from .yarn/releases; never npm)
yarn example start       # Metro for the example app
yarn example ios         # also: yarn example android, yarn example web (Vite)
yarn typecheck           # tsc over the whole repo, example included
yarn lint                # ESLint + Prettier; yarn lint --fix formats
yarn test                # Jest; one file: yarn test <path>; by name: yarn test -t "<name>"
yarn prepare             # bob build to lib/ (ESM + .d.ts)
yarn release             # release-it: bump, tag, GitHub release; npm publish is off. Only with explicit approval
```

## Rule: background jobs — start once, never poll

**Run in background** (slow, > ~1 min): `yarn install`, `pod install`, `xcodebuild` / `yarn example ios`, `./gradlew` / `yarn example android`, Metro / `yarn example start`, Vite web, emulator or simulator boot.

**Run in foreground** (fast, need the result now): `yarn typecheck`, `yarn lint`, `yarn test`, `yarn prepare`, git commands.

While a background job runs:

- Never poll it: no `sleep`, `ps`, `pgrep`, `top`, `lsof`, repeated `tail`, or "is it done yet?" checks.
- Do other independent work, or end your reply. You are woken with the job's output when it finishes; read it once.
- Never start a second copy of a running job to check on the first.
- Metro / dev servers are long-lived: start at most one per session, reuse it, and never restart it unless I ask or it has crashed.
- If a job fails, read its output, fix the cause, then rerun it once. Do not retry the same failing command unchanged.

## Color tokens in brief

1. **Palette**: raw hex from Qi, `palette.digitalRed[500]`. Internal; components and apps never read it.
2. **Seed**: seed tokens (`colorPrimary`, `colorTextBase`...; no `colorSecondary`). Default is the Figma brand value.
3. **Map**: map and alias tokens, one color per purpose (`colorPrimaryActive`, `colorBgContainer`...).
4. **Semantic**: DDS `Interactive/*` names, interim (`colorInteractiveActionablePressed`...). References a Map token or palette step, never hex.

Each layer derives from the one before. With no overrides, the output equals the Figma values exactly; overriding a Map token updates the semantic tokens that reference it. Override priority, low to high: library defaults, root `ConfigProvider`, nested `ConfigProvider`, `theme.components.<Name>`, component `style` prop. Details: `.claude/rules/tokens-naming.md`.

## Hard rules (these win over any skill's advice)

1. `src/` never imports `expo`, `expo-*` or `@expo/*`. Expo belongs only in the future Expo smoke-test app.
2. `react` and `react-native` are peerDependencies only. Zero runtime deps unless the user approves.
3. Components never hardcode colors; they read only semantic or map tokens.
4. The palette layer is internal. Never export it as something apps style with.
5. Every public API change ships with tests + an example screen + a Conventional Commit.
6. Accept `ref` as a prop (React 19); no `forwardRef`.
7. If a skill's advice conflicts with these rules, these rules win.

## Code conventions

- Use `import type` for type-only imports (`verbatimModuleSyntax`).
- Import React Native APIs from `'react-native'` only; no deep imports (the strict API condition is on).
- Relative imports inside `src/`; no path aliases, because bob would not rewrite them.
- React 19 APIs: `use()` instead of `useContext()`, and `<Context value>` as the provider.
- The public API is exactly what `src/index.tsx` exports. Every export has JSDoc.

## Rules in `.claude/rules/`

A path-scoped rule loads when Claude reads a matching file. Before creating the first file in an area, read its rule file first.

| File                 | Loads for                       | Covers                                                                         |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------ |
| `tokens-naming.md`   | `src/`, `docs/`, `example/src/` | 4 layers, resolution order, naming, override priority, JSDoc                   |
| `theme.md`           | `src/theme/`, `src/index.tsx`   | Folder layout, public API, resolver, memoization, ConfigProvider, createStyles |
| `components.md`      | `src/components/`               | Token use, sizes, states, variants, accessibility                              |
| `testing.md`         | `__tests__/`, `*.test.ts(x)`    | Jest + Testing Library conventions, required theme tests                       |
| `example-app.md`     | `example/`                      | Playground rules                                                               |
| `commits-release.md` | every session                   | Conventional Commits, hooks, Release It                                        |

## Skills (exactly what is in `.claude/skills/`)

| Skill                                     | Use when                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/code-review`                            | Reviewing a branch, PR or work in progress against these rules and the task spec                                    |
| `/diagnosing-bugs`                        | A hard bug or a performance regression needs a structured diagnosis loop                                            |
| `/domain-modeling`                        | Settling domain terms, editing a GLOSSARY.md or recording an ADR                                                    |
| `/expo-animation`                         | Deciding whether and how something animates. Its Reanimated and Expo code needs approval first (hard rules 1 and 2) |
| `/expo-design-system`                     | Organizing tokens and the component contract. Ignore its `expo-router` colors, `@/theme` alias and `sm/md/lg` names |
| `/git-guardrails-claude-code`             | Adding Claude Code hooks that block destructive git commands                                                        |
| `/github-actions`                         | Changing CI workflows, including the example app's iOS and Android builds                                           |
| `/handoff`                                | Handing the current conversation to another agent as a document                                                     |
| `/pr`                                     | Writing a pull request body                                                                                         |
| `/react-native-best-practices`            | Context, memoization and re-render work, after measuring                                                            |
| `/react-native-testing`                   | Writing or fixing tests with React Native Testing Library                                                           |
| `/setup-react-native-storybook`           | Phase 3 only: setting up Storybook                                                                                  |
| `/tdd`                                    | Building a feature or fixing a bug test-first                                                                       |
| `/upgrading-react-native`                 | Bumping React Native in the example app or the dev dependencies                                                     |
| `/vercel-composition-patterns`            | Designing component APIs: compound components, explicit variants, React 19 APIs                                     |
| `/vercel-react-best-practices`            | Applying React re-render rules. Ignore its Next.js, server and DOM rules                                            |
| `/vercel-react-native-skills`             | Applying React Native component, list and animation patterns                                                        |
| `/writing-guidelines`                     | Reviewing docs and prose, such as this file and the rules                                                           |
| `/writing-react-native-storybook-stories` | Phase 3 only: writing Storybook stories                                                                             |

## Working agreement

- Follow the tasks and checkpoints the user sets. At a checkpoint, show files, test output and screenshots, then stop.
- Never commit, push or run `yarn release` without explicit approval.
- Ask first before adding a runtime dependency, exporting the palette, inventing dark values or renaming public API. Name every new devDependency in the checkpoint summary.

## Definition of done

- [ ] `yarn typecheck`, `yarn lint`, `yarn test` and `yarn prepare` pass; no new skipped tests.
- [ ] Public API change: tests, example screen, JSDoc and exported types. Token change: `docs/tokens.md` too.
- [ ] No `expo` import in `src/`, no new runtime dependency, palette not exported.
- [ ] No hex or `rgb()` literal in `src/` outside `src/theme/palette/`, tests and fixtures (see the grep in `components.md`).
- [ ] UI change: iOS and Android screenshots shown at the checkpoint.
- [ ] Conventional Commit message drafted; committed only after the user approves.
