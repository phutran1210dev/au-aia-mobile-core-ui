import { describe, expect, it } from '@jest/globals';

import { theme } from '../../index';
import {
  ddsInteractive,
  qiPrimitives,
  tokenFixtures,
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
});

describe('default theme', () => {
  const token: Record<string, unknown> = { ...theme.getDesignToken() };

  it('equals the Figma value of every seed, map, alias and semantic token', () => {
    for (const { name, hex } of tokenFixtures) {
      expect({ name, value: token[name] }).toEqual({ name, value: hex });
    }
  });

  it('has a Figma fixture for every token it outputs', () => {
    const fixtureNames = new Set(tokenFixtures.map(({ name }) => name));
    expect(
      Object.keys(token).filter((name) => !fixtureNames.has(name))
    ).toEqual([]);
  });
});
