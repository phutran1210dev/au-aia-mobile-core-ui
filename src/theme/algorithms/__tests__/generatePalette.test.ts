import { describe, expect, it } from '@jest/globals';

import { referencePalettes } from '../../__fixtures__/reference';
import { generatePalette } from '../generatePalette';

describe('generatePalette', () => {
  it.each(Object.entries(referencePalettes))(
    'matches the reference palette for %s',
    (input, expected) => {
      expect(generatePalette(input)).toEqual(expected);
    }
  );

  it('throws a readable error for an unsupported color', () => {
    expect(() => generatePalette('brand-red')).toThrow(
      'Unsupported color "brand-red"'
    );
  });
});
