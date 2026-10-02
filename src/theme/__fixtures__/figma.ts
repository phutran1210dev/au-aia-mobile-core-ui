/**
 * Figma values the theme tests assert against. Copied from the Figma MCP on 2026-10-03,
 * never derived from the code under test.
 */

/**
 * `get_variable_defs` on Qi tokens – AIA, node 102:2817, color entries verbatim
 * (Qi code syntax -> hex, lowercase as Figma returns them).
 */
export const qiPrimitives: Readonly<Record<string, string>> = {
  '$monotone-white': '#ffffff',
  '$monotone-black': '#000000',
  '$digitalcharcoal-50': '#f5f5f6',
  '$digitalcharcoal-100': '#ebeced',
  '$digitalcharcoal-200': '#d6d8da',
  '$digitalcharcoal-300': '#adb1b5',
  '$digitalcharcoal-400': '#858b91',
  '$digitalcharcoal-500': '#666e75',
  '$digitalcharcoal-600': '#333d47',
  '$digitalcharcoal-700': '#293139',
  '$digitalcharcoal-800': '#1f252b',
  '$digitalcharcoal-900': '#14181c',
  '$digitalred-50': '#ffedf1',
  '$digitalred-100': '#fadae3',
  '$digitalred-200': '#ec6b8e',
  '$digitalred-300': '#e84671',
  '$digitalred-400': '#e32155',
  '$digitalred-500': '#e00842',
  '$digitalred-600': '#b30635',
  '$digitalred-700': '#860528',
  '$digitalred-800': '#5a031a',
  '$digitalred-900': '#2d020d',
  '$digitalsalmon-50': '#ffe4e7',
  '$digitalsalmon-100': '#ffcfd3',
  '$digitalsalmon-200': '#ffbac0',
  '$digitalsalmon-300': '#ff7a85',
  '$digitalsalmon-400': '#e26276',
  '$digitalsalmon-500': '#c64a67',
  '$digitalsalmon-600': '#982d4f',
  '$digitalpurple-50': '#deddf7',
  '$digitalpurple-100': '#bcbbef',
  '$digitalpurple-200': '#9b9ae6',
  '$digitalpurple-300': '#7978de',
  '$digitalpurple-400': '#5856d6',
  '$digitalpurple-500': '#4645ab',
  '$digitalpurple-600': '#353480',
  '$digitalwarmgrey-50': '#e9e5e1',
  '$digitalwarmgrey-100': '#ded7d2',
  '$digitalwarmgrey-200': '#d3cac3',
  '$digitalwarmgrey-300': '#97908b',
  '$digitalwarmgrey-400': '#79736f',
  '$digitalwarmgrey-500': '#5a5754',
  '$digitalwarmgrey-600': '#3c3a38',
  '$digitallavender-50': '#e7e6f3',
  '$digitallavender-100': '#cfcde7',
  '$digitallavender-200': '#b7b4dc',
  '$digitallavender-300': '#9f9bd0',
  '$digitallavender-400': '#8782c4',
  '$digitallavender-500': '#6c689d',
  '$digitallavender-600': '#514e76',
  '$digitalorange-50': '#ffdfcc',
  '$digitalorange-100': '#ffbf99',
  '$digitalorange-200': '#ff9f66',
  '$digitalorange-300': '#ff7f33',
  '$digitalorange-400': '#ff5f00',
  '$digitalorange-500': '#cc4c00',
  '$digitalorange-600': '#993900',
  '$digitalgold-50': '#efe9db',
  '$digitalgold-100': '#dfd2b7',
  '$digitalgold-200': '#cebc94',
  '$digitalgold-300': '#bea570',
  '$digitalgold-400': '#ae8f4c',
  '$digitalgold-500': '#8b723d',
  '$digitalgold-600': '#68562e',
  '$digitallightgreen-50': '#f1f6e8',
  '$digitallightgreen-100': '#d4e3bb',
  '$digitallightgreen-200': '#a9c877',
  '$digitallightgreen-300': '#8db549',
  '$digitallightgreen-400': '#70a31c',
  '$digitallightgreen-500': '#5a8216',
  '$digitallightgreen-600': '#436211',
  '$digitalnavyblue-50': '#ebedf3',
  '$digitalnavyblue-100': '#dadee8',
  '$digitalnavyblue-200': '#c1c7d9',
  '$digitalnavyblue-300': '#5e6e9b',
  '$digitalnavyblue-400': '#1b3171',
  '$digitalnavyblue-500': '#082065',
  '$digitalnavyblue-600': '#061a51',
  '$digitalgreen-50': '#e9f5f0',
  '$digitalgreen-100': '#a7d9c1',
  '$digitalgreen-200': '#64bc93',
  '$digitalgreen-300': '#229f64',
  '$digitalgreen-400': '#1b7f50',
  '$digitalgreen-500': '#115032',
  '$digitalgreen-600': '#0a301e',
  '$digitalyellow-50': '#fef7df',
  '$digitalyellow-100': '#fce8a1',
  '$digitalyellow-200': '#f9d864',
  '$digitalyellow-300': '#f7c926',
  '$digitalyellow-400': '#bf9b1d',
  '$digitalyellow-500': '#866d15',
  '$digitalyellow-600': '#4e400c',
  '$digitalblue-50': '#e7f0fb',
  '$digitalblue-100': '#9ec5ed',
  '$digitalblue-200': '#3d8adb',
  '$digitalblue-300': '#0c6dd2',
  '$digitalblue-400': '#0a57a8',
  '$digitalblue-500': '#063769',
  '$digitalblue-600': '#04213f',
  '$digitalcerise-50': '#fbe7f1',
  '$digitalcerise-100': '#ec96c3',
  '$digitalcerise-200': '#e0519b',
  '$digitalcerise-300': '#d40c74',
  '$digitalcerise-400': '#a4095a',
  '$digitalcerise-500': '#73073f',
  '$digitalcerise-600': '#430425',
  '$digitalcharcoal-900a70': '#14181cb2',
  '$digitalcharcoal-900a50': '#14181c80',
  '$digitalcharcoal-900a08': '#14181c14',
  'Alpha/digitalcharcoal-900a00': '#14181c00',
  '$monotone-blacka15': '#00000026',
  '$monotone-whitea15': '#ffffff26',
  '$monotone-whitea00': '#ffffff00',
};

