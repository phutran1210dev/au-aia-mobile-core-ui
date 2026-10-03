import { use, useMemo, type ReactNode } from 'react';

import type { ComponentSize, ThemeConfig } from '../types';
import {
  ComponentConfigContext,
  getThemeContextValue,
  ThemeContext,
} from './context';
import { useConfig } from './useConfig';

/** Props of {@link ConfigProvider}. */
export interface ConfigProviderProps {
  /** Theme overrides for this subtree. `undefined` behaves exactly like `{}`. */
  theme?: ThemeConfig;
  /** Size of components in this subtree. Inherited from the parent provider when unset. */
  componentSize?: ComponentSize;
  /** Renders components in this subtree disabled. Inherited from the parent provider when unset. */
  componentDisabled?: boolean;
  children?: ReactNode;
}

/**
 * Provides the theme, component size and disabled state to a subtree.
 * Nested providers merge their parent's theme config unless
 * `theme.inherit` is `false`.
 *
 * @example
 * <ConfigProvider theme={{ token: { colorPrimary: '#RRGGBB' } }}>
 *   <App />
 * </ConfigProvider>
 */
export function ConfigProvider({
  theme,
  componentSize,
  componentDisabled,
  children,
}: ConfigProviderProps) {
  const parentTheme = use(ThemeContext);
  const parentConfig = useConfig();

  // Cached by structure, so inline theme objects keep the same context value.
  const themeValue = useMemo(
    () => getThemeContextValue(theme, parentTheme.config),
    [theme, parentTheme]
  );

  const size = componentSize ?? parentConfig.componentSize;
  const disabled = componentDisabled ?? parentConfig.componentDisabled;
  const configValue = useMemo(
    () => ({ componentSize: size, componentDisabled: disabled }),
    [size, disabled]
  );

  // Always the same element tree, so switching `theme` between undefined and an object
  // never re-mounts children.
  return (
    <ThemeContext value={themeValue}>
      <ComponentConfigContext value={configValue}>
        {children}
      </ComponentConfigContext>
    </ThemeContext>
  );
}

/** The nearest `componentSize` and `componentDisabled`. */
ConfigProvider.useConfig = useConfig;
