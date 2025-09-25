import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { colors } from '../theme/colors';
import { ProblemSolution, USPsSection } from '../components/SustainabilitySections';
import { useNavigation } from '@react-navigation/native';

const FeatureCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureAccent} />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDesc}>{desc}</Text>
  </View>
);

export const AboutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [tableHeight, setTableHeight] = React.useState<number | undefined>(undefined);
  const items = [
    { label: 'SUMMER T‑SHIRTS', imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop' },
    { label: 'OVERSIZED T‑SHIRTS', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop' },
    { label: 'TRENDY POLO T‑SHIRTS', imageUrl: 'https://images.unsplash.com/photo-1593030121785-62f27ff609f0?q=80&w=1400&auto=format&fit=crop' },
    { label: 'ROUND NECK T‑SHIRTS', imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop' },
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Removed the wide banner. Keep core content below. */}

      <View style={styles.grid}> 
        <View style={styles.mainCol}>
          <View style={styles.card}> 
            <Text style={styles.sectionTitle}>ZYVASTRA</Text>
            <Text style={styles.body}>ZYVASTRA is a Bhopal‑based apparel manufacturer focused on premium T‑shirts and private‑label garments. Established in 2025, we blend modern production with ethical sourcing to deliver dependable quality for brands, corporates and events across India and overseas.</Text>

            <View style={styles.featuresRow}>
              <FeatureCard title={'Mission'} desc={'Deliver dependable, premium apparel with on‑time service and transparent process.'} />
              <FeatureCard title={'Quality'} desc={'Rigorous checks from yarn to finishing ensure comfort, fit and durability.'} />
              <FeatureCard title={'Sustainability'} desc={'Eco‑friendly options and responsible sourcing across our product range.'} />
            </View>

            <Text style={styles.subhead}>Team</Text>
            <Text style={styles.body}>Our close‑knit team of product designers, merchandisers and production specialists follows transparent processes, rigorous quality checks and on‑time communication—so that every order is simple, clear and reliable.</Text>

            <Text style={styles.subhead}>Network</Text>
            <Text style={styles.body}>We serve customers throughout India and export to the UK, Europe and the Middle East via trusted logistics partners. From sampling to bulk dispatch, we keep you updated at every stage.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surfaceAlt },
  hero: { paddingVertical: 36, paddingHorizontal: 16, backgroundColor: colors.brandNavyHeader, alignItems: 'flex-start', justifyContent: 'center' },
  heroTitle: { color: colors.brandGold, fontSize: 26, fontWeight: '900' },
  heroTag: { color: colors.textOnDark, marginTop: 6, fontWeight: '700' },
  breadcrumbWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  crumbText: { color: colors.textSecondary },
  crumbSep: { color: colors.textSecondary },
  crumbActive: { color: colors.textPrimary, fontWeight: '700' },
  grid: { flexDirection: 'row', gap: 16, paddingHorizontal: 16 },
  mainCol: { flex: 3 },
  sideCol: { flex: 2 },
  card: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
  sectionTitle: { color: colors.brandNavy, fontSize: 18, fontWeight: '900', marginBottom: 8 },
  body: { color: colors.textPrimary, lineHeight: 20, marginBottom: 8 },
  subhead: { color: colors.brandNavy, fontWeight: '800', marginTop: 8 },
  link: { color: colors.brandNavyHeader, fontWeight: '800' },
  table: { backgroundColor: colors.surface, borderRadius: 10, overflow: 'hidden', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  tr: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface },
  trAlt: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#F6F8FA' },
  th: { color: colors.textPrimary, fontWeight: '700', width: '48%' },
  td: { color: colors.textSecondary, width: '48%', textAlign: 'right' },
  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8, marginBottom: 8 },
  featureCard: { position: 'relative', flexGrow: 1, flexBasis: 200, backgroundColor: colors.surfaceAlt, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  featureAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: colors.brandGold, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  featureTitle: { color: colors.brandNavy, fontWeight: '900', marginLeft: 8, marginBottom: 4 },
  featureDesc: { color: colors.textSecondary, marginLeft: 8 },
  sideCard: { backgroundColor: colors.surface, borderRadius: 10, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  sideTitle: { color: colors.brandNavy, fontWeight: '800', marginBottom: 8 },
  sideItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, borderRadius: 8, paddingHorizontal: 8 },
  sideText: { color: colors.textPrimary, fontWeight: '700' },
  sideChev: { color: colors.textSecondary, fontWeight: '900' },
  sideBody: { color: colors.textSecondary, marginBottom: 4 },
  sideImageCard: { backgroundColor: colors.surface, borderRadius: 10, padding: 0, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  sideImage: { width: '100%', height: 300, borderRadius: 8, backgroundColor: colors.surface },
});