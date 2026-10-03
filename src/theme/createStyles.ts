import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type { ConfigConsumerProps } from './config-provider/context';
import { useConfig } from './config-provider/useConfig';
import { useComponentToken } from './hooks';
import type { GlobalToken } from './tokens/types';

/** A named set of styles, as `StyleSheet.create` takes. */
export type NamedStyles<S> = {
  [K in keyof S]: ViewStyle | TextStyle | ImageStyle;
};

/** Options of {@link createStyles}. */
export interface CreateStylesOptions {
  /**
   * Component name whose `theme.components` overrides apply to the token, such as
   * `'Button'`. Omit it to style with the global token.
   * @experimental It may change while the UI kit takes shape.
   */
  component?: string;
}

/**
 * Creates a `useStyles()` hook that builds theme-aware styles. The `StyleSheet` is built
 * once per resolved token object and per `componentSize` / `componentDisabled`, then
 * cached, never once per render. The `options.component` argument is experimental.
 *
 * @example
 * const useStyles = createStyles((token, { componentSize }) => ({
 *   container: {
 *     backgroundColor: token.colorBgContainer,
 *     padding: componentSize === 'small' ? 8 : 12,
 *   },
 * }));
 *
 * function Card() {
 *   const styles = useStyles();
 *   return <View style={styles.container} />;
 * }
 */
export function createStyles<S extends NamedStyles<S>>(
  factory: (token: GlobalToken, config: ConfigConsumerProps) => S,
  options: CreateStylesOptions = {}
): () => Readonly<S> {
  const cache = new WeakMap<GlobalToken, Map<string, Readonly<S>>>();

  return function useStyles() {
    const token = useComponentToken(options.component);
    const config = useConfig();

    let byConfig = cache.get(token);
    if (!byConfig) {
      byConfig = new Map();
      cache.set(token, byConfig);
    }
    const key = `${config.componentSize}|${config.componentDisabled}`;
    let styles = byConfig.get(key);
    if (!styles) {
      styles = StyleSheet.create(factory(token, config));
      byConfig.set(key, styles);
    }
    return styles;
  };
}
