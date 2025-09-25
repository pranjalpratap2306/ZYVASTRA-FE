import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

export const TopPromoBar: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;
  return (
    <View style={styles.bar}>
      <Text style={styles.item}>🚚 4+ years expertise in global trade</Text>
      {!isNarrow && <Text style={styles.sep}>•</Text>}
      {!isNarrow && <Text style={styles.item}>✅ Guaranteed purity, unmatched quality</Text>}
      {!isNarrow && <Text style={styles.sep}>•</Text>}
      <Text style={styles.item}>🕘 24/7 support for export needs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: { width: '100%', backgroundColor: colors.brandGold, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
  item: { color: colors.brandNavy, fontWeight: '700', fontSize: 12 },
  sep: { color: colors.brandNavy, opacity: 0.7 },
});




