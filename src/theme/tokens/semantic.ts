import { palette } from '../palette';
import { typography } from '../typography';
import { resolveReferences, type ReferenceTable } from './references';
import type {
  AliasToken,
  SemanticColorToken,
  SemanticTypographyToken,
} from './types';

/**
 * Each semantic color token as a reference to an alias or map token, or to a palette step.
 * Never a hex literal. JSDoc and `@interim` notes live on `SemanticColorToken`.
 */
const semanticColorReferences: ReferenceTable<SemanticColorToken, AliasToken> =
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

/**
 * Each semantic typography token as a Qi typography value. None has a reference-model
 * equivalent to point at (see `SemanticTypographyToken`).
 */
const semanticTypographyReferences: ReferenceTable<
  SemanticTypographyToken,
  AliasToken
> = {
  fontFamilyHeadline: () => typography.family.headline,
  fontWeightHeadline: () => typography.weight.headline,
  fontWeightHeadlineThin: () => typography.weight.headlineThin,
  fontWeightBody: () => typography.weight.body,
  fontWeightBodyStrong2: () => typography.weight.bodyStrong2,
  fontSizeBody4: () => typography.size.body4,
  lineHeightBody4: () => typography.lineHeight.body4 / typography.size.body4,
  lineHeightHeadline6: () =>
    typography.lineHeight.headline6 / typography.size.headline6,
  letterSpacingBody: () => typography.letterSpacing.body,
  letterSpacingHeadline1: () => typography.letterSpacing.headline1,
  letterSpacingHeadline2: () => typography.letterSpacing.headline2,
  letterSpacingHeadline3: () => typography.letterSpacing.headline3,
  letterSpacingHeadline4: () => typography.letterSpacing.headline4,
  letterSpacingHeadline5: () => typography.letterSpacing.headline5,
  letterSpacingHeadline6: () => typography.letterSpacing.headline6,
};

/** Every semantic token, color and typography. Internal. */
export type SemanticToken = SemanticColorToken & SemanticTypographyToken;

/** Names of the semantic tokens. Internal. */
export const semanticTokenKeys: ReadonlySet<string> = new Set([
  ...Object.keys(semanticColorReferences),
  ...Object.keys(semanticTypographyReferences),
]);

/** Resolves every semantic token against `token`. Internal. */
export function resolveSemanticTokens(token: AliasToken): SemanticToken {
  return {
    ...resolveReferences(semanticColorReferences, token),
    ...resolveReferences(semanticTypographyReferences, token),
  };
}
