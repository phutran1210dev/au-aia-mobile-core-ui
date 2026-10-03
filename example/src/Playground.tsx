import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { createStyles } from '@au-aia/mobile-core-ui';

import { screens } from './screens';

/** Tabs for every registered screen, and the active screen below them. */
export function Playground() {
  const styles = useStyles();
  const [activeKey, setActiveKey] = useState<string>(screens[0].key);
  const active =
    screens.find((screen) => screen.key === activeKey) ?? screens[0];
  const Screen = active.component;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.tabs} role="tablist">
          {screens.map((screen) => {
            const selected = screen.key === active.key;
            return (
              <Pressable
                key={screen.key}
                role="tab"
                aria-selected={selected}
                onPress={() => setActiveKey(screen.key)}
                style={[styles.tab, selected && styles.tabSelected]}
              >
                <Text
                  style={[styles.tabLabel, selected && styles.tabLabelSelected]}
                >
                  {screen.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Screen />
      </ScrollView>
    </View>
  );
}

const useStyles = createStyles((token) => ({
  root: { flex: 1, backgroundColor: token.colorBgLayout },
  content: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
    paddingBottom: 48,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: token.colorBorder,
    backgroundColor: token.colorBgContainer,
  },
  tabSelected: {
    borderColor: token.colorInteractiveActionable,
    backgroundColor: token.controlItemBgActive,
  },
  tabLabel: { fontSize: 13, color: token.colorTextSecondary },
  tabLabelSelected: { color: token.colorText, fontWeight: '600' },
}));
