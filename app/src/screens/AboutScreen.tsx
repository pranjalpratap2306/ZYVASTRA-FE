import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { ProblemSolution, MaterialsProducts, USPsSection } from '../components/SustainabilitySections';

export const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.hero}> 
        <Text style={styles.heroTitle}>About Us</Text>
      </View>

      <View style={styles.breadcrumbWrap}>
        <Text style={styles.crumbText}>Home</Text>
        <Text style={styles.crumbSep}>›</Text>
        <Text style={styles.crumbActive}>About Us</Text>
      </View>

      <View style={styles.grid}> 
        <View style={styles.mainCol}>
          <View style={styles.card}> 
            <Text style={styles.sectionTitle}>ZYVASTRA</Text>
            <Text style={styles.body}>ZYVASTRA is a Bhopal‑based apparel manufacturer focused on premium T‑shirts and private‑label garments. Established in 2025, we blend modern production with ethical sourcing to deliver dependable quality for brands, corporates and events across India and overseas.</Text>

            <Text style={styles.subhead}>Team</Text>
            <Text style={styles.body}>Our close‑knit team of product designers, merchandisers and production specialists follows transparent processes, rigorous quality checks and on‑time communication—so that every order is simple, clear and reliable.</Text>

            <Text style={styles.subhead}>Network</Text>
            <Text style={styles.body}>We serve customers throughout India and export to the UK, Europe and the Middle East via trusted logistics partners. From sampling to bulk dispatch, we keep you updated at every stage.</Text>
          </View>

          <ProblemSolution />
          <MaterialsProducts />
          <USPsSection />

          <View style={styles.table}> 
            <View style={styles.tr}><Text style={styles.th}>Name of Owner</Text><Text style={styles.td}>Mr. Anand Meena</Text></View>
            <View style={styles.trAlt}><Text style={styles.th}>Year of Establishment</Text><Text style={styles.td}>2025</Text></View>
            <View style={styles.tr}><Text style={styles.th}>Nature of Business</Text><Text style={styles.td}>Manufacturer, Exporter & Supplier</Text></View>
            <View style={styles.trAlt}><Text style={styles.th}>Number of Employees</Text><Text style={styles.td}>10 to 20</Text></View>
            <View style={styles.tr}><Text style={styles.th}>Market Covered</Text><Text style={styles.td}>UK, Europe & Middle East Countries</Text></View>
          </View>
        </View>

        <View style={styles.sideCol}> 
          <View style={styles.sideCard}>
            <Text style={styles.sideTitle}>Products</Text>
            {['SUMMER T‑SHIRTS','OVERSIZED T‑SHIRTS','TRENDY POLO T‑SHIRTS','ROUND NECK T‑SHIRTS'].map((t) => (
              <View key={t} style={styles.sideItem}><Text style={styles.sideText}>{t}</Text><Text style={styles.sideChev}>›</Text></View>
            ))}
          </View>

          <View style={styles.sideCard}>
            <Text style={styles.sideTitle}>Contact Us</Text>
            <Text style={styles.sideBody}>ZYVASTRA, Bhopal, Madhya Pradesh, India</Text>
            <Text style={styles.sideBody}>Call Us: +91-20-24380237</Text>
            <Text style={styles.sideBody}>Email: hello@zyvastra.com</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surfaceAlt },
  hero: { backgroundColor: colors.brandNavyHeader, paddingVertical: 28, paddingHorizontal: 16 },
  heroTitle: { color: colors.brandGold, fontSize: 24, fontWeight: '800' },
  breadcrumbWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  crumbText: { color: colors.textSecondary },
  crumbSep: { color: colors.textSecondary },
  crumbActive: { color: colors.textPrimary, fontWeight: '700' },
  grid: { flexDirection: 'row', gap: 16, paddingHorizontal: 16 },
  mainCol: { flex: 3 },
  sideCol: { flex: 2 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 16, marginBottom: 16 },
  sectionTitle: { color: colors.brandNavy, fontSize: 16, fontWeight: '800', marginBottom: 8 },
  body: { color: colors.textPrimary, lineHeight: 20, marginBottom: 8 },
  subhead: { color: colors.brandNavy, fontWeight: '800', marginTop: 8 },
  link: { color: colors.brandNavyHeader, fontWeight: '800' },
  table: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: 'hidden', marginBottom: 16 },
  tr: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface },
  trAlt: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#F6F8FA' },
  th: { color: colors.textPrimary, fontWeight: '700', width: '48%' },
  td: { color: colors.textSecondary, width: '48%', textAlign: 'right' },
  sideCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 16 },
  sideTitle: { color: colors.brandNavy, fontWeight: '800', marginBottom: 8 },
  sideItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  sideText: { color: colors.textPrimary },
  sideChev: { color: colors.textSecondary },
  sideBody: { color: colors.textSecondary, marginBottom: 4 },
}); 