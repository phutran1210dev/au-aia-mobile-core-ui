import { Platform, ScrollView, Text, View } from 'react-native';
import { createStyles } from '@au-aia/mobile-core-ui';

// Hard rule 4 keeps the palette out of the public API. This palette showcase reads it by
// relative path, the one exception example-app.md allows. Never do this in an app.
import { palette } from '../../../../src/theme/palette';

/** Every Qi family and step in the internal palette, with its hex. */
export function PaletteSwatches() {
  const styles = useStyles();
  return (
    <View style={styles.palette}>
      {Object.entries(palette).map(([family, steps]) => (
        <View key={family} style={styles.family}>
          <Text style={styles.familyName}>{family}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.steps}>
              {Object.entries(steps).map(([step, hex]) => (
                <View key={step} style={styles.cell}>
                  <View style={[styles.swatch, { backgroundColor: hex }]} />
                  <Text style={styles.step} numberOfLines={1}>
                    {step}
                  </Text>
                  <Text style={styles.hex}>{hex}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </View>
  );
}

const useStyles = createStyles((token) => ({
  palette: { gap: 12 },
  family: { gap: 6 },
  familyName: { fontSize: 13, fontWeight: '600', color: token.colorText },
  steps: { flexDirection: 'row', gap: 8 },
  cell: { width: 64, gap: 2 },
  swatch: {
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: token.colorBorderSecondary,
  },
  step: { fontSize: 11, color: token.colorTextSecondary },
  hex: {
    fontSize: 10,
    color: token.colorTextTertiary,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
}));
