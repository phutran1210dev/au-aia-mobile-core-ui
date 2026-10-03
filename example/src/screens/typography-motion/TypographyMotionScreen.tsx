import { useState, type ReactNode } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { ConfigProvider, createStyles, theme } from '@au-aia/mobile-core-ui';

// The library defaults, resolved outside React. Overrides below use these values, so the
// screen only touches the public API.
const defaults = theme.getDesignToken();

const FONT_SIZE_OPTIONS = [
  { label: 'Default (body2)', value: defaults.fontSize },
  { label: 'fontSizeLG (body1)', value: defaults.fontSizeLG },
] as const;

const HEADINGS = [
  {
    label: 'Heading 1',
    size: 'fontSizeHeading1',
    ratio: 'lineHeightHeading1',
    spacing: 'letterSpacingHeadline1',
  },
  {
    label: 'Heading 2',
    size: 'fontSizeHeading2',
    ratio: 'lineHeightHeading2',
    spacing: 'letterSpacingHeadline2',
  },
  {
    label: 'Heading 3',
    size: 'fontSizeHeading3',
    ratio: 'lineHeightHeading3',
    spacing: 'letterSpacingHeadline3',
  },
  {
    label: 'Heading 4',
    size: 'fontSizeHeading4',
    ratio: 'lineHeightHeading4',
    spacing: 'letterSpacingHeadline4',
  },
  {
    label: 'Heading 5',
    size: 'fontSizeHeading5',
    ratio: 'lineHeightHeading5',
    spacing: 'letterSpacingHeadline5',
  },
  {
    label: 'fontSizeXL (headline6)',
    size: 'fontSizeXL',
    ratio: 'lineHeightHeadline6',
    spacing: 'letterSpacingHeadline6',
  },
] as const;

const BODY_TEXT = [
  { label: 'fontSizeLG (body1)', size: 'fontSizeLG', ratio: 'lineHeightLG' },
  { label: 'fontSize (body2)', size: 'fontSize', ratio: 'lineHeight' },
  { label: 'fontSizeSM (body3)', size: 'fontSizeSM', ratio: 'lineHeightSM' },
  { label: 'fontSizeBody4', size: 'fontSizeBody4', ratio: 'lineHeightBody4' },
] as const;

/** A line-height ratio applied to its font size: the dp value React Native needs. */
const px = (size: number, ratio: number) => Math.round(size * ratio);

/** Typography and motion: a runtime fontSize switch, the type scale, font families, motion and line tokens. */
export function TypographyMotionScreen() {
  const styles = useStyles();
  const [fontSize, setFontSize] = useState<number>(FONT_SIZE_OPTIONS[0].value);

  return (
    <View style={styles.screen}>
      <Text style={styles.title} role="heading">
        Typography and motion
      </Text>
      <Text style={styles.body}>
        Defaults equal the Qi values. Pick a size to override the fontSize seed
        at runtime.
      </Text>

      <ChoiceChips
        options={FONT_SIZE_OPTIONS}
        value={fontSize}
        onChange={setFontSize}
      />

      <ConfigProvider theme={{ token: { fontSize } }}>
        <Section title="Headings" hint="Size / line height in dp">
          <Headings />
        </Section>

        <Section title="Body text" hint="Size / line height in dp">
          <BodyText />
        </Section>
      </ConfigProvider>

      <Section
        title="Font families"
        hint="An unregistered family falls back to the system font"
      >
        <FontFamilies />
      </Section>

      <Section title="Motion" hint="Durations in ms; curves for Easing.bezier">
        <Motion />
      </Section>

      <Section title="Lines, layers and opacity" hint="Reference defaults">
        <LinesAndLayers />
      </Section>
    </View>
  );
}

function ChoiceChips<V extends string | number | boolean>({
  options,
  value,
  onChange,
}: {
  options: readonly { label: string; value: V }[];
  value: V;
  onChange: (next: V) => void;
}) {
  const styles = useStyles();
  return (
    <View style={styles.chips} role="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.label}
            role="radio"
            aria-checked={selected}
            onPress={() => onChange(option.value)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <Text style={styles.chipLabel}>{option.label}</Text>
          </Pressable>
        );
      })}
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

