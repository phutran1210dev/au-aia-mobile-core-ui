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
- Touch has no hover. Use the Pressed, Focused, Disabled and Selected semantic tokens; `*Hover` tokens exist only for antd compatibility.

Run this before every checkpoint. It must print nothing:

```sh
grep -rnE "#[0-9A-Fa-f]{3,8}\b|rgba?\(" src --include='*.ts' --include='*.tsx' | grep -v -e 'src/theme/palette/' -e '__tests__'
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
- **React APIs**: while the peer range allows React 18, avoid React 19-only APIs (`use()`, `ref` as a prop, `<Context value>`).

## Files

```text
src/components/Button/
  Button.tsx
  index.ts
  __tests__/Button.test.tsx
```

Export through `src/index.tsx`. Each new component ships with tests, an example screen,
JSDoc on every prop and a `feat(<component>)` commit. Storybook stories wait for Phase 3.
