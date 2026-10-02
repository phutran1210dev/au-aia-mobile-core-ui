---
paths:
  - 'example/**/*'
---

# Example app (playground)

- Private workspace `@au-aia/mobile-core-ui-example`. It is never published and is excluded from the library build (`tsconfig.build.json`).
- Example app: bare React Native CLI (+ web via Vite), with native `android/` and `ios/` projects. It stays bare: never migrate it to Expo and never add `expo` packages here.
- The library must still work in Expo apps. A separate Expo smoke-test app will check that later.
- Metro and Vite resolve `@au-aia/mobile-core-ui` to `src/` through the `au-aia-mobile-core-ui-source` condition, so library edits hot-reload without a build.
- Import the library the way a consumer would: `from '@au-aia/mobile-core-ui'`. One exception: the palette showcase may import the library's `src/theme/palette` by relative path, with a comment explaining why, because hard rule 4 keeps the palette out of the public API.
- One screen per feature in `example/src/screens/`, listed in a single registry. `App.tsx` stays a thin shell.
- Every public API change adds or updates a screen (hard rule 5).
- Screen chrome uses library tokens too. Hex strings appear only as displayed labels.
- Example dependencies do not ship, but keep them few and name each new one in the checkpoint summary.
- UI checkpoint: run `yarn example ios` and `yarn example android`, then show screenshots of both.
