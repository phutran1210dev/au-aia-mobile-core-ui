import { describe, expect, it } from '@jest/globals';

import { antdBlue } from '../../__fixtures__/antd';
import { generatePalette } from '../generatePalette';

// Expected palettes were produced by `generate()` from @ant-design/colors 8.0.1.
describe('generatePalette', () => {
  it.each([
    ['#1677ff', antdBlue],
    [
      '#E00842',
      [
        '#ffe6e8',
        '#ffadb8',
        '#ff8599',
        '#fa5a7a',
        '#ed2f5c',
        '#e00842',
        '#ba0038',
        '#940031',
        '#6e0028',
        '#47001d',
      ],
    ],
    [
      '#229F64',
      [
        '#d1ded5',
        '#b2d1be',
        '#87c4a2',
        '#61b88a',
        '#3fab75',
        '#229f64',
        '#13784c',
        '#095235',
        '#032b1c',
        '#000503',
      ],
    ],
    [
      'rgb(12, 109, 210)',
      [
        '#e6f6ff',
        '#b3e2ff',
        '#86c8f7',
        '#59a9eb',
        '#318ade',
        '#0c6dd2',
        '#024eab',
        '#003785',
        '#00245e',
        '#001438',
      ],
    ],
    [
      '#abc',
      [
        '#f0faff',
        '#f0f9ff',
        '#e4ecf2',
        '#d8e0e6',
        '#ccd3d9',
        '#aabbcc',
        '#8192a6',
        '#5d6c80',
        '#3d4859',
        '#222833',
      ],
    ],
    [
      '#808080',
      [
        '#bfbfbf',
        '#b3b3b3',
        '#a6a6a6',
        '#999999',
        '#8c8c8c',
        '#808080',
        '#595959',
        '#333333',
        '#0d0d0d',
        '#000000',
      ],
    ],
  ] as [string, readonly string[]][])(
    'generates the antd palette for %s',
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
