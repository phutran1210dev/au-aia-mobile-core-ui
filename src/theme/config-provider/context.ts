import { createContext } from 'react';

import { mergeThemeConfig, resolveToken } from '../resolver';
import type { GlobalToken } from '../tokens/types';
import type { ComponentSize, ThemeConfig } from '../types';
import { createCache } from '../utils/createCache';
import { stableKey } from '../utils/stableKey';

/** What a provider passes down for theming. Internal: never exported (theme.md). */
export interface ThemeContextValue {
  /** The merged theme config, kept so nested providers merge configs, never tokens. */
  readonly config: ThemeConfig;
  /** The resolved global token. */
  readonly token: GlobalToken;
}

/** What `ConfigProvider.useConfig()` returns. */
export interface ConfigConsumerProps {
  /** Size of components in this subtree. Default `'medium'`. */
  componentSize: ComponentSize;
  /** Whether components in this subtree render disabled. Default `false`. */
  componentDisabled: boolean;
}

const themeValueCache = createCache<ThemeContextValue>();

/**
 * The theme context value for a provider: its config merged with the parent's, then
 * resolved. Structurally equal results return the same object, so a parent re-render with
 * an inline `theme={{...}}` does not re-render token consumers.
 */
export function getThemeContextValue(
  own: ThemeConfig | undefined,
  parent: ThemeConfig
): ThemeContextValue {
  const config = mergeThemeConfig(parent, own);
  return themeValueCache(stableKey(config), () =>
    Object.freeze({ config, token: resolveToken(config) })
  );
}

/** Library defaults, used when no provider is mounted. */
export const ThemeContext = createContext<ThemeContextValue>(
  getThemeContextValue(undefined, {})
);

/** Library defaults for size and disabled, used when no provider sets them. */
export const defaultComponentConfig: ConfigConsumerProps = Object.freeze({
  componentSize: 'medium',
  componentDisabled: false,
});

/** Size and disabled, kept apart from tokens so each changes without re-rendering the other's consumers. */
export const ComponentConfigContext = createContext<ConfigConsumerProps>(
  defaultComponentConfig
);
