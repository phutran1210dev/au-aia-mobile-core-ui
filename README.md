# @au-aia/mobile-core-ui

AU-AIA design system for React Native: design tokens, theming and core UI components.

## Installation

```sh
npm install @au-aia/mobile-core-ui
```

## Usage

```js
import { multiply } from '@au-aia/mobile-core-ui';

// ...

const result = multiply(3, 7);
```

## Fonts in the example app

The library ships no fonts. [docs/tokens.md § Fonts](docs/tokens.md#fonts) explains how apps register them and which family names the tokens expect. The example app links two families from `example/assets/fonts/`:

- **Open Sans**: open source under the SIL Open Font License (`example/assets/fonts/OFL-OpenSans.txt`). It's committed and linked with `npx @callstack/react-native-asset@3.1.0`, which reads `example/react-native.config.js`.
- **AIA Everest**: licensed by AIA, so `.gitignore` keeps its files out of Git. Without them the example still builds, and headings fall back to the system font.

To preview headings in AIA Everest:

1. Ask the AIA design system team for the AIA Everest TrueType files.
2. Copy `AIAEverestRegular.ttf`, `AIAEverestMedium.ttf`, `AIAEverestBold.ttf` and `AIAEverestExtraBold.ttf` into `example/assets/fonts/AIAEverest/`. Each file is named after the PostScript name inside it.
3. Rebuild with `yarn example ios` and `yarn example android`. The iOS project copies the folder into the app, and `example/android/app/build.gradle` turns the files into a font family.

Faces the example does not use, such as the condensed widths and the duplicate OpenType files, stay unlinked in `example/assets/fonts/unlinked/`. Registering them would give two faces the same family name and weight.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
