import { describe, expect, it } from '@jest/globals';

import { theme } from '../../index';
import { platformDefaults, referenceDefaults } from '../__fixtures__/defaults';
import {
  ddsInteractive,
  qiPrimitives,
  qiTypography,
  qiWeightNumbers,
  tokenFixtures,
  typographyFixtures,
} from '../__fixtures__/figma';
import { palette } from '../palette';

/** Every palette value keyed by its Qi variable name, e.g. `digitalred-500`. */
function paletteByQiName(): Map<string, string> {
  const entries = new Map<string, string>();
  for (const [family, steps] of Object.entries(palette)) {
    for (const [step, hex] of Object.entries(steps)) {
      const name =
        family === 'alpha'
          ? step.replace(/^(digitalCharcoal|monotone)/, '$1-').toLowerCase()
          : `${family.toLowerCase()}-${step.toLowerCase()}`;
      entries.set(name, hex);
    }
  }
  return entries;
}

const qiName = (variable: string) => variable.replace(/^(\$|Alpha\/)/, '');

describe('palette', () => {
  it('holds every Qi primitive with its exact Figma value', () => {
    const byName = paletteByQiName();
    for (const [variable, hex] of Object.entries(qiPrimitives)) {
      expect({
        variable,
        hex: byName.get(qiName(variable))?.toLowerCase(),
      }).toEqual({
        variable,
        hex,
      });
    }
  });

  it('holds nothing that is not a Qi primitive', () => {
    const qiNames = new Set(Object.keys(qiPrimitives).map(qiName));
    expect(
      [...paletteByQiName().keys()].filter((name) => !qiNames.has(name))
    ).toEqual([]);
  });
});

describe('token fixtures', () => {
  it('copy their hex from the Figma variable they name', () => {
    for (const { name, figma, hex } of tokenFixtures) {
      const source = figma.startsWith('Qi ')
        ? qiPrimitives[figma.slice(3)]
        : ddsInteractive[figma.slice(4)];
      expect({ name, hex: source?.toUpperCase() }).toEqual({ name, hex });
    }
  });

  it('copy their typography value from the Qi variable they name', () => {
    for (const { name, qi, per, value } of typographyFixtures) {
      const source = qiTypography[qi];
      const expected =
        per !== undefined
          ? Number(source) / Number(qiTypography[per])
          : (qiWeightNumbers[String(source)] ?? source);
      expect({ name, value: expected }).toEqual({ name, value });
    }
  });
});

describe('default theme', () => {
  const token: Record<string, unknown> = { ...theme.getDesignToken() };

  it('equals the Figma value of every seed, map, alias and semantic token', () => {
    for (const { name, hex } of tokenFixtures) {
      expect({ name, value: token[name] }).toEqual({ name, value: hex });
    }
  });

  it('equals the Qi value of every typography token', () => {
    for (const { name, value } of typographyFixtures) {
      expect({ name, value: token[name] }).toEqual({ name, value });
    }
  });

  it('keeps the Figma px when a line-height ratio is applied to its size', () => {
    const pairs = [
      ['fontSize', 'lineHeight', 'Line height/body2'],
      ['fontSizeSM', 'lineHeightSM', 'Line height/body3'],
      ['fontSizeLG', 'lineHeightLG', 'Line height/body1'],
      [
        'fontSizeHeading1',
        'lineHeightHeading1',
        'Line height/Mobile/headline1',
      ],
      [
        'fontSizeHeading2',
        'lineHeightHeading2',
        'Line height/Mobile/headline2',
      ],
      [
        'fontSizeHeading3',
        'lineHeightHeading3',
        'Line height/Mobile/headline3',
      ],
      [
        'fontSizeHeading4',
        'lineHeightHeading4',
        'Line height/Mobile/headline4',
      ],
      [
        'fontSizeHeading5',
        'lineHeightHeading5',
        'Line height/Mobile/headline5',
      ],
      ['fontSizeXL', 'lineHeightHeadline6', 'Line height/Mobile/headline6'],
      ['fontSizeBody4', 'lineHeightBody4', 'Line height/body4'],
    ] as const;
    for (const [size, ratio, qi] of pairs) {
      const px = Math.round(Number(token[size]) * Number(token[ratio]));
      expect({ ratio, px }).toEqual({ ratio, px: qiTypography[qi] });
    }
  });

  it('takes the reference default of every token Figma does not define', () => {
    for (const [name, value] of Object.entries({
      ...referenceDefaults,
      ...platformDefaults,
    })) {
      expect({ name, value: token[name] }).toEqual({ name, value });
    }
  });

  it('has a fixture for every token it outputs', () => {
    const fixtureNames = new Set([
      ...[...tokenFixtures, ...typographyFixtures].map(({ name }) => name),
      ...Object.keys(referenceDefaults),
      ...Object.keys(platformDefaults),
    ]);
    expect(
      Object.keys(token).filter((name) => !fixtureNames.has(name))
    ).toEqual([]);
  });
});
