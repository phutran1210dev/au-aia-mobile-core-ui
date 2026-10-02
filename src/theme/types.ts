import type { GlobalToken, MapToken, SeedToken } from './tokens/types';

/**
 * Turns seed tokens into map tokens. Algorithms in an array run in order, and each one
 * receives the previous one's result, as in antd.
 */
export type MappingAlgorithm = (
  seed: SeedToken,
  mapToken?: MapToken
) => MapToken;

/**
 * Theme overrides for every instance of one component, such as `components.Button`.
 */
export type ComponentThemeConfig = Partial<GlobalToken> & {
  /**
   * `false` (default) applies the keys exactly; tokens that reference them still follow.
   * `true` re-runs the theme's algorithm with this component's seed tokens.
   * A function or array is used as this component's algorithm.
   */
  algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
};

/**
 * Per-component overrides, keyed by component name. Components add their own keys by
 * module augmentation as the UI kit grows.
 */
export interface ComponentsConfig {
  [componentName: string]: ComponentThemeConfig | undefined;
}

/**
 * The `theme` prop of `ConfigProvider`, and the argument of `theme.getDesignToken`.
 * Mirrors antd's ThemeConfig.
 */
export interface ThemeConfig {
  /** Token overrides: seed, map, alias, semantic or custom keys. */
  token?: Partial<GlobalToken>;
  /** Algorithm or algorithms that derive map tokens from seeds. Default: `theme.defaultAlgorithm`. */
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  /** Per-component overrides. */
  components?: ComponentsConfig;
  /**
   * `true` (default) merges the parent provider's theme config with this one.
   * `false` starts again from the library defaults.
   */
  inherit?: boolean;
}

/** Size of components in a subtree. antd says `middle`; this library says `medium`. */
export type ComponentSize = 'small' | 'medium' | 'large';
