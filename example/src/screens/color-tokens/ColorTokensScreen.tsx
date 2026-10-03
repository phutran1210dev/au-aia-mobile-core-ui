import { useState, type ReactNode } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import {
  ConfigProvider,
  createStyles,
  theme,
  type SemanticColorToken,
} from '@au-aia/mobile-core-ui';

import { PaletteSwatches } from './PaletteSwatches';

// The library defaults, resolved outside React. Overrides below use these values, so the
// screen only touches the public API.
const defaults = theme.getDesignToken();

const BRAND_OPTIONS = [
  { label: 'Default', value: defaults.colorPrimary },
  { label: 'colorInfo', value: defaults.colorInfo },
  { label: 'colorSuccess', value: defaults.colorSuccess },
  {
    label: 'colorInteractiveHighlighted',
    value: defaults.colorInteractiveHighlighted,
  },
] as const;

const PRIMARY_FAMILY = [
  ['colorPrimaryBg', 'Bg'],
  ['colorPrimaryBgHover', 'BgHover'],
  ['colorPrimaryBorder', 'Border'],
  ['colorPrimaryBorderHover', 'BorderHover'],
  ['colorPrimaryHover', 'Hover'],
  ['colorPrimary', 'Primary'],
  ['colorPrimaryActive', 'Active'],
  ['colorPrimaryTextHover', 'TextHover'],
  ['colorPrimaryText', 'Text'],
  ['colorPrimaryTextActive', 'TextActive'],
] as const;

const SEMANTIC_TOKENS: readonly (keyof SemanticColorToken)[] = [
  'colorInteractiveActionable',
  'colorInteractiveActionablePressed',
  'colorInteractiveHighlighted',
  'colorInteractiveInformative',
  'colorInteractiveInformativePressed',
  'colorInteractiveSuccess',
  'colorInteractiveSuccessPressed',
  'colorInteractiveWarning',
  'colorInteractiveWarningPressed',
  'colorInteractiveError',
  'colorInteractiveErrorPressed',
  'colorInteractiveDisabled',
];