function Headings() {
  const styles = useStyles();
  const { token } = theme.useToken();
  return HEADINGS.map(({ label, size, ratio, spacing }) => (
    <View key={label} style={styles.sample}>
      <Text
        style={[
          styles.headline,
          {
            fontSize: token[size],
            lineHeight: px(token[size], token[ratio]),
            letterSpacing: token[spacing],
          },
        ]}
      >
        {label}
      </Text>
      <Text style={styles.mono}>
        {token[size]} / {px(token[size], token[ratio])}, letter spacing{' '}
        {token[spacing]}
      </Text>
    </View>
  ));
}

function BodyText() {
  const styles = useStyles();
  const { token } = theme.useToken();
  return (
    <>
      {BODY_TEXT.map(({ label, size, ratio }) => (
        <View key={label} style={styles.sample}>
          <Text
            style={[
              styles.bodySample,
              {
                fontSize: token[size],
                lineHeight: px(token[size], token[ratio]),
              },
            ]}
          >
            {label}: your next check-up is due in March.
          </Text>
          <Text style={styles.mono}>
            {token[size]} / {px(token[size], token[ratio])}
          </Text>
        </View>
      ))}
      <Text style={[styles.bodySample, { fontWeight: token.fontWeightStrong }]}>
        fontWeightStrong {token.fontWeightStrong}
      </Text>
      <Text
        style={[styles.bodySample, { fontWeight: token.fontWeightBodyStrong2 }]}
      >
        fontWeightBodyStrong2 {token.fontWeightBodyStrong2}
      </Text>
    </>
  );
}

function FontFamilies() {
  const styles = useStyles();
  const { token } = theme.useToken();
  const families = [
    ['fontFamily', token.fontFamily],
    ['fontFamilyHeadline', token.fontFamilyHeadline],
    ['fontFamilyCode', token.fontFamilyCode],
  ] as const;
  return (
    <>
      {families.map(([name, value]) => (
        <TokenRow key={name} name={name} value={value} />
      ))}
      <ConfigProvider
        theme={{ token: { fontFamily: defaults.fontFamilyCode } }}
      >
        <FamilyOverrideSample />
      </ConfigProvider>
      <Text style={styles.hint}>
        Apps that register the font under another name set fontFamily through
        ConfigProvider, as the sample above does with fontFamilyCode.
      </Text>
    </>
  );
}

function FamilyOverrideSample() {
  const styles = useStyles();
  return (
    <View style={styles.sample}>
      <Text style={styles.bodySample}>
        Nested ConfigProvider: fontFamily = fontFamilyCode
      </Text>
    </View>
  );
}

const MOTION_OPTIONS = [
  { label: 'motion: true', value: true },
  { label: 'motion: false', value: false },
] as const;

function Motion() {
  const [motion, setMotion] = useState<boolean>(true);
  return (
    <>
      <ChoiceChips
        options={MOTION_OPTIONS}
        value={motion}
        onChange={setMotion}
      />
      <ConfigProvider theme={{ token: { motion } }}>
        <MotionDemo />
      </ConfigProvider>
    </>
  );
}

function MotionDemo() {
  const styles = useStyles();
  const { token } = theme.useToken();
  const [progress] = useState(() => new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);

  const play = () => {
    const next = !expanded;
    setExpanded(next);
    Animated.timing(progress, {
      toValue: next ? 1 : 0,
      duration: token.motionDurationSlow,
      easing: Easing.bezier(...token.motionEaseInOut),
      useNativeDriver: true,
    }).start();
  };
  const scaleX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 1],
  });
  const durations = [
    ['motionDurationFast', token.motionDurationFast],
    ['motionDurationMid', token.motionDurationMid],
    ['motionDurationSlow', token.motionDurationSlow],
  ] as const;

  return (
    <>
      {durations.map(([name, value]) => (
        <TokenRow key={name} name={name} value={`${value} ms`} />
      ))}
      <TokenRow
        name="motionEaseInOut"
        value={`[${token.motionEaseInOut.join(', ')}]`}
      />
      <View style={styles.track}>
        <Animated.View style={[styles.bar, { transform: [{ scaleX }] }]} />
      </View>
      <Pressable role="button" onPress={play} style={styles.button}>
        <Text style={styles.buttonLabel}>
          Play: motionDurationSlow, motionEaseInOut
        </Text>
      </Pressable>
    </>
  );
}

