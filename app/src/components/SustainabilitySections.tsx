import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const ProblemSolution: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.h1}>Why Sustainable Apparel?</Text>
    <View style={styles.row}> 
      <View style={styles.col}> 
        <Text style={styles.p}>Most clothes today are made fast and cheap, causing excessive waste and environmental harm. Synthetic fabrics often pollute air and water during production.</Text>
      </View>
      <View style={styles.col}> 
        <Text style={styles.p}>India’s rich heritage of handmade fabrics and natural materials is fading as modern fashion overlooks them. People no longer know where or how their clothes are made.</Text>
      </View>
    </View>
    <Text style={[styles.h2, { marginTop: 14 }]}>ZYVASTRA’s Approach</Text>
    <Text style={styles.p}>Timeless, versatile designs made to last—promoting mindful buying over trends. We craft styles using natural fibers that are gentle on your skin and the planet.</Text>
  </View>
);

export const MaterialsProducts: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.h1}>Our Product Lines</Text>
    <Text style={styles.p}>Everyday Essentials: Soft, breathable apparel made from organic cotton—perfect for daily wear.</Text>
    <Text style={styles.p}>Earthwear Line: Shirts crafted from natural fibers like bamboo and banana. Lightweight, breathable, long-lasting comfort.</Text>
    <Text style={styles.p}>Minimal Luxe: Clean, modern silhouettes with heritage-inspired textures for conscious living.</Text>
    <Text style={[styles.note, { marginTop: 8 }]}>Current inventory includes T‑shirts from organic cotton plus bamboo/banana fiber blends.</Text>
  </View>
);

export const USPsSection: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.h1}>What Makes ZYVASTRA Unique</Text>
    <View style={styles.list}> 
      <Text style={styles.li}>Nature-friendly materials: organic cotton, bamboo, banana fiber—biodegradable and skin-safe.</Text>
      <Text style={styles.li}>Clothes that connect you to nature, tradition, and mindful choices.</Text>
      <Text style={styles.li}>Designs that blend cultural roots with a clean, modern look—storytelling in every piece.</Text>
      <Text style={styles.li}>Sustainability in every step—from sourcing to stitching—with artisan collaboration.</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginTop: 16 },
  h1: { color: colors.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  h2: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  p: { color: colors.textPrimary, lineHeight: 20, marginBottom: 6 },
  note: { color: colors.textSecondary },
  row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  col: { flex: 1, minWidth: 260 },
  list: { gap: 8 },
  li: { color: colors.textPrimary },
}); 