/** Color tokens: a runtime colorPrimary switch, map and semantic tokens, component config, nesting and the palette. */
export function ColorTokensScreen() {
  const styles = useStyles();
  const [brand, setBrand] = useState<string>(BRAND_OPTIONS[0].value);

  return (
    <View style={styles.screen}>
      <Text style={styles.title} role="heading">
        Color tokens
      </Text>
      <Text style={styles.body}>
        Defaults equal the Figma values. Pick a color to override the
        colorPrimary seed at runtime.
      </Text>

      <View style={styles.chips} role="radiogroup">
        {BRAND_OPTIONS.map((option) => {
          const selected = option.value === brand;
          return (
            <Pressable
              key={option.label}
              role="radio"
              aria-checked={selected}
              onPress={() => setBrand(option.value)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <View
                style={[styles.chipDot, { backgroundColor: option.value }]}
              />
              <Text style={styles.chipLabel}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <ConfigProvider theme={{ token: { colorPrimary: brand } }}>
        <Section
          title="Primary family"
          hint="Map tokens, regenerated on override"
        >
          <PrimaryFamily />
        </Section>

        <Section
          title="Component config"
          hint="createStyles with component: 'Button'"
        >
          <ComponentConfigDemo />
        </Section>

        <Section title="Semantic tokens" hint="All interim, pending design">
          {SEMANTIC_TOKENS.map((name) => (
            <TokenRow key={name} name={name} />
          ))}
        </Section>

        <Section
          title="Nested ConfigProvider"
          hint="Each card is its own provider"
        >
          <NestedProviders />
        </Section>
      </ConfigProvider>

      <Section title="Palette" hint="Qi primitives, internal to the library">
        <PaletteSwatches />
      </Section>
    </View>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} role="heading">
        {title}
      </Text>
      <Text style={styles.hint}>{hint}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function PrimaryFamily() {
  const styles = useStyles();
  const { token } = theme.useToken();
  return (
    <View style={styles.family}>
      {PRIMARY_FAMILY.map(([name, label]) => (
        <View key={name} style={styles.familyCell}>
          <View
            style={[styles.familySwatch, { backgroundColor: token[name] }]}
          />
          <Text style={styles.caption}>{label}</Text>
          <Text style={styles.mono}>{token[name]}</Text>
        </View>
      ))}
    </View>
  );
}

const useDemoButtonStyles = createStyles(
  (token, { componentSize, componentDisabled }) => ({
    button: {
      height: componentSize === 'small' ? 32 : 44,
      borderRadius: componentSize === 'small' ? 16 : 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: componentDisabled
        ? token.colorInteractiveDisabled
        : token.colorInteractiveActionable,
    },
    pressed: { backgroundColor: token.colorInteractiveActionablePressed },
    label: {
      fontSize: componentSize === 'small' ? 13 : 15,
      fontWeight: '600',
      color: componentDisabled
        ? token.colorTextDisabled
        : token.colorTextLightSolid,
    },
  }),
  { component: 'Button' }
);

/** A playground stand-in for the future Button: press and hold to see the pressed token. */
function DemoButton({ label }: { label: string }) {
  const styles = useDemoButtonStyles();
  const { componentDisabled } = ConfigProvider.useConfig();
  return (
    <Pressable
      role="button"
      disabled={componentDisabled}
      aria-disabled={componentDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !componentDisabled && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

function ComponentConfigDemo() {
  const styles = useStyles();
  return (
    <View style={styles.demoGrid}>
      <DemoCell caption="Default">
        <DemoButton label="Actionable" />
      </DemoCell>
      <DemoCell caption='componentSize="small"'>
        <ConfigProvider componentSize="small">
          <DemoButton label="Small" />
        </ConfigProvider>
      </DemoCell>
      <DemoCell caption="componentDisabled">
        <ConfigProvider componentDisabled>
          <DemoButton label="Disabled" />
        </ConfigProvider>
      </DemoCell>
      <DemoCell caption="components.Button, algorithm: true">
        <ConfigProvider
          theme={{
            components: {
              Button: { colorPrimary: defaults.colorInfo, algorithm: true },
            },
          }}
        >
          <DemoButton label="Button only" />
        </ConfigProvider>
      </DemoCell>
      <Text style={[styles.hint, styles.demoNote]}>
        The last cell recolors Button tokens only; the global token is
        unchanged.
      </Text>
    </View>
  );
}

function DemoCell({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  const styles = useStyles();
  return (
    <View style={styles.demoCell}>
      {children}
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

function TokenRow({ name }: { name: keyof SemanticColorToken }) {
  const styles = useStyles();
  const { token } = theme.useToken();
  return (
    <View style={styles.row}>
      <View style={[styles.rowSwatch, { backgroundColor: token[name] }]} />
      <View style={styles.rowText}>
        <Text style={styles.rowName}>{name}</Text>
        <Text style={styles.mono}>{token[name]}</Text>
      </View>
    </View>
  );
}

function NestedProviders() {
  const styles = useStyles();
  return (
    <View style={styles.nested}>
      <ConfigProvider theme={{ token: { colorSuccess: defaults.colorInfo } }}>
        <NestedCard
          title="inherit: true (default)"
          detail="Keeps the brand color above; overrides the colorSuccess seed"
        />
      </ConfigProvider>
      <ConfigProvider theme={{ inherit: false }}>
        <NestedCard
          title="inherit: false"
          detail="Starts again from the library defaults"
        />
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorInteractiveActionable: defaults.colorInteractiveHighlighted,
          },
        }}
      >
        <NestedCard
          title="Semantic override"
          detail="Sets colorInteractiveActionable only; Pressed keeps its value"
        />
      </ConfigProvider>
    </View>
  );
}

function NestedCard({ title, detail }: { title: string; detail: string }) {
  const styles = useStyles();
  const { token } = theme.useToken();
  const swatches = [
    ['Actionable', token.colorInteractiveActionable],
    ['Pressed', token.colorInteractiveActionablePressed],
    ['Success', token.colorInteractiveSuccess],
  ] as const;
  return (
    <View style={styles.nestedCard}>
      <Text style={styles.rowName}>{title}</Text>
      <Text style={styles.hint}>{detail}</Text>
      <View style={styles.nestedSwatches}>
        {swatches.map(([label, value]) => (
          <View key={label} style={styles.nestedSwatchCell}>
            <View style={[styles.nestedSwatch, { backgroundColor: value }]} />
            <Text style={styles.caption}>{label}</Text>
            <Text style={styles.mono}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const useStyles = createStyles((token) => ({
  screen: { paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  title: { fontSize: 28, fontWeight: '700', color: token.colorTextHeading },
  body: { fontSize: 15, lineHeight: 21, color: token.colorTextSecondary },
  hint: { fontSize: 13, color: token.colorTextDescription },
  caption: { fontSize: 11, color: token.colorTextSecondary },
  mono: {
    fontSize: 10,
    color: token.colorTextTertiary,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: token.colorBorder,
    backgroundColor: token.colorBgContainer,
  },
  chipSelected: { borderColor: token.colorText, borderWidth: 2 },
  chipDot: { width: 14, height: 14, borderRadius: 7 },
  chipLabel: { fontSize: 13, color: token.colorText },
  section: { marginTop: 16, gap: 4 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: token.colorTextHeading,
  },
  card: {
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: token.colorBgContainer,
    borderWidth: 1,
    borderColor: token.colorBorderSecondary,
    gap: 8,
  },
  family: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 },
  familyCell: { width: '20%', alignItems: 'center', gap: 2 },
  familySwatch: { width: 44, height: 32, borderRadius: 6 },
  demoGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 12 },
  demoCell: { width: '50%', paddingHorizontal: 4, gap: 4 },
  demoNote: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowSwatch: { width: 36, height: 36, borderRadius: 8 },
  rowText: { flex: 1, gap: 2 },
  rowName: { fontSize: 13, fontWeight: '600', color: token.colorText },
  nested: { gap: 12 },
  nestedCard: {
    gap: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: token.colorBgLayout,
  },
  nestedSwatches: { flexDirection: 'row', gap: 12 },
  nestedSwatchCell: { alignItems: 'center', gap: 2 },
  nestedSwatch: { width: 56, height: 32, borderRadius: 6 },
}));
