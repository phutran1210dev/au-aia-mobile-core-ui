import { describe, expect, it, jest } from '@jest/globals';
import { render, renderHook, screen } from '@testing-library/react-native';
import { memo, useEffect } from 'react';
import { Text } from 'react-native';

import {
  ConfigProvider,
  theme,
  type GlobalToken,
  type MappingAlgorithm,
  type ThemeConfig,
} from '../../index';
import {
  figmaValue,
  tokenFixtures,
  typographyFixtures,
} from '../__fixtures__/figma';
import {
  referenceDerivedFamilies,
  referenceDerivedMotion,
  referenceDerivedNeutrals,
  referenceDerivedTypography,
  referenceFontHeights,
} from '../__fixtures__/reference';
import { createTokenProbes, withProvider } from '../__fixtures__/providers';

describe('no provider', () => {
  it('returns the library defaults instead of throwing', async () => {
    const { result } = await renderHook(() => theme.useToken());
    expect(result.current.token).toBe(theme.getDesignToken());
    expect(result.current.token.colorPrimary).toBe(figmaValue('colorPrimary'));
  });
});

describe('seed override (required test 2)', () => {
  const pickFamily = (family: string) =>
    Object.fromEntries(
      Object.entries(referenceDerivedFamilies).filter(([name]) =>
        name.startsWith(`color${family}`)
      )
    );
  const PRIMARY_FAMILY = pickFamily('Primary');
  const REFERENCES_TO_PRIMARY = {
    controlItemBgActive: referenceDerivedFamilies.colorPrimaryBg,
    controlItemBgActiveHover: referenceDerivedFamilies.colorPrimaryBgHover,
    colorInteractiveActionable: referenceDerivedFamilies.colorPrimary,
    colorInteractiveActionablePressed:
      referenceDerivedFamilies.colorPrimaryActive,
  };

  it('regenerates the primary map tokens as the reference model does', async () => {
    const { result } = await renderHook(() => theme.useToken(), {
      wrapper: withProvider({ theme: { token: { colorPrimary: '#1677ff' } } }),
    });
    expect(result.current.token).toMatchObject({
      ...PRIMARY_FAMILY,
      ...REFERENCES_TO_PRIMARY,
    });
  });

  it('regenerates a seven-step family (Success) as the reference model does', () => {
    const token = theme.getDesignToken({ token: { colorSuccess: '#52c41a' } });
    expect(token).toMatchObject({
      ...pickFamily('Success'),
      colorInteractiveSuccess: referenceDerivedFamilies.colorSuccess,
      colorInteractiveSuccessPressed:
        referenceDerivedFamilies.colorSuccessActive,
    });
  });

  it('keeps every other token at its Figma value', () => {
    const token: Record<string, unknown> = {
      ...theme.getDesignToken({ token: { colorPrimary: '#1677ff' } }),
    };
    const changed = new Set<string>([
      ...Object.keys(PRIMARY_FAMILY),
      ...Object.keys(REFERENCES_TO_PRIMARY),
    ]);
    for (const { name, hex } of tokenFixtures) {
      if (!changed.has(name)) {
        expect({ name, value: token[name] }).toEqual({ name, value: hex });
      }
    }
  });

  it('treats a seed equal to its default as not overridden', () => {
    expect(
      theme.getDesignToken({ token: { colorPrimary: '#e00842' } })
    ).toEqual(theme.getDesignToken());
  });

  it('regenerates the text neutrals from colorTextBase', () => {
    const { seed, tokens } = referenceDerivedNeutrals.colorTextBase;
    const token = theme.getDesignToken({ token: { colorTextBase: seed } });
    expect(token).toMatchObject({
      ...tokens,
      colorTextDisabled: tokens.colorTextQuaternary,
    });
    expect(token.colorBorder).toBe(figmaValue('colorBorder'));
  });

  it('regenerates the background neutrals from colorBgBase', () => {
    const { seed, tokens } = referenceDerivedNeutrals.colorBgBase;
    const tinted = theme.getDesignToken({ token: { colorBgBase: seed } });
    expect(tinted).toMatchObject(tokens);
    expect(tinted.colorText).toBe(figmaValue('colorText'));
  });

  it('treats a white colorBgBase as not overridden', () => {
    const token = theme.getDesignToken({ token: { colorBgBase: '#ffffff' } });
    expect(token.colorBorder).toBe(figmaValue('colorBorder'));
  });
});

