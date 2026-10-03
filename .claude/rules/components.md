---
paths:
  - 'src/components/**/*.{ts,tsx}'
---

# Components (logic-free UI kit)

Do not write component code until the user starts the components phase.

## Colors and tokens

- Read semantic tokens first, Map/Alias tokens second. Never the palette, never a seed, never a literal (hard rule 3).
- Theme-dependent styles come from `createStyles`. Static layout may use `StyleSheet.create`.
- Apply `theme.components.<Name>` overrides over the global token before styling. The `algorithm` semantics are in `tokens-naming.md`.
- Touch has no hover. Use the Pressed, Focused, Disabled and Selected semantic tokens; `*Hover` tokens exist only for parity with the reference model (`docs/tokens.md` § Prior art).

Run this before every checkpoint. It must print nothing. It skips the palette, tests,
fixtures and comment lines (JSDoc `@default` values are required by `tokens-naming.md`),
and it matches `rgb(`/`rgba(` only when a number follows, so format strings such as
`` `rgb(${channels})` `` in `utils/color.ts` pass:

```sh
grep -rnE "#[0-9A-Fa-f]{3,8}\b|rgba?\([[:space:]]*[0-9]" src --include='*.ts' --include='*.tsx' \
  | grep -v -e 'src/theme/palette/' -e '__tests__' -e '__fixtures__' \
  | grep -vE '^[^:]+:[0-9]+:[[:space:]]*(//|/?\*)'
```

## Contract for every component

- **Size**: `'small' | 'medium' | 'large'`. The prop wins, then `componentSize` from the nearest provider, then `'medium'`.
- **Disabled**: the prop wins, then `componentDisabled` from the nearest provider.
- **States**: default, pressed (`Pressable` style function), focused, disabled, selected and loading where they apply. Every tappable element shows pressed feedback.
- **Variants**: an explicit `variant` union or separate components. No boolean-prop sprawl (`/vercel-composition-patterns`).
- **Text**: components that wrap text use compound parts, such as a Button text part, instead of polymorphic string children (`/vercel-react-native-skills`).
- **`style` prop**: merged last.
- **Accessibility**: role, state (disabled, selected, busy) and a label when there is no text child. Keep font scaling on. Touch targets reach 44pt, using `hitSlop` when the visual is smaller.
- **Logic-free**: no data fetching, navigation, storage, analytics or hardcoded copy. Text comes from props or children.
- **React APIs**: React 19.2 is the minimum. Accept `ref` as a regular prop and never use `forwardRef` (hard rule 6, skill rule `react19-no-forwardref`). Read context with `use()`, not `useContext()`.

## Files

```text
src/components/Button/
  Button.tsx
  index.ts
  __tests__/Button.test.tsx
```

Export through `src/index.tsx`. Each new component ships with tests, an example screen,
JSDoc on every prop and a `feat(<component>)` commit. Storybook stories wait for Phase 3.
