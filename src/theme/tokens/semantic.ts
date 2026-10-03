import { palette } from '../palette';
import { resolveReferences, type ReferenceTable } from './references';
import type { AliasToken, SemanticColorToken } from './types';

/**
 * Each semantic token as a reference to an alias or map token, or to a palette step.
 * Never a hex literal. JSDoc and `@interim` notes live on `SemanticColorToken`.
 */
const semanticReferences: ReferenceTable<keyof SemanticColorToken, AliasToken> =
  {
    colorInteractiveActionable: (token) => token.colorPrimary,
    colorInteractiveActionablePressed: (token) => token.colorPrimaryActive,
    colorInteractiveHighlighted: () => palette.digitalNavyBlue[500],
    colorInteractiveInformative: (token) => token.colorInfo,
    colorInteractiveInformativePressed: (token) => token.colorInfoActive,
    colorInteractiveSuccess: (token) => token.colorSuccess,
    colorInteractiveSuccessPressed: (token) => token.colorSuccessActive,
    colorInteractiveWarning: (token) => token.colorWarning,
    colorInteractiveWarningPressed: (token) => token.colorWarningActive,
    colorInteractiveError: (token) => token.colorError,
    colorInteractiveErrorPressed: (token) => token.colorErrorActive,
    colorInteractiveDisabled: (token) => token.colorBgContainerDisabled,
  };

/** Names of the semantic tokens. Internal. */
export const semanticTokenKeys: ReadonlySet<string> = new Set(
  Object.keys(semanticReferences)
);

/** Resolves every semantic token against `token`. Internal. */
export function resolveSemanticTokens(token: AliasToken): SemanticColorToken {
  return resolveReferences(semanticReferences, token);
}