/** `get_variable_defs` on DDS AU v2.0.11, node 15329:57416, `Interactive/*` entries verbatim. */
export const ddsInteractive: Readonly<Record<string, string>> = {
  'Interactive/Actionable': '#E00842',
  'Interactive/highlighted': '#082065',
  'Interactive/Informative': '#0C6DD2',
  'Interactive/Success': '#229F64',
};

/** One public token's expected default: its code name, Figma source and Figma hex. */
export interface TokenFixture {
  name: string;
  figma: string;
  hex: string;
}

const qi = (variable: string) => `Qi ${variable}`;

/**
 * Expected default of every public token. `hex` is the Figma value of the Qi variable or
 * DDS variable named in `figma`.
 */
export const tokenFixtures: readonly TokenFixture[] = [
  // Seed
  { name: 'colorPrimary', figma: 'DDS Interactive/Actionable', hex: '#E00842' },
  { name: 'colorSuccess', figma: 'DDS Interactive/Success', hex: '#229F64' },
  { name: 'colorWarning', figma: qi('$digitalyellow-300'), hex: '#F7C926' },
  { name: 'colorError', figma: qi('$digitalcerise-300'), hex: '#D40C74' },
  { name: 'colorInfo', figma: 'DDS Interactive/Informative', hex: '#0C6DD2' },
  { name: 'colorTextBase', figma: qi('$digitalcharcoal-600'), hex: '#333D47' },
  { name: 'colorBgBase', figma: qi('$monotone-white'), hex: '#FFFFFF' },

  // Map: Primary
  { name: 'colorPrimaryBg', figma: qi('$digitalred-50'), hex: '#FFEDF1' },
  { name: 'colorPrimaryBgHover', figma: qi('$digitalred-100'), hex: '#FADAE3' },
  { name: 'colorPrimaryBorder', figma: qi('$digitalred-200'), hex: '#EC6B8E' },
  {
    name: 'colorPrimaryBorderHover',
    figma: qi('$digitalred-300'),
    hex: '#E84671',
  },
  { name: 'colorPrimaryHover', figma: qi('$digitalred-400'), hex: '#E32155' },
  { name: 'colorPrimaryActive', figma: qi('$digitalred-600'), hex: '#B30635' },
  {
    name: 'colorPrimaryTextHover',
    figma: qi('$digitalred-400'),
    hex: '#E32155',
  },
  { name: 'colorPrimaryText', figma: qi('$digitalred-500'), hex: '#E00842' },
  {
    name: 'colorPrimaryTextActive',
    figma: qi('$digitalred-600'),
    hex: '#B30635',
  },

  // Map: Success
  { name: 'colorSuccessBg', figma: qi('$digitalgreen-50'), hex: '#E9F5F0' },
  {
    name: 'colorSuccessBgHover',
    figma: qi('$digitalgreen-100'),
    hex: '#A7D9C1',
  },
  {
    name: 'colorSuccessBorder',
    figma: qi('$digitalgreen-100'),
    hex: '#A7D9C1',
  },
  {
    name: 'colorSuccessBorderHover',
    figma: qi('$digitalgreen-200'),
    hex: '#64BC93',
  },
  { name: 'colorSuccessHover', figma: qi('$digitalgreen-200'), hex: '#64BC93' },
  {
    name: 'colorSuccessActive',
    figma: qi('$digitalgreen-400'),
    hex: '#1B7F50',
  },
  {
    name: 'colorSuccessTextHover',
    figma: qi('$digitalgreen-200'),
    hex: '#64BC93',
  },
  { name: 'colorSuccessText', figma: qi('$digitalgreen-300'), hex: '#229F64' },
  {
    name: 'colorSuccessTextActive',
    figma: qi('$digitalgreen-400'),
    hex: '#1B7F50',
  },

  // Map: Warning
  { name: 'colorWarningBg', figma: qi('$digitalyellow-50'), hex: '#FEF7DF' },
  {
    name: 'colorWarningBgHover',
    figma: qi('$digitalyellow-100'),
    hex: '#FCE8A1',
  },
  {
    name: 'colorWarningBorder',
    figma: qi('$digitalyellow-100'),
    hex: '#FCE8A1',
  },
  {
    name: 'colorWarningBorderHover',
    figma: qi('$digitalyellow-200'),
    hex: '#F9D864',
  },
  {
    name: 'colorWarningHover',
    figma: qi('$digitalyellow-200'),
    hex: '#F9D864',
  },
  {
    name: 'colorWarningActive',
    figma: qi('$digitalyellow-400'),
    hex: '#BF9B1D',
  },
  {
    name: 'colorWarningTextHover',
    figma: qi('$digitalyellow-200'),
    hex: '#F9D864',
  },
  { name: 'colorWarningText', figma: qi('$digitalyellow-300'), hex: '#F7C926' },
  {
    name: 'colorWarningTextActive',
    figma: qi('$digitalyellow-400'),
    hex: '#BF9B1D',
  },

  // Map: Error
  { name: 'colorErrorBg', figma: qi('$digitalcerise-50'), hex: '#FBE7F1' },
  {
    name: 'colorErrorBgHover',
    figma: qi('$digitalcerise-100'),
    hex: '#EC96C3',
  },
  { name: 'colorErrorBorder', figma: qi('$digitalcerise-100'), hex: '#EC96C3' },
  {
    name: 'colorErrorBorderHover',
    figma: qi('$digitalcerise-200'),
    hex: '#E0519B',
  },
  { name: 'colorErrorHover', figma: qi('$digitalcerise-200'), hex: '#E0519B' },
  { name: 'colorErrorActive', figma: qi('$digitalcerise-400'), hex: '#A4095A' },
  {
    name: 'colorErrorTextHover',
    figma: qi('$digitalcerise-200'),
    hex: '#E0519B',
  },
  { name: 'colorErrorText', figma: qi('$digitalcerise-300'), hex: '#D40C74' },
  {
    name: 'colorErrorTextActive',
    figma: qi('$digitalcerise-400'),
    hex: '#A4095A',
  },

  // Map: Info
  { name: 'colorInfoBg', figma: qi('$digitalblue-50'), hex: '#E7F0FB' },
  { name: 'colorInfoBgHover', figma: qi('$digitalblue-100'), hex: '#9EC5ED' },
  { name: 'colorInfoBorder', figma: qi('$digitalblue-100'), hex: '#9EC5ED' },
  {
    name: 'colorInfoBorderHover',
    figma: qi('$digitalblue-200'),
    hex: '#3D8ADB',
  },
  { name: 'colorInfoHover', figma: qi('$digitalblue-200'), hex: '#3D8ADB' },
  { name: 'colorInfoActive', figma: qi('$digitalblue-400'), hex: '#0A57A8' },
  { name: 'colorInfoTextHover', figma: qi('$digitalblue-200'), hex: '#3D8ADB' },
  { name: 'colorInfoText', figma: qi('$digitalblue-300'), hex: '#0C6DD2' },
  {
    name: 'colorInfoTextActive',
    figma: qi('$digitalblue-400'),
    hex: '#0A57A8',
  },

  // Map: Neutrals
  { name: 'colorText', figma: qi('$digitalcharcoal-600'), hex: '#333D47' },
  {
    name: 'colorTextSecondary',
    figma: qi('$digitalcharcoal-500'),
    hex: '#666E75',
  },
  {
    name: 'colorTextTertiary',
    figma: qi('$digitalcharcoal-400'),
    hex: '#858B91',
  },
  {
    name: 'colorTextQuaternary',
    figma: qi('$digitalcharcoal-300'),
    hex: '#ADB1B5',
  },
  { name: 'colorBorder', figma: qi('$digitalcharcoal-200'), hex: '#D6D8DA' },
  {
    name: 'colorBorderSecondary',
    figma: qi('$digitalcharcoal-100'),
    hex: '#EBECED',
  },
  { name: 'colorBgLayout', figma: qi('$digitalcharcoal-50'), hex: '#F5F5F6' },
  { name: 'colorBgContainer', figma: qi('$monotone-white'), hex: '#FFFFFF' },
  {
    name: 'colorBgMask',
    figma: qi('$digitalcharcoal-900a50'),
    hex: '#14181C80',
  },
  { name: 'colorWhite', figma: qi('$monotone-white'), hex: '#FFFFFF' },

  // Alias
  {
    name: 'colorTextDisabled',
    figma: qi('$digitalcharcoal-300'),
    hex: '#ADB1B5',
  },
  {
    name: 'colorTextPlaceholder',
    figma: qi('$digitalcharcoal-300'),
    hex: '#ADB1B5',
  },
  {
    name: 'colorTextHeading',
    figma: qi('$digitalcharcoal-600'),
    hex: '#333D47',
  },
  { name: 'colorTextLabel', figma: qi('$digitalcharcoal-500'), hex: '#666E75' },
  {
    name: 'colorTextDescription',
    figma: qi('$digitalcharcoal-400'),
    hex: '#858B91',
  },
  { name: 'colorTextLightSolid', figma: qi('$monotone-white'), hex: '#FFFFFF' },
  { name: 'colorIcon', figma: qi('$digitalcharcoal-400'), hex: '#858B91' },
  { name: 'colorIconHover', figma: qi('$digitalcharcoal-600'), hex: '#333D47' },
  { name: 'colorBorderBg', figma: qi('$monotone-white'), hex: '#FFFFFF' },
  { name: 'controlItemBgActive', figma: qi('$digitalred-50'), hex: '#FFEDF1' },
  {
    name: 'controlItemBgActiveHover',
    figma: qi('$digitalred-100'),
    hex: '#FADAE3',
  },
  {
    name: 'colorBgContainerDisabled',
    figma: qi('$digitalcharcoal-50'),
    hex: '#F5F5F6',
  },

  // Semantic
  {
    name: 'colorInteractiveActionable',
    figma: 'DDS Interactive/Actionable',
    hex: '#E00842',
  },
  {
    name: 'colorInteractiveActionablePressed',
    figma: qi('$digitalred-600'),
    hex: '#B30635',
  },
  {
    name: 'colorInteractiveHighlighted',
    figma: 'DDS Interactive/highlighted',
    hex: '#082065',
  },
  {
    name: 'colorInteractiveInformative',
    figma: 'DDS Interactive/Informative',
    hex: '#0C6DD2',
  },
  {
    name: 'colorInteractiveInformativePressed',
    figma: qi('$digitalblue-400'),
    hex: '#0A57A8',
  },
  {
    name: 'colorInteractiveSuccess',
    figma: 'DDS Interactive/Success',
    hex: '#229F64',
  },
  {
    name: 'colorInteractiveSuccessPressed',
    figma: qi('$digitalgreen-400'),
    hex: '#1B7F50',
  },
  {
    name: 'colorInteractiveWarning',
    figma: qi('$digitalyellow-300'),
    hex: '#F7C926',
  },
  {
    name: 'colorInteractiveWarningPressed',
    figma: qi('$digitalyellow-400'),
    hex: '#BF9B1D',
  },
  {
    name: 'colorInteractiveError',
    figma: qi('$digitalcerise-300'),
    hex: '#D40C74',
  },
  {
    name: 'colorInteractiveErrorPressed',
    figma: qi('$digitalcerise-400'),
    hex: '#A4095A',
  },
  {
    name: 'colorInteractiveDisabled',
    figma: qi('$digitalcharcoal-50'),
    hex: '#F5F5F6',
  },
];

/** The Figma hex of one public token's default. Throws for a name with no fixture. */
export function figmaValue(name: string): string {
  const fixture = tokenFixtures.find((entry) => entry.name === name);
  if (!fixture) {
    throw new Error(`No Figma fixture for ${name}`);
  }
  return fixture.hex;
}
