import { describe, expect, it, jest } from '@jest/globals';
import { render, renderHook, screen } from '@testing-library/react-native';
import { memo, useEffect, type ReactNode } from 'react';
import { Text } from 'react-native';

import {
  ConfigProvider,
  theme,
  type GlobalToken,
  type MappingAlgorithm,
  type ThemeConfig,
} from '../../index';
import { antdOverriddenFamilies } from '../__fixtures__/antd';
import { figmaValue, tokenFixtures } from '../__fixtures__/figma';

function withProvider(config?: ThemeConfig) {
  return ({ children }: { children: ReactNode }) => (
    <ConfigProvider theme={config}>{children}</ConfigProvider>
  );
}

/** Renders probes that record the token they see, by name. */
function createProbes() {
  const seen: Record<string, GlobalToken> = {};
  function Probe({ name }: { name: string }) {
    seen[name] = theme.useToken().token;
    return null;
  }
  return { seen, Probe };
}

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
      Object.entries(antdOverriddenFamilies).filter(([name]) =>
        name.startsWith(`color${family}`)
      )
    );
  const PRIMARY_FAMILY = pickFamily('Primary');
  const REFERENCES_TO_PRIMARY = {
    controlItemBgActive: antdOverriddenFamilies.colorPrimaryBg,
    controlItemBgActiveHover: antdOverriddenFamilies.colorPrimaryBgHover,
    colorInteractiveActionable: antdOverriddenFamilies.colorPrimary,
    colorInteractiveActionablePressed:
      antdOverriddenFamilies.colorPrimaryActive,
  };

  it('regenerates the primary map tokens exactly as antd does', async () => {
    const { result } = await renderHook(() => theme.useToken(), {
      wrapper: withProvider({ token: { colorPrimary: '#1677ff' } }),
    });
    expect(result.current.token).toMatchObject({
      ...PRIMARY_FAMILY,
      ...REFERENCES_TO_PRIMARY,
    });
  });

  it('regenerates a seven-step family (Success) exactly as antd does', () => {
    const token = theme.getDesignToken({ token: { colorSuccess: '#52c41a' } });
    expect(token).toMatchObject({
      ...pickFamily('Success'),
      colorInteractiveSuccess: antdOverriddenFamilies.colorSuccess,
      colorInteractiveSuccessPressed: antdOverriddenFamilies.colorSuccessActive,
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

  it('regenerates the text neutrals from colorTextBase as antd does', () => {
    const token = theme.getDesignToken({ token: { colorTextBase: '#000000' } });
    expect(token).toMatchObject({
      colorText: 'rgba(0,0,0,0.88)',
      colorTextSecondary: 'rgba(0,0,0,0.65)',
      colorTextTertiary: 'rgba(0,0,0,0.45)',
      colorTextQuaternary: 'rgba(0,0,0,0.25)',
      colorTextDisabled: 'rgba(0,0,0,0.25)',
    });
    expect(token.colorBorder).toBe(figmaValue('colorBorder'));
  });

  it('regenerates the background neutrals from colorBgBase', () => {
    // Expected values: @ctrl/tinycolor darken(), see color.test.ts.
    const token = theme.getDesignToken({ token: { colorBgBase: '#ffffff' } });
    expect(token.colorBorder).toBe(figmaValue('colorBorder'));
    const tinted = theme.getDesignToken({ token: { colorBgBase: '#F0F4FF' } });
    expect(tinted).toMatchObject({
      colorBgContainer: '#f0f4ff',
      colorBorderSecondary: '#d1deff',
      colorBorder: '#a3bcff',
    });
    expect(tinted.colorText).toBe(figmaValue('colorText'));
  });
});

describe('map and semantic overrides (required test 3)', () => {
  it('lets a semantic override win without leaking to siblings, parents or other subtrees', async () => {
    const { seen, Probe } = createProbes();
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

  it('passes custom keys through untouched', () => {
    const token = theme.getDesignToken({
      token: { colorBrandAccent: '#123456' } as ThemeConfig['token'],
    }) as GlobalToken & { colorBrandAccent?: string };
    expect(token.colorBrandAccent).toBe('#123456');
  });
});

describe('nested providers (required test 4)', () => {
  it('merges the parent config with inherit: true (the default)', async () => {
    const { seen, Probe } = createProbes();
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
    const { seen, Probe } = createProbes();
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
    [
      'component overrides',
      { components: { Button: { colorPrimary: '#1677ff' } } },
    ],
  ])(
    'deep-equals useToken() under ConfigProvider with %s',
    async (_, config) => {
      const { result } = await renderHook(() => theme.useToken(), {
        wrapper: withProvider(config),
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
