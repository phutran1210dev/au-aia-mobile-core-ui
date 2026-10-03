/**
 * Public API of @au-aia/mobile-core-ui. Everything exported here is public; the palette,
 * the resolver and the React contexts are not (hard rule 4, theme.md).
 */
export { ConfigProvider, createStyles, theme } from './theme';
export type {
  AliasToken,
  ComponentSize,
  ComponentsConfig,
  ComponentThemeConfig,
  ConfigConsumerProps,
  ConfigProviderProps,
  CreateStylesOptions,
  CustomToken,
  GlobalToken,
  MappingAlgorithm,
  MapToken,
  NamedStyles,
  SeedToken,
  SemanticColorToken,
  ThemeConfig,
  UseTokenResult,
} from './theme';
