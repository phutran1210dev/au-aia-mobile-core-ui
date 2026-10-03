import { defaultAlgorithm } from './algorithms/default';
import { getDesignToken } from './getDesignToken';
import { useToken } from './hooks';

/**
 * Theme helpers.
 *
 * - `defaultAlgorithm`: the light algorithm. The default theme outputs the Figma values.
 * - `useToken()`: `{ token }` of the nearest `ConfigProvider`.
 * - `getDesignToken(config)`: the same token, resolved outside React.
 *
 * There is no `darkAlgorithm` or `compactAlgorithm` yet: Figma defines no dark values or
 * compact sizes. `ThemeConfig['algorithm']` already accepts an array for them.
 */
export const theme = Object.freeze({
  defaultAlgorithm,
  useToken,
  getDesignToken,
});

export { ConfigProvider } from './config-provider/ConfigProvider';
export type { ConfigProviderProps } from './config-provider/ConfigProvider';
export type { ConfigConsumerProps } from './config-provider/context';
export { createStyles } from './createStyles';
export type { CreateStylesOptions, NamedStyles } from './createStyles';
export type { UseTokenResult } from './hooks';
export type {
  AliasToken,
  CustomToken,
  GlobalToken,
  MapToken,
  SeedToken,
  SemanticColorToken,
} from './tokens/types';
export type {
  ComponentSize,
  ComponentsConfig,
  ComponentThemeConfig,
  MappingAlgorithm,
  ThemeConfig,
} from './types';
