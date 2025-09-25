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
    <Text style={styles.factValueBig}>{value}</Text>
    <Text style={styles.factTitleMuted}>{title}</Text>
  </View>
);

export interface CompanyHighlightsProps {
  showFeatures?: boolean;
  showFacts?: boolean;
}

const warehouseIcon = require('../../assets/warehouse.png');
const networkIcon = require('../../assets/network.png');
const teamIcon = require('../../assets/teamwork.png');
const sustainabilityIcon = require('../../assets/eco-friendly_section_3.png');

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
            title="State-of-the-Art Warehousing"
            desc="Our expansive, modern warehouse allows us to manage bulk and urgent orders with precision and speed, ensuring your products are packaged securely and delivered on time."
            icon={warehouseIcon}
          />
          <Feature
            title="Global Reach, Local Expertise"
            desc="With a strong presence in India, the UK, Europe, and the Middle East, we combine global reach with local expertise to serve our clients seamlessly across borders."
            icon={networkIcon}
          />
          <Feature
            title="A Passionate & Skilled Team"
            desc="Our team of dedicated professionals is committed to excellence. We follow transparent processes and rigorous quality checks to ensure every product meets our high standards."
            icon={teamIcon}
          />
          <Feature
            title="Sustainable & Ethical Sourcing"
            desc="We are committed to responsible sourcing, using natural, skin-friendly fibers and eco-friendly practices. No harsh dyes, no plastic, no compromise."
            icon={sustainabilityIcon}
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
  wrap: { backgroundColor: colors.surfaceAlt, paddingVertical: 48, paddingHorizontal: 16 },
  header: { marginBottom: 32, alignItems: 'center' },
  headerBar: { width: 48, height: 4, backgroundColor: colors.brandGold, borderRadius: 2, marginBottom: 12 },
  headerTitle: { color: colors.brandNavy, fontWeight: '900', fontSize: 28, textAlign: 'center', fontFamily: 'serif' },

  featuresRow: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  feature: { position: 'relative', flexGrow: 1, flexBasis: 400, maxWidth: 500, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 24, paddingLeft: 28, flexDirection: 'row', alignItems: 'center', gap: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  leftAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: colors.brandGold, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  iconImg: { width: '100%', height: '100%' },
  featureTitle: { color: colors.brandNavy, fontWeight: '800', marginBottom: 8, fontSize: 16, fontFamily: 'serif' },
  featureDesc: { color: colors.textSecondary, lineHeight: 22, fontFamily: 'serif' },

  factsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16, paddingBottom: 10, paddingTop: 24, marginTop: 24, borderTopWidth: 1, borderTopColor: colors.border },
  fact: { flexGrow: 1, flexBasis: 180, alignItems: 'center', paddingVertical: 18, paddingHorizontal: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  factIcon: { width: 0, height: 0, marginBottom: 0 },
  factValueBig: { color: colors.brandNavyHeader, fontWeight: '900', fontSize: 26, textAlign: 'center', fontFamily: 'serif' },
  factTitleMuted: { color: colors.textSecondary, textAlign: 'center', marginTop: 6, fontFamily: 'serif' },
}); 