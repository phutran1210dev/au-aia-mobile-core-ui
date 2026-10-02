import { describe, expect, it, jest } from '@jest/globals';
import { render, renderHook, screen } from '@testing-library/react-native';
import { memo, type ReactNode } from 'react';
import { View } from 'react-native';

import {
  ConfigProvider,
  createStyles,
  theme,
  type ConfigProviderProps,
  type ThemeConfig,
} from '../../index';
import { antdBlue } from '../__fixtures__/antd';
import { figmaValue } from '../__fixtures__/figma';

function withProvider(props: Omit<ConfigProviderProps, 'children'>) {
  return ({ children }: { children: ReactNode }) => (
    <ConfigProvider {...props}>{children}</ConfigProvider>
  );
}

const useButtonStyles = createStyles(
  (token) => ({
    fill: { backgroundColor: token.colorInteractiveActionable },
    pressed: { backgroundColor: token.colorInteractiveActionablePressed },
    tint: { backgroundColor: token.colorPrimaryBg },
  }),
  { component: 'Button' }
);

async function buttonStyles(config: ThemeConfig) {
  const { result } = await renderHook(() => useButtonStyles(), {
    wrapper: withProvider({ theme: config }),
  });
  return result.current;
}

describe('theme.components (required test 5)', () => {
  it('applies component keys exactly with algorithm: false (the default)', async () => {
    const styles = await buttonStyles({
      components: { Button: { colorPrimary: '#1677ff' } },
    });
    // The key applies and the semantic token referencing it follows...
    expect(styles.fill.backgroundColor).toBe('#1677ff');
    // ...but nothing is regenerated from it.
    expect(styles.pressed.backgroundColor).toBe(
      figmaValue('colorPrimaryActive')
    );
    expect(styles.tint.backgroundColor).toBe(figmaValue('colorPrimaryBg'));
  });

  it('regenerates the family from component seeds with algorithm: true', async () => {
    const styles = await buttonStyles({
      components: { Button: { colorPrimary: '#1677ff', algorithm: true } },
    });
    expect(styles.fill.backgroundColor).toBe('#1677ff');
    expect(styles.pressed.backgroundColor).toBe(antdBlue[6]);
    expect(styles.tint.backgroundColor).toBe(antdBlue[0]);
  });

  it('leaves the global token untouched', async () => {
    const { result } = await renderHook(() => theme.useToken(), {
      wrapper: withProvider({
        theme: { components: { Button: { colorPrimary: '#1677ff' } } },
      }),
    });
    expect(result.current.token.colorPrimary).toBe(figmaValue('colorPrimary'));
  });

  it('merges component overrides from a parent provider', async () => {
    const { result } = await renderHook(() => useButtonStyles(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <ConfigProvider
          theme={{ components: { Button: { colorPrimary: '#1677ff' } } }}
        >
          <ConfigProvider
            theme={{
              components: { Button: { colorPrimaryActive: '#000000' } },
            }}
          >
            {children}
          </ConfigProvider>
        </ConfigProvider>
      ),
    });
    expect(result.current.fill.backgroundColor).toBe('#1677ff');
    expect(result.current.pressed.backgroundColor).toBe('#000000');
  });
});

describe('createStyles', () => {
  it('styles with the global token when no component is named', async () => {
    const useStyles = createStyles((token) => ({
      screen: { backgroundColor: token.colorBgLayout },
    }));
    const { result } = await renderHook(() => useStyles());
    expect(result.current.screen.backgroundColor).toBe(
      figmaValue('colorBgLayout')
    );
  });

  it('builds styles once per token and size, not once per render', async () => {
    const factory = jest.fn(
      (_token: unknown, config: { componentSize: string }) => ({
        box: { padding: config.componentSize === 'small' ? 4 : 8 },
      })
    );
    const useStyles = createStyles(factory);
    function Box() {
      const styles = useStyles();
      return <View testID="box" style={styles.box} />;
    }
    const tree = (componentSize: 'small' | 'medium') => (
      <ConfigProvider componentSize={componentSize}>
        <Box />
      </ConfigProvider>
    );

    await render(tree('medium'));
    await screen.rerender(tree('medium'));
    expect(factory).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('box')).toHaveStyle({ padding: 8 });

    await screen.rerender(tree('small'));
    await screen.rerender(tree('medium'));
    expect(factory).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId('box')).toHaveStyle({ padding: 8 });
  });
});

describe('ConfigProvider.useConfig', () => {
  it('returns the defaults without a provider', async () => {
    const { result } = await renderHook(() => ConfigProvider.useConfig());
    expect(result.current).toEqual({
      componentSize: 'medium',
      componentDisabled: false,
    });
  });

  it('takes each value from the nearest provider that sets it', async () => {
    const { result } = await renderHook(() => ConfigProvider.useConfig(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <ConfigProvider componentSize="large" componentDisabled>
          <ConfigProvider componentSize="small">{children}</ConfigProvider>
        </ConfigProvider>
      ),
    });
    expect(result.current).toEqual({
      componentSize: 'small',
      componentDisabled: true,
    });
  });

  it('does not re-render token consumers when only the size changes', async () => {
    const tokenRenders = jest.fn();
    const TokenConsumer = memo(function TokenProbe() {
      tokenRenders(theme.useToken().token);
      return null;
    });
    const tree = (componentSize: 'small' | 'large') => (
      <ConfigProvider componentSize={componentSize}>
        <TokenConsumer />
      </ConfigProvider>
    );
    await render(tree('small'));
    await screen.rerender(tree('large'));
    expect(tokenRenders).toHaveBeenCalledTimes(1);
  });
});