function LinesAndLayers() {
  const styles = useStyles();
  const { token } = theme.useToken();
  const rows = [
    ['lineWidth', token.lineWidth],
    ['lineWidthBold', token.lineWidthBold],
    ['lineType', token.lineType],
    ['zIndexBase', token.zIndexBase],
    ['zIndexPopupBase', token.zIndexPopupBase],
    ['opacityImage', token.opacityImage],
    ['focusOutline', String(token.focusOutline)],
  ] as const;
  return (
    <>
      <View style={styles.lineDemo}>
        <View style={[styles.lineBox, { borderWidth: token.lineWidth }]}>
          <Text style={styles.caption}>lineWidth</Text>
        </View>
        <View style={[styles.lineBox, { borderWidth: token.lineWidthBold }]}>
          <Text style={styles.caption}>lineWidthBold</Text>
        </View>
      </View>
      {rows.map(([name, value]) => (
        <TokenRow key={name} name={name} value={String(value)} />
      ))}
    </>
  );
}

function TokenRow({ name, value }: { name: string; value: string }) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Text style={styles.rowName}>{name}</Text>
      <Text style={styles.mono}>{value}</Text>
    </View>
  );
}

const useStyles = createStyles((token) => ({
  screen: { paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  title: {
    fontFamily: token.fontFamilyHeadline,
    fontSize: token.fontSizeHeading2,
    lineHeight: px(token.fontSizeHeading2, token.lineHeightHeading2),
    fontWeight: token.fontWeightHeadline,
    color: token.colorTextHeading,
  },
  body: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    lineHeight: token.fontHeight,
    color: token.colorTextSecondary,
  },
  hint: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSizeSM,
    lineHeight: token.fontHeightSM,
    color: token.colorTextDescription,
  },
  caption: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
  },
  mono: {
    fontFamily: token.fontFamilyCode,
    fontSize: token.fontSizeBody4,
    color: token.colorTextTertiary,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: token.lineWidth,
    borderColor: token.colorBorder,
    backgroundColor: token.colorBgContainer,
  },
  chipSelected: {
    borderColor: token.colorText,
    borderWidth: token.lineWidthBold,
  },
  chipLabel: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    color: token.colorText,
  },
  section: { marginTop: 16, gap: 4 },
  sectionTitle: {
    fontFamily: token.fontFamilyHeadline,
    fontSize: token.fontSizeXL,
    lineHeight: px(token.fontSizeXL, token.lineHeightHeadline6),
    fontWeight: token.fontWeightHeadline,
    color: token.colorTextHeading,
  },
  card: {
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: token.colorBgContainer,
    borderWidth: token.lineWidth,
    borderColor: token.colorBorderSecondary,
    gap: 10,
  },
  sample: { gap: 2 },
  headline: {
    fontFamily: token.fontFamilyHeadline,
    fontWeight: token.fontWeightHeadline,
    color: token.colorTextHeading,
  },
  bodySample: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    lineHeight: token.fontHeight,
    fontWeight: token.fontWeightBody,
    letterSpacing: token.letterSpacingBody,
    color: token.colorText,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowName: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSizeSM,
    fontWeight: token.fontWeightStrong,
    color: token.colorText,
  },
  track: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: token.colorBgLayout,
  },
  bar: {
    height: 12,
    borderRadius: 6,
    transformOrigin: 'left',
    backgroundColor: token.colorInteractiveActionable,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: token.colorInteractiveActionable,
  },
  buttonLabel: {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeightStrong,
    color: token.colorTextLightSolid,
  },
  lineDemo: { flexDirection: 'row', gap: 12 },
  lineBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderStyle: token.lineType,
    borderColor: token.colorBorder,
  },
}));
