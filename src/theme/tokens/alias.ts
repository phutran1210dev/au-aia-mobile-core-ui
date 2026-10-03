import { resolveReferences, type ReferenceTable } from './references';
import type { AliasToken, MapToken } from './types';

type AliasOnlyToken = Omit<AliasToken, keyof MapToken>;

/**
 * Each alias token as a reference to a map token. colorBgContainerDisabled references
 * colorBgLayout until fill tokens exist (see `AliasToken`).
 */
const aliasReferences: ReferenceTable<keyof AliasOnlyToken, MapToken> = {
  colorTextDisabled: (map) => map.colorTextQuaternary,
  colorTextPlaceholder: (map) => map.colorTextQuaternary,
  colorTextHeading: (map) => map.colorText,
  colorTextLabel: (map) => map.colorTextSecondary,
  colorTextDescription: (map) => map.colorTextTertiary,
  colorTextLightSolid: (map) => map.colorWhite,
  colorIcon: (map) => map.colorTextTertiary,
  colorIconHover: (map) => map.colorText,
  colorBorderBg: (map) => map.colorBgContainer,
  controlItemBgActive: (map) => map.colorPrimaryBg,
  controlItemBgActiveHover: (map) => map.colorPrimaryBgHover,
  colorBgContainerDisabled: (map) => map.colorBgLayout,
};

/** Resolves every alias token against `map`. Internal. */
export function deriveAliasTokens(map: MapToken): AliasOnlyToken {
  return resolveReferences(aliasReferences, map);
}
