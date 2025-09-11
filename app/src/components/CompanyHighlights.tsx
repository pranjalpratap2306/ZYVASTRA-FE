import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';

const Feature: React.FC<{ title: string; desc: string; icon: any }>=({ title, desc, icon })=> (
  <View style={styles.feature}> 
    <View style={styles.leftAccent} />
    <View style={styles.iconBox}>
      <Image source={icon} style={styles.iconImg} resizeMode="cover" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

const Fact: React.FC<{ title: string; value: string }>=({ title, value })=> (
  <View style={styles.fact}> 
    <View style={styles.factIcon} />
    <Text style={styles.factTitle}>{title}</Text>
    <Text style={styles.factValue}>{value}</Text>
  </View>
);

export interface CompanyHighlightsProps {
  showFeatures?: boolean;
  showFacts?: boolean;
}

const warehouseIcon = require('../../assets/warehouse.png');
const networkIcon = require('../../assets/network.png');
const teamIcon = require('../../assets/teamwork.png');

export const CompanyHighlights: React.FC<CompanyHighlightsProps> = ({ showFeatures = true, showFacts = true }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}> 
        <View style={styles.headerBar} />
        <Text style={styles.headerTitle}>Why Choose ZYVASTRA</Text>
      </View>

      {showFeatures && (
        <View style={styles.featuresRow}>
          <Feature
            title="Warehousing & Packaging"
            desc="A large warehouse helps us execute bulk and urgent orders within stipulated timelines."
            icon={warehouseIcon}
          />
          <Feature
            title="Network"
            desc="We have established a strong base across India, the UK, Europe and the Middle East."
            icon={networkIcon}
          />
          <Feature
            title="Our Team"
            desc="A competent team of skilled professionals follows transparent processes and quality checks."
            icon={teamIcon}
          />
        </View>
      )}

      {showFacts && (
        <View style={styles.factsRow}>
          <Fact title="Nature of Business" value="Manufacturer, Exporter, Supplier" />
          <Fact title="Number of Employees" value="10–20" />
          <Fact title="Year of Establishment" value="2025" />
          <Fact title="Market Covered" value="UK, Europe & Middle East" />
          <Fact title="Name of Owner" value="Mr. Anand Meena" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceAlt, paddingVertical: 20 },
  header: { paddingHorizontal: 16, marginBottom: 8, alignItems: 'flex-start' },
  headerBar: { width: 36, height: 4, backgroundColor: colors.brandGold, borderRadius: 2, marginBottom: 8 },
  headerTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 18 },

  featuresRow: { flexDirection: 'row', gap: 16, paddingHorizontal: 16, marginBottom: 12, flexWrap: 'wrap' },
  feature: { position: 'relative', flexGrow: 1, flexBasis: 300, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  leftAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: colors.brandGold, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  iconImg: { width: '100%', height: '100%' },
  featureTitle: { color: colors.brandNavy, fontWeight: '800', marginBottom: 6 },
  featureDesc: { color: colors.textSecondary, lineHeight: 20 },

  factsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16, paddingBottom: 8, paddingTop: 6 },
  fact: { flexGrow: 1, flexBasis: 180, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  factIcon: { width: 48, height: 48, borderRadius: 8, backgroundColor: colors.brandNavyHeader, opacity: 0.12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  factTitle: { color: colors.brandNavy, fontWeight: '900', textAlign: 'center' },
  factValue: { color: colors.textSecondary, textAlign: 'center', marginTop: 4 },
}); 