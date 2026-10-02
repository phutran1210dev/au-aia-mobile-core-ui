/**
 * Color helpers for the theme algorithms. Our own code, so the package keeps zero runtime
 * dependencies (theme.md).
 *
 * `toHsv`, `fromHsv`, the hex output and the rgb() output are ported from
 * @ant-design/fast-color 3.0.1, so generated palettes match antd's exactly:
 *
 *   The MIT License (MIT)
 *   Copyright (c) 2015-present Alipay.com, https://www.alipay.com/
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
 *
 * `darken` deliberately differs from fast-color: fast-color passes the HSV saturation into
 * an HSL conversion, which shifts non-grey colors even at `darken(0)`. This version uses
 * HSL throughout, as @ctrl/tinycolor (which antd used before fast-color) does.
 */

/** An sRGB color with 0-255 channels and a 0-1 alpha. Internal. */
export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** A color in HSV, with the hue in degrees and saturation and value from 0 to 1. Internal. */
export interface Hsv {
  h: number;
  s: number;
  v: number;
}

const HEX_PATTERN = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB_PATTERN = /^rgba?\((.*)\)$/i;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function parseHex(digits: string): Rgba {
  const short = digits.length < 6;
  const channel = (index: number) => {
    const pair = short
      ? `${digits[index]}${digits[index]}`
      : digits.slice(index * 2, index * 2 + 2);
    return parseInt(pair, 16);
  };
  const hasAlpha = digits.length === 4 || digits.length === 8;
  return {
    r: channel(0),
    g: channel(1),
    b: channel(2),
    a: hasAlpha ? channel(3) / 255 : 1,
  };
}

function parseRgb(body: string): Rgba | undefined {
  const cells = body.match(/\d*\.?\d+%?/g);
  if (!cells || cells.length < 3) {
    return undefined;
  }
  const channel = (cell: string) =>
    clamp(
      cell.endsWith('%')
        ? Math.round((parseFloat(cell) / 100) * 255)
        : parseFloat(cell),
      0,
      255
    );
  const [r = '0', g = '0', b = '0', a] = cells;
  const alpha =
    a === undefined ? 1 : a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a);
  return { r: channel(r), g: channel(g), b: channel(b), a: clamp(alpha, 0, 1) };
}

/**
 * Parses `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`, `rgb()` and `rgba()`.
 * Returns `undefined` for anything else, including color names.
 */
export function parseColor(input: string): Rgba | undefined {
  const value = input.trim();
  const hex = HEX_PATTERN.exec(value);
  if (hex?.[1]) {
    return parseHex(hex[1]);
  }
  const rgb = RGB_PATTERN.exec(value);
  if (rgb?.[1] !== undefined) {
    return parseRgb(rgb[1]);
  }
  return undefined;
}

/** Like {@link parseColor}, but throws a readable error. */
export function parseColorOrThrow(input: string): Rgba {
  const color = parseColor(input);
  if (!color) {
    throw new Error(
      `Unsupported color "${input}". Use #RGB, #RRGGBB, #RRGGBBAA, rgb() or rgba().`
    );
  }
  return color;
}

const toHexPair = (value: number) =>
  Math.round(value).toString(16).padStart(2, '0');

/** `#rrggbb`, or `#rrggbbaa` when the color is translucent (fast-color format). */
export function toHexString({ r, g, b, a }: Rgba): string {
  const hex = `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;
  return a >= 0 && a < 1 ? `${hex}${toHexPair(a * 255)}` : hex;
}

/** `rgb(r,g,b)` or `rgba(r,g,b,a)` with no spaces (fast-color format). */
export function toRgbString({ r, g, b, a }: Rgba): string {
  const channels = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
  return a !== 1 ? `rgba(${channels},${a})` : `rgb(${channels})`;
}

/** HSV with the hue rounded to whole degrees, as fast-color's `toHsv`. */
export function toHsv({ r, g, b }: Rgba): Hsv {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    const sector =
      r === max
        ? (g - b) / delta + (g < b ? 6 : 0)
        : g === max
          ? (b - r) / delta + 2
          : (r - g) / delta + 4;
    h = Math.round(60 * sector);
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max / 255 };
}

/** An opaque color from HSV, with each channel rounded, as fast-color's `fromHsv`. */
export function fromHsv({ h: hue, s, v }: Hsv): Rgba {
  const h = ((hue % 360) + 360) % 360;
  const value = Math.round(v * 255);
  if (s <= 0) {
    return { r: value, g: value, b: value, a: 1 };
  }
  const sector = h / 60;
  const i = Math.floor(sector);
  const f = sector - i;
  const p = Math.round(v * (1 - s) * 255);
  const q = Math.round(v * (1 - s * f) * 255);
  const t = Math.round(v * (1 - s * (1 - f)) * 255);
  switch (i) {
    case 0:
      return { r: value, g: t, b: p, a: 1 };
    case 1:
      return { r: q, g: value, b: p, a: 1 };
    case 2:
      return { r: p, g: value, b: t, a: 1 };
    case 3:
      return { r: p, g: q, b: value, a: 1 };
    case 4:
      return { r: t, g: p, b: value, a: 1 };
    default:
      return { r: value, g: p, b: q, a: 1 };
  }
}

/** The color with its alpha replaced, as an rgb()/rgba() string (antd `getAlphaColor`). */
export function setAlpha(color: string, alpha: number): string {
  return toRgbString({ ...parseColorOrThrow(color), a: clamp(alpha, 0, 1) });
}

function rgbToHsl({ r, g, b }: Rgba) {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l };
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === rr
      ? (gg - bb) / d + (gg < bb ? 6 : 0)
      : max === gg
        ? (bb - rr) / d + 2
        : (rr - gg) / d + 4;
  return { h: h / 6, s, l };
}

function hueToChannel(p: number, q: number, t: number) {
  const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
}

/**
 * The color with its HSL lightness lowered by `amount` percentage points, as a hex string
 * (antd `getSolidColor`). See the file header for how this differs from fast-color.
 */
export function darken(color: string, amount: number): string {
  const rgba = parseColorOrThrow(color);
  const { h, s, l: lightness } = rgbToHsl(rgba);
  const l = clamp(lightness - amount / 100, 0, 1);
  if (s === 0) {
    return toHexString({ r: l * 255, g: l * 255, b: l * 255, a: rgba.a });
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return toHexString({
    r: hueToChannel(p, q, h + 1 / 3) * 255,
    g: hueToChannel(p, q, h) * 255,
    b: hueToChannel(p, q, h - 1 / 3) * 255,
    a: rgba.a,
  });
}

/** Whether two color strings describe the same color, ignoring format and case. */
export function isSameColor(a: string, b: string): boolean {
  const left = parseColor(a);
  const right = parseColor(b);
  return (
    left !== undefined &&
    right !== undefined &&
    toHexString(left) === toHexString(right)
  );
}
