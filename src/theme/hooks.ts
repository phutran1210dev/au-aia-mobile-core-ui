import { use } from 'react';

import { ThemeContext } from './config-provider/context';
import { resolveComponentToken } from './resolver';
import type { GlobalToken } from './tokens/types';

/** What {@link useToken} returns. */
export interface UseTokenResult {
  /** The resolved token of the nearest `ConfigProvider`, or the library defaults. */
  token: GlobalToken;
}

/**
 * The resolved design token of the nearest `ConfigProvider`, or the library defaults
 * without one. The same theme values always give the same `token` object.
 * Exposed as `theme.useToken`.
 */
export function useToken(): UseTokenResult {
  const { token } = use(ThemeContext);
  return { token };
}

/**
 * The token a component sees, with `theme.components[component]` applied. Internal: used
 * by `createStyles` and, later, by UI kit components.
 */
export function useComponentToken(component?: string): GlobalToken {
  const { config, token } = use(ThemeContext);
  return component ? resolveComponentToken(config, component) : token;
}
