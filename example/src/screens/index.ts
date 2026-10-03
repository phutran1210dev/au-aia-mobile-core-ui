import type { ComponentType } from 'react';

import { ColorTokensScreen } from './color-tokens/ColorTokensScreen';
import { TypographyMotionScreen } from './typography-motion/TypographyMotionScreen';

interface PlaygroundScreen {
  key: string;
  title: string;
  component: ComponentType;
}

/** Every playground screen, one per feature. `Playground` renders them as tabs. */
export const screens: readonly [PlaygroundScreen, ...PlaygroundScreen[]] = [
  { key: 'color-tokens', title: 'Color tokens', component: ColorTokensScreen },
  {
    key: 'typography-motion',
    title: 'Type and motion',
    component: TypographyMotionScreen,
  },
];