describe('typography seed override', () => {
  it('regenerates font sizes and line heights as the reference model does', async () => {
    const { result } = await renderHook(() => theme.useToken(), {
      wrapper: withProvider({ theme: { token: { fontSize: 16 } } }),
    });
    expect(result.current.token).toMatchObject(referenceDerivedTypography);
  });

  it('keeps the semantic typography and every color at their Figma values', () => {
    const token: Record<string, unknown> = {
      ...theme.getDesignToken({ token: { fontSize: 16 } }),
    };
    const regenerated = new Set(Object.keys(referenceDerivedTypography));
    for (const { name, value } of typographyFixtures) {
      if (!regenerated.has(name)) {
        expect({ name, value: token[name] }).toEqual({ name, value });
      }
    }
    for (const { name, hex } of tokenFixtures) {
      expect({ name, value: token[name] }).toEqual({ name, value: hex });
    }
  });

  it.each(referenceFontHeights)(
    'keeps fontHeight* in step with map overrides: $token',
    ({ token, expected }) => {
      expect(theme.getDesignToken({ token })).toMatchObject(expected);
    }
  );

  it('treats a fontSize equal to its default as not overridden', () => {
    expect(theme.getDesignToken({ token: { fontSize: 14 } })).toBe(
      theme.getDesignToken({ token: { fontSize: 14 } })
    );
    expect(theme.getDesignToken({ token: { fontSize: 14 } })).toEqual(
      theme.getDesignToken()
    );
  });
});

describe('motion and line seeds', () => {
  it('derives the motion durations from motionUnit and motionBase', () => {
    const { token, expected } = referenceDerivedMotion.scaled;
    expect(theme.getDesignToken({ token })).toMatchObject(expected);
  });

  it('sets every duration to 0 with motion: false', async () => {
    const { token, expected } = referenceDerivedMotion.off;
    const { result } = await renderHook(() => theme.useToken(), {
      wrapper: withProvider({ theme: { token } }),
    });
    expect(result.current.token).toMatchObject(expected);
  });

  it('still applies an explicit duration override with motion: false', () => {
    const { token, expected } = referenceDerivedMotion.offWithOverride;
    expect(theme.getDesignToken({ token })).toMatchObject(expected);
  });

  it('derives lineWidthBold from lineWidth', () => {
    const { token, expected } = referenceDerivedMotion.lineWidth;
    expect(theme.getDesignToken({ token })).toMatchObject(expected);
  });
});

describe('map and semantic overrides (required test 3)', () => {
  it('lets a semantic override win without leaking to siblings, parents or other subtrees', async () => {
    const { seen, Probe } = createTokenProbes();
    await render(
      <ConfigProvider>
        <Probe name="parent" />
        <ConfigProvider
          theme={{ token: { colorInteractiveActionablePressed: '#000000' } }}
        >
          <Probe name="overridden" />
        </ConfigProvider>
        <ConfigProvider>
          <Probe name="otherSubtree" />
        </ConfigProvider>
      </ConfigProvider>
    );

    expect(seen.overridden?.colorInteractiveActionablePressed).toBe('#000000');
    // Siblings and the map token it would reference keep their Figma values.
    expect(seen.overridden?.colorInteractiveActionable).toBe(
      figmaValue('colorInteractiveActionable')
    );
    expect(seen.overridden?.colorPrimaryActive).toBe(
      figmaValue('colorPrimaryActive')
    );
    expect(seen.parent?.colorInteractiveActionablePressed).toBe(
      figmaValue('colorInteractiveActionablePressed')
    );
    expect(seen.otherSubtree?.colorInteractiveActionablePressed).toBe(
      figmaValue('colorInteractiveActionablePressed')
    );
  });

  it('moves the semantic tokens that reference an overridden map token', () => {
    const token = theme.getDesignToken({
      token: { colorPrimaryActive: '#000000' },
    });
    expect(token.colorInteractiveActionablePressed).toBe('#000000');
    // Nothing is regenerated from a map override.
    expect(token.colorPrimary).toBe(figmaValue('colorPrimary'));
    expect(token.colorPrimaryBg).toBe(figmaValue('colorPrimaryBg'));
  });

  it('keeps a semantic override even when its map token is overridden too', () => {
    const token = theme.getDesignToken({
      token: {
        colorPrimaryActive: '#000000',
        colorInteractiveActionablePressed: '#111111',
      },
    });
    expect(token.colorInteractiveActionablePressed).toBe('#111111');
  });

  it('applies a semantic typography override exactly, leaving its siblings alone', () => {
    const token = theme.getDesignToken({
      token: { fontWeightHeadline: 700, letterSpacingHeadline1: 0 },
    });
    expect(token.fontWeightHeadline).toBe(700);
    expect(token.letterSpacingHeadline1).toBe(0);
    expect(token.fontWeightHeadlineThin).toBe(
      figmaValue('fontWeightHeadlineThin')
    );
    expect(token.fontWeightStrong).toBe(figmaValue('fontWeightStrong'));
  });

  it('passes custom keys through untouched', () => {
    const token = theme.getDesignToken({
      token: { colorBrandAccent: '#123456' } as ThemeConfig['token'],
    }) as GlobalToken & { colorBrandAccent?: string };
    expect(token.colorBrandAccent).toBe('#123456');
  });
});

