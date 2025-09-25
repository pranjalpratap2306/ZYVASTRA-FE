import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';

interface QuickAccessSectionProps {
  onEnquiry: () => void;
  onProducts: () => void;
  onShipping: () => void;
  onSupport: () => void;
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({ onEnquiry, onProducts, onShipping, onSupport }) => {
  const { width } = useWindowDimensions();
  const isTwoCol = width >= 900;

  type ItemDef = { title: string; desc: string; icon: string; onPress: () => void };

  const items: ItemDef[] = [
    { title: 'Enquiry',  desc: 'Share your requirement and get a quick quote.', icon: '✉', onPress: onEnquiry },
    { title: 'Products', desc: 'Explore categories tailored for your brand.',   icon: '🛍', onPress: onProducts },
    { title: 'Shipping', desc: 'Timelines, costs and dispatch tracking.',        icon: '📦', onPress: onShipping },
    { title: 'Support',  desc: 'FAQs, email and dedicated assistance.',          icon: '🎧', onPress: onSupport },
  ];

  const Item: React.FC<ItemDef> = ({ title, desc, icon, onPress }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole={'link'}
      style={(state) => [
        styles.card,
        (state as any).hovered ? styles.cardHover : null,
        state.pressed ? styles.cardPressed : null,
      ]}
    >
      <View style={styles.cardRow}>
        <View style={styles.iconWrap}><Text style={styles.iconTxt}>{icon}</Text></View>
        <View style={styles.copyCol}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCopy}>{desc}</Text>
        </View>
        <Text style={styles.arrowTxt}>➜</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Quick Access</Text>
      <Text style={styles.sub}>Jump straight to what you need</Text>
      <View style={[styles.grid, { flexDirection: isTwoCol ? 'row' : 'column' }]}>
        {items.map((it) => (
          <Item key={it.title} {...it} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceAlt, paddingHorizontal: 0, paddingVertical: 22 },
  heading: { color: colors.brandNavy, fontWeight: '900', fontSize: 20 },
  sub: { color: colors.textSecondary, marginTop: 4, marginBottom: 12 },
  grid: { flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', paddingHorizontal: 16 },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    // Subtle motion polish on web
    ...(Platform.OS === 'web' ? ({ transitionProperty: 'transform, box-shadow', transitionDuration: '160ms' } as any) : {}),
  },
  cardHover: {
    ...(Platform.OS === 'web' ? ({ transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } as any) : {}),
  },
  cardPressed: {
    transform: Platform.OS === 'web' ? (('translateY(-1px) scale(0.99)') as any) : undefined,
    opacity: Platform.OS === 'web' ? 0.95 : 0.95,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.brandNavyHeader, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.brandGold },
  iconTxt: { color: colors.surface, fontSize: 22 },
  copyCol: { flex: 1 },
  cardTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 16 },
  cardCopy: { color: colors.textSecondary, marginTop: 2 },
  arrowTxt: { color: colors.brandGold, fontWeight: '900', fontSize: 16, backgroundColor: colors.brandNavyHeader, width: 28, height: 28, textAlign: 'center', textAlignVertical: 'center', borderRadius: 14, lineHeight: 28, borderWidth: 1, borderColor: colors.brandGold },
});


