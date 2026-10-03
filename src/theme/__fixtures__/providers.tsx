import type { ReactNode } from 'react';

import {
  ConfigProvider,
  theme,
  type ConfigProviderProps,
  type GlobalToken,
} from '../../index';

type ProviderLayer = Omit<ConfigProviderProps, 'children'>;

/**
 * A `render` / `renderHook` wrapper of nested `ConfigProvider`s, outermost first:
 * `withProvider({ theme: parent }, { theme: child })`.
 */
export function withProvider(...layers: ProviderLayer[]) {
  return function ProviderWrapper({ children }: { children: ReactNode }) {
    return layers.reduceRight<ReactNode>(
      (inner, props) => <ConfigProvider {...props}>{inner}</ConfigProvider>,
      children
    );
  };
}

/** A `Probe` component that records the token it sees under its `name`. */
export function createTokenProbes() {
  const seen: Record<string, GlobalToken> = {};
  function Probe({ name }: { name: string }) {
    seen[name] = theme.useToken().token;
    return null;
  }
  return { seen, Probe };
}
