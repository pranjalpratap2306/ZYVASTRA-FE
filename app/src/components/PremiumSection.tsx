import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

interface PremiumSectionProps {
  onExplore?: () => void;
  onContact?: () => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({ onExplore, onContact }) => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;
  const gradientStyle = { backgroundImage: `linear-gradient(135deg, rgba(10,35,55,0.92), rgba(42,78,106,0.88), rgba(221,186,131,0.55))` } as any;

  return (
    <View style={styles.wrap}>
      <View style={[styles.card, gradientStyle, isNarrow && { paddingHorizontal: 16, paddingVertical: 20 }]}> 
        <Text style={styles.title}>Premium T‑Shirt Collection</Text>
        <Text style={styles.subtitle}>Discover our comprehensive range of high‑quality T‑shirts designed for B2B excellence</Text>
        <View style={styles.ctaRow}>
          <Pressable style={[styles.btn, styles.ghost]} onPress={onExplore}><Text style={styles.btnTextGhost}>Explore Products</Text></Pressable>
          <Pressable style={[styles.btn, styles.ghost]} onPress={onContact}><Text style={styles.btnTextGhost}>Contact Sales</Text></Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 0, paddingVertical: 0, backgroundColor: colors.surfaceAlt },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 10,
  },
  title: { color: colors.surface, fontWeight: '900', fontSize: 26, textAlign: 'center', fontFamily: 'serif' },
  subtitle: { color: colors.textOnDark, textAlign: 'center', lineHeight: 22, maxWidth: 980, fontFamily: 'serif' },
  ctaRow: { flexDirection: 'row', gap: 12, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' },
  btn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  primary: { backgroundColor: colors.brandGold, borderColor: colors.brandNavyHeader },
  ghost: { backgroundColor: 'rgba(0,0,0,0.0)', borderColor: colors.brandGold },
  btnTextPrimary: { color: colors.brandNavy, fontWeight: '800' },
  btnTextGhost: { color: colors.surface, fontWeight: '800' },
});


