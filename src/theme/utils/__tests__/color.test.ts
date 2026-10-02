import { describe, expect, it } from '@jest/globals';

import { darken, isSameColor, parseColor, setAlpha } from '../color';

// Expected values were produced by the reference libraries, not by this code:
// @ant-design/fast-color 3.0.1 for setAlpha, @ctrl/tinycolor for darken.

describe('parseColor', () => {
  it.each([
    ['#E00842', { r: 224, g: 8, b: 66, a: 1 }],
    ['#abc', { r: 170, g: 187, b: 204, a: 1 }],
    ['#14181C80', { r: 20, g: 24, b: 28, a: 128 / 255 }],
    ['rgb(12, 109, 210)', { r: 12, g: 109, b: 210, a: 1 }],
    ['rgba(51,61,71,0.88)', { r: 51, g: 61, b: 71, a: 0.88 }],
  ])('parses %s', (input, expected) => {
    expect(parseColor(input)).toEqual(expected);
  });

  it.each(['red', '#12', 'hsl(0, 0%, 0%)', ''])(
    'returns undefined for unsupported input %p',
    (input) => {
      expect(parseColor(input)).toBeUndefined();
    }
  );
});

describe('setAlpha', () => {
  it('matches antd getAlphaColor', () => {
    expect(setAlpha('#333D47', 0.88)).toBe('rgba(51,61,71,0.88)');
    expect(setAlpha('#1677ff', 0.25)).toBe('rgba(22,119,255,0.25)');
  });
});

describe('darken', () => {
  it.each([
    ['#ffffff', 4, '#f5f5f5'],
    ['#ffffff', 15, '#d9d9d9'],
    ['#F0F4FF', 0, '#f0f4ff'],
    ['#F0F4FF', 6, '#d1deff'],
    ['#F0F4FF', 15, '#a3bcff'],
    ['#FFF8E1', 4, '#fff3cd'],
    ['#333D47', 10, '#1e2329'],
  ])('darkens %s by %d to %s in HSL lightness', (input, amount, expected) => {
    expect(darken(input, amount)).toBe(expected);
  });
});

describe('isSameColor', () => {
  it('ignores case and short hex form', () => {
    expect(isSameColor('#e00842', '#E00842')).toBe(true);
    expect(isSameColor('#fff', '#FFFFFF')).toBe(true);
  });

  it('tells different colors apart', () => {
    expect(isSameColor('#FFFFFF', '#FFFFFE')).toBe(false);
    expect(isSameColor('#FFFFFF', '#FFFFFF00')).toBe(false);
  });

  it('is false when either side does not parse', () => {
    expect(isSameColor('nope', 'nope')).toBe(false);
  });
});
