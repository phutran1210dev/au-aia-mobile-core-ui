/**
 * Reference output of antd's own libraries, used to check our ports. Produced with
 * @ant-design/colors 8.0.1 on 2026-10-03, never derived from the code under test.
 */

/** `generate('#1677ff')`: antd's blue, lightest first. Index n is palette slot n + 1. */
export const antdBlue = [
  '#e6f4ff',
  '#bae0ff',
  '#91caff',
  '#69b1ff',
  '#4096ff',
  '#1677ff',
  '#0958d9',
  '#003eb3',
  '#002c8c',
  '#001d66',
] as const;

/**
 * `theme.getDesignToken({ token: { colorPrimary: '#1677ff', colorSuccess: '#52c41a' } })`
 * from antd 6.6.5: the primary (ten-step) and success families antd itself derives.
 */
export const antdOverriddenFamilies = {
  colorPrimaryBg: '#e6f4ff',
  colorPrimaryBgHover: '#bae0ff',
  colorPrimaryBorder: '#91caff',
  colorPrimaryBorderHover: '#69b1ff',
  colorPrimaryHover: '#4096ff',
  colorPrimary: '#1677ff',
  colorPrimaryActive: '#0958d9',
  colorPrimaryTextHover: '#4096ff',
  colorPrimaryText: '#1677ff',
  colorPrimaryTextActive: '#0958d9',
  colorSuccessBg: '#f6ffed',
  colorSuccessBgHover: '#d9f7be',
  colorSuccessBorder: '#b7eb8f',
  colorSuccessBorderHover: '#95de64',
  colorSuccessHover: '#95de64',
  colorSuccess: '#52c41a',
  colorSuccessActive: '#389e0d',
  colorSuccessTextHover: '#73d13d',
  colorSuccessText: '#52c41a',
  colorSuccessTextActive: '#389e0d',
} as const;
