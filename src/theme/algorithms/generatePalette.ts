/**
 * Ported from `generate()` in @ant-design/colors 8.0.1 (light theme only):
 *
 *   MIT LICENSE
 *   Copyright (c) 2018-present Ant UED, https://xtech.antfin.com/
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
import type { Hsv } from '../utils/color';
import { fromHsv, parseColorOrThrow, toHexString, toHsv } from '../utils/color';

const HUE_STEP = 2;
const SATURATION_STEP_LIGHT = 0.16;
const SATURATION_STEP_DARK = 0.05;
const BRIGHTNESS_STEP_LIGHT = 0.05;
const BRIGHTNESS_STEP_DARK = 0.15;
const LIGHT_COLOR_COUNT = 5;
const DARK_COLOR_COUNT = 4;

/** Ten colors, lightest first; the input color is the sixth. Internal. */
export type GeneratedPalette = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

const roundTo2 = (value: number) => Math.round(value * 100) / 100;

function getHue(hsv: Hsv, i: number, light: boolean): number {
  const base = Math.round(hsv.h);
  // Warm and cool hues turn in opposite directions as they lighten.
  const coolHue = base >= 60 && base <= 240;
  const hue = coolHue === light ? base - HUE_STEP * i : base + HUE_STEP * i;
  if (hue < 0) return hue + 360;
  if (hue >= 360) return hue - 360;
  return hue;
}

function getSaturation(hsv: Hsv, i: number, light: boolean): number {
  // Greys keep their saturation.
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation: number;
  if (light) {
    saturation = hsv.s - SATURATION_STEP_LIGHT * i;
  } else if (i === DARK_COLOR_COUNT) {
    saturation = hsv.s + SATURATION_STEP_LIGHT;
  } else {
    saturation = hsv.s + SATURATION_STEP_DARK * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  // The lightest color keeps its saturation between 0.06 and 0.1.
  if (light && i === LIGHT_COLOR_COUNT && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return roundTo2(saturation);
}

function getValue(hsv: Hsv, i: number, light: boolean): number {
  const value = light
    ? hsv.v + BRIGHTNESS_STEP_LIGHT * i
    : hsv.v - BRIGHTNESS_STEP_DARK * i;
  return roundTo2(Math.max(0, Math.min(1, value)));
}

/**
 * Builds a ten-color family around one color, exactly as the original `generate()` does.
 * Throws for a color that `parseColor` cannot read.
 */
export function generatePalette(color: string): GeneratedPalette {
  const base = parseColorOrThrow(color);
  const hsv = toHsv(base);
  const step = (i: number, light: boolean) =>
    toHexString(
      fromHsv({
        h: getHue(hsv, i, light),
        s: getSaturation(hsv, i, light),
        v: getValue(hsv, i, light),
      })
    );
  return [
    step(5, true),
    step(4, true),
    step(3, true),
    step(2, true),
    step(1, true),
    toHexString(base),
    step(1, false),
    step(2, false),
    step(3, false),
    step(4, false),
  ];
}
