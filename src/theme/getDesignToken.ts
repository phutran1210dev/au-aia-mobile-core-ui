import { mergeThemeConfig, resolveToken } from './resolver';
import type { GlobalToken } from './tokens/types';
import type { ThemeConfig } from './types';

/**
 * Resolves a theme config outside React, for example in a navigation theme or a test.
 * Deep-equals `theme.useToken().token` under `<ConfigProvider theme={config}>` at the root.
 * Exposed as `theme.getDesignToken`.
 *
 * @example
 * const token = theme.getDesignToken({ token: { colorPrimary: '#RRGGBB' } });
 */
export function getDesignToken(config?: ThemeConfig): GlobalToken {
  return resolveToken(mergeThemeConfig({}, config));
}
