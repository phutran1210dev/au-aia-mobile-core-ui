/**
 * Ported from `genFontSizes.ts` and `genFontMapToken.ts` in antd 6.6.5
 * (components/theme/themes/shared), so an overridden font size derives the same scale as
 * the reference model:
 *
 *   MIT LICENSE
 *   Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this
 *   software and associated documentation files (the "Software"), to deal in the Software
 *   without restriction, including without limitation the rights to use, copy, modify,
 *   merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 *   permit persons to whom the Software is furnished to do so, subject to the following
 *   conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all copies
 *   or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 *   INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 *   PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *   HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 *   CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 *   OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import type { FontTokens } from '../tokens/map';

/**
 * Step `index` of the font scale around `base`: an even size on a curve of e^(n/5), with
 * `base` itself at index 1.
 */
function fontSizeAt(base: number, index: number): number {
  if (index === 1) {
    return base;
  }
  const scaled = base * Math.E ** ((index - 1) / 5);
  const whole = index > 1 ? Math.floor(scaled) : Math.ceil(scaled);
  return Math.floor(whole / 2) * 2;
}

/** Line height of a font size, as a ratio: the size plus 8 dp. */
function lineHeightOf(size: number): number {
  return (size + 8) / size;
}

/**
 * Font sizes and line heights derived from an overridden `fontSize`, as the reference model
 * derives them. Internal: the default theme uses the Qi values instead.
 */
export function generateFontTokens(fontSize: number): FontTokens {
  const fontSizeSM = fontSizeAt(fontSize, 0);
  const fontSizeLG = fontSizeAt(fontSize, 2);
  const fontSizeXL = fontSizeAt(fontSize, 3);
  // Headings 1 to 5 read scale steps 6 down to 2, so heading 4 equals fontSizeXL and
  // heading 5 equals fontSizeLG.
  const h1 = fontSizeAt(fontSize, 6);
  const h2 = fontSizeAt(fontSize, 5);
  const h3 = fontSizeAt(fontSize, 4);
  const h4 = fontSizeXL;
  const h5 = fontSizeLG;

  return {
    fontSizeSM,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading1: h1,
    fontSizeHeading2: h2,
    fontSizeHeading3: h3,
    fontSizeHeading4: h4,
    fontSizeHeading5: h5,
    lineHeight: lineHeightOf(fontSize),
    lineHeightSM: lineHeightOf(fontSizeSM),
    lineHeightLG: lineHeightOf(fontSizeLG),
    lineHeightHeading1: lineHeightOf(h1),
    lineHeightHeading2: lineHeightOf(h2),
    lineHeightHeading3: lineHeightOf(h3),
    lineHeightHeading4: lineHeightOf(h4),
    lineHeightHeading5: lineHeightOf(h5),
    fontHeight: Math.round(fontSize * lineHeightOf(fontSize)),
    fontHeightSM: Math.round(fontSizeSM * lineHeightOf(fontSizeSM)),
    fontHeightLG: Math.round(fontSizeLG * lineHeightOf(fontSizeLG)),
  };
}
