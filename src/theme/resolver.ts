import { defaultAlgorithm } from './algorithms/default';
import { deriveAliasTokens } from './tokens/alias';
import { defaultSeed, seedTokenKeys } from './tokens/seed';
import { resolveSemanticTokens, semanticTokenKeys } from './tokens/semantic';
import type {
  AliasToken,
  GlobalToken,
  MapToken,
  SeedToken,
} from './tokens/types';
import type {
  ComponentThemeConfig,
  MappingAlgorithm,
  ThemeConfig,
} from './types';
import { createCache } from './utils/createCache';
import { deepMerge } from './utils/deepMerge';
import { stableKey } from './utils/stableKey';

type TokenRecord = Record<string, unknown>;

const tokenCache = createCache<GlobalToken>();
const componentTokenCache = createCache<GlobalToken>();

function toAlgorithms(
  algorithm: MappingAlgorithm | MappingAlgorithm[] | undefined
): MappingAlgorithm[] {
  const algorithms = Array.isArray(algorithm) ? algorithm : [algorithm];
  const defined = algorithms.filter(
    (item): item is MappingAlgorithm => typeof item === 'function'
  );
  return defined.length > 0 ? defined : [defaultAlgorithm];
}

/** A copy without `undefined` values, which count as "not set". */
function withoutUndefined(token: TokenRecord | undefined): TokenRecord {
  const result: TokenRecord = {};
  for (const [key, value] of Object.entries(token ?? {})) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

function splitKeys(token: TokenRecord, keys: ReadonlySet<string>) {
  const picked: TokenRecord = {};
  const rest: TokenRecord = {};
  for (const [key, value] of Object.entries(token)) {
    (keys.has(key) ? picked : rest)[key] = value;
  }
  return { picked, rest };
}

/** Steps 1-2 of the resolution order: merge seeds, then run the algorithms. */
function deriveMap(
  seedOverrides: TokenRecord,
  algorithms: MappingAlgorithm[]
): MapToken {
  const seed = { ...defaultSeed, ...seedOverrides } as SeedToken;
  let map: MapToken | undefined;
  for (const algorithm of algorithms) {
    map = algorithm(seed, map);
  }
  return map as MapToken;
}

/**
 * Steps 3-5: map and alias overrides apply exactly, alias and semantic tokens resolve by
 * reference against the result, then semantic overrides apply. Custom keys pass through.
 */
function applyOverridesAndResolve(
  map: MapToken,
  overrides: TokenRecord
): GlobalToken {
  const { picked: semanticOverrides, rest } = splitKeys(
    overrides,
    semanticTokenKeys
  );
  const mapped = { ...map, ...rest } as MapToken;
  const aliased = {
    ...mapped,
    ...deriveAliasTokens(mapped),
    ...rest,
  } as AliasToken;
  return Object.freeze({
    ...aliased,
    ...resolveSemanticTokens(aliased),
    ...semanticOverrides,
  }) as GlobalToken;
}

/** What one resolution needs: token overrides, algorithms, and keys to apply exactly. */
interface ResolveInput {
  token: TokenRecord;
  algorithms: MappingAlgorithm[];
  /** Applied after `token`'s overrides, seeds included, without regenerating anything. */
  exactOverrides?: TokenRecord;
}

/** Every resolution path (theme, component with or without its algorithm) runs through here. */
function resolveFrom({
  token,
  algorithms,
  exactOverrides = {},
}: ResolveInput): GlobalToken {
  const { picked: seeds, rest } = splitKeys(token, seedTokenKeys);
  return applyOverridesAndResolve(deriveMap(seeds, algorithms), {
    ...rest,
    ...exactOverrides,
  });
}

/** The theme's own token overrides and algorithms. */
function fromTheme(config: ThemeConfig): ResolveInput {
  return {
    token: withoutUndefined(config.token as TokenRecord),
    algorithms: toAlgorithms(config.algorithm),
  };
}

function tokenKey(config: ThemeConfig): string {
  return stableKey([config.token ?? {}, toAlgorithms(config.algorithm)]);
}

/**
 * The single pure resolver behind `ConfigProvider`, `theme.useToken` and
 * `theme.getDesignToken`. Structurally equal configs return the same frozen object.
 * `config.components` does not affect the global token.
 */
export function resolveToken(config: ThemeConfig): GlobalToken {
  return tokenCache(tokenKey(config), () => resolveFrom(fromTheme(config)));
}

function computeComponentToken(
  config: ThemeConfig,
  componentConfig: ComponentThemeConfig
): GlobalToken {
  const { algorithm = false, ...componentToken } = componentConfig;
  const theme = fromTheme(config);
  const componentOverrides = withoutUndefined(componentToken as TokenRecord);

  if (algorithm === false) {
    // The theme's map stays; the component's keys apply exactly.
    return resolveFrom({ ...theme, exactOverrides: componentOverrides });
  }
  // The component's seeds regenerate their families.
  return resolveFrom({
    token: { ...theme.token, ...componentOverrides },
    algorithms: algorithm === true ? theme.algorithms : toAlgorithms(algorithm),
  });
}

/**
 * The token one component sees: the theme's token with `theme.components[component]`
 * applied (override priority step 4). Without component overrides it is the global token.
 */
export function resolveComponentToken(
  config: ThemeConfig,
  component: string
): GlobalToken {
  const componentConfig = config.components?.[component];
  if (!componentConfig) {
    return resolveToken(config);
  }
  return componentTokenCache(
    `${tokenKey(config)}|${stableKey(componentConfig)}`,
    () => computeComponentToken(config, componentConfig)
  );
}

/**
 * The theme config a provider resolves: its own config merged over the parent's when
 * `inherit` is true (the default), or on its own when `inherit` is false. Configs merge,
 * resolved tokens never do. The result never carries `inherit`.
 */
export function mergeThemeConfig(
  parent: ThemeConfig,
  own: ThemeConfig | undefined
): ThemeConfig {
  const { inherit = true, ...ownConfig } = own ?? {};
  return deepMerge(inherit ? parent : {}, ownConfig);
}