describe('nested providers (required test 4)', () => {
  it('merges the parent config with inherit: true (the default)', async () => {
    const { seen, Probe } = createTokenProbes();
    const tagged: MappingAlgorithm = (seed, map) => ({
      ...(map ?? theme.defaultAlgorithm(seed)),
      colorBgMask: '#00000080',
    });
    await render(
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#1677ff' },
          algorithm: [theme.defaultAlgorithm, tagged],
        }}
      >
        <ConfigProvider theme={{ token: { colorSuccess: '#52c41a' } }}>
          <Probe name="child" />
        </ConfigProvider>
      </ConfigProvider>
    );
    expect(seen.child).toMatchObject({
      colorPrimary: '#1677ff',
      colorSuccess: '#52c41a',
      colorBgMask: '#00000080',
    });
  });

  it('starts again from the library defaults with inherit: false', async () => {
    const { seen, Probe } = createTokenProbes();
    await render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
        <ConfigProvider
          theme={{ inherit: false, token: { colorSuccess: '#52c41a' } }}
        >
          <Probe name="child" />
        </ConfigProvider>
      </ConfigProvider>
    );
    expect(seen.child?.colorPrimary).toBe(figmaValue('colorPrimary'));
    expect(seen.child?.colorSuccess).toBe('#52c41a');
  });
});

describe('getDesignToken (required test 6)', () => {
  it.each<[string, ThemeConfig | undefined]>([
    ['no config', undefined],
    ['a seed override', { token: { colorPrimary: '#1677ff' } }],
    ['a map override', { token: { colorPrimaryActive: '#000000' } }],
    ['a semantic override', { token: { colorInteractiveDisabled: '#EEEEEE' } }],
    ['a typography seed override', { token: { fontSize: 16 } }],
    ['motion turned off', { token: { motion: false } }],
    [
      'component overrides',
      { components: { Button: { colorPrimary: '#1677ff' } } },
    ],
  ])(
    'deep-equals useToken() under ConfigProvider with %s',
    async (_, config) => {
      const { result } = await renderHook(() => theme.useToken(), {
        wrapper: withProvider({ theme: config }),
      });
      expect(theme.getDesignToken(config)).toEqual(result.current.token);
    }
  );
});

describe('stable output', () => {
  it('returns the same frozen object for identical config values', () => {
    const first = theme.getDesignToken({ token: { colorPrimary: '#1677ff' } });
    const second = theme.getDesignToken({ token: { colorPrimary: '#1677ff' } });
    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
  });

  it('does not re-render memoized consumers when an inline theme keeps its values', async () => {
    const renders = jest.fn();
    const Consumer = memo(function TokenProbe() {
      renders(theme.useToken().token);
      return null;
    });
    const tree = () => (
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
        <Consumer />
      </ConfigProvider>
    );
    await render(tree());
    await screen.rerender(tree());
    expect(renders).toHaveBeenCalledTimes(1);
  });

  it('renders the same tree for theme={undefined} and theme={} without re-mounting children', async () => {
    const mounts = jest.fn();
    const tokens: GlobalToken[] = [];
    function Child() {
      tokens.push(theme.useToken().token);
      useEffect(() => {
        mounts();
      }, []);
      return <Text>child</Text>;
    }
    await render(
      <ConfigProvider theme={undefined}>
        <Child />
      </ConfigProvider>
    );
    await screen.rerender(
      <ConfigProvider theme={{}}>
        <Child />
      </ConfigProvider>
    );
    await screen.rerender(
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
        <Child />
      </ConfigProvider>
    );
    await screen.rerender(
      <ConfigProvider theme={undefined}>
        <Child />
      </ConfigProvider>
    );

    expect(screen.getByText('child')).toBeOnTheScreen();
    expect(mounts).toHaveBeenCalledTimes(1);
    expect(tokens[1]).toBe(tokens[0]);
    expect(tokens[3]).toBe(tokens[0]);
  });
});
