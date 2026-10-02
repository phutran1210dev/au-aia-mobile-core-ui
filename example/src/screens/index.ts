import type { ComponentType } from 'react';

import { ColorTokensScreen } from './color-tokens/ColorTokensScreen';

interface PlaygroundScreen {
  key: string;
  title: string;
  component: ComponentType;
}

/** Every playground screen, one per feature. `Playground` renders them as tabs. */
export const screens: readonly [PlaygroundScreen, ...PlaygroundScreen[]] = [
  { key: 'color-tokens', title: 'Color tokens', component: ColorTokensScreen },
];